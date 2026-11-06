import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { site } from '@/config/site'
import { getProductById, type PaletteKey, type Product } from '@/data/products'

const STORAGE_KEY = 'rimis:cart'
export const MAX_QTY_PER_LINE = 10

export interface CartLine {
  /** Unique key for the line: product + chosen colour. */
  id: string
  productId: string
  colorId?: PaletteKey
  qty: number
}

export interface DetailedCartLine extends CartLine {
  product: Product
  lineTotal: number
}

interface CartContextValue {
  lines: CartLine[]
  detailedLines: DetailedCartLine[]
  count: number
  subtotal: number
  deliveryFee: number
  total: number
  freeDeliveryRemaining: number
  isCartOpen: boolean
  addItem: (productId: string, opts?: { colorId?: PaletteKey; qty?: number }) => void
  removeItem: (lineId: string) => void
  setQty: (lineId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const makeLineId = (productId: string, colorId?: PaletteKey) =>
  `${productId}::${colorId ?? 'default'}`

const clampQty = (qty: number) => Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.round(qty)))

function loadLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (l): l is CartLine =>
          typeof l === 'object' &&
          l !== null &&
          typeof (l as CartLine).productId === 'string' &&
          typeof (l as CartLine).qty === 'number' &&
          Boolean(getProductById((l as CartLine).productId)),
      )
      .map((l) => ({
        id: l.id ?? makeLineId(l.productId, l.colorId),
        productId: l.productId,
        colorId: l.colorId,
        qty: clampQty(l.qty),
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadLines())
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* ignore storage failures */
    }
  }, [lines])

  const addItem = useCallback<CartContextValue['addItem']>((productId, opts) => {
    const product = getProductById(productId)
    if (!product) return
    const colorId = opts?.colorId
    const qty = clampQty(opts?.qty ?? 1)
    const id = makeLineId(productId, colorId)
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id)
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: clampQty(l.qty + qty) } : l))
      }
      return [...prev, { id, productId, colorId, qty }]
    })
  }, [])

  const removeItem = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId))
  }, [])

  const setQty = useCallback((lineId: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, qty: clampQty(qty) } : l)),
    )
  }, [])

  const clearCart = useCallback(() => setLines([]), [])
  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const detailedLines = useMemo<DetailedCartLine[]>(() => {
    return lines.flatMap((line) => {
      const product = getProductById(line.productId)
      if (!product) return []
      return [{ ...line, product, lineTotal: product.price * line.qty }]
    })
  }, [lines])

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines])
  const subtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedLines],
  )

  const qualifiesForFreeDelivery =
    site.deliveryFee === 0 || subtotal >= site.freeDeliveryThreshold

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0
    return qualifiesForFreeDelivery ? 0 : site.deliveryFee
  }, [subtotal, qualifiesForFreeDelivery])

  const freeDeliveryRemaining = useMemo(() => {
    if (site.deliveryFee === 0 || subtotal === 0) return 0
    return Math.max(0, site.freeDeliveryThreshold - subtotal)
  }, [subtotal])

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      detailedLines,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      freeDeliveryRemaining,
      isCartOpen,
      addItem,
      removeItem,
      setQty,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      lines,
      detailedLines,
      count,
      subtotal,
      deliveryFee,
      freeDeliveryRemaining,
      isCartOpen,
      addItem,
      removeItem,
      setQty,
      clearCart,
      openCart,
      closeCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
