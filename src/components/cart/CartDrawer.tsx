import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { useToast } from '@/context/ToastContext'
import { formatINR } from '@/lib/format'
import { PALETTE } from '@/data/products'
import { QuantityStepper } from '@/components/ui/QuantityStepper'

export function CartDrawer() {
  const { lang, t } = useLanguage()
  const { isCartOpen, closeCart, detailedLines, subtotal, count, setQty, removeItem, freeDeliveryRemaining } =
    useCart()
  const { showToast } = useToast()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isCartOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isCartOpen, closeCart])

  const progress =
    site.deliveryFee === 0 || site.freeDeliveryThreshold === 0
      ? 100
      : Math.min(100, Math.round((subtotal / site.freeDeliveryThreshold) * 100))

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-ink/45 backdrop-blur-[2px]"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t('cart.title')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[420px] flex-col bg-cream-50 shadow-card"
          >
            <header className="flex items-center justify-between border-b border-clay-200 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-[18px] w-[18px] text-terracotta" />
                <h2 className="font-display text-xl">{t('cart.title')}</h2>
                {count > 0 && (
                  <span className="rounded-full bg-cream-200 px-2 py-0.5 text-xs text-ink-soft">
                    {t('cart.itemsCount', { count })}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label={t('common.close')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {detailedLines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
                  <ShoppingBag className="h-7 w-7 text-ink-faint" />
                </div>
                <h3 className="font-display text-xl">{t('cart.empty')}</h3>
                <p className="text-sm text-ink-soft">{t('cart.emptyHint')}</p>
                <Link to="/shop" onClick={closeCart} className="btn-primary mt-3">
                  {t('common.continueShopping')}
                </Link>
              </div>
            ) : (
              <>
                {/* free delivery progress */}
                {site.deliveryFee > 0 && (
                  <div className="border-b border-clay-200 bg-cream-100 px-6 py-3.5">
                    <p className="text-xs text-ink-soft">
                      {freeDeliveryRemaining > 0
                        ? t('cart.freeDeliveryHint', { amount: formatINR(freeDeliveryRemaining) })
                        : t('cart.freeDeliveryUnlocked')}
                    </p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-clay-200">
                      <motion.div
                        className="h-full rounded-full bg-terracotta"
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-5">
                    <AnimatePresence initial={false}>
                      {detailedLines.map((line) => {
                        const color = line.colorId ? PALETTE[line.colorId] : undefined
                        return (
                          <motion.li
                            key={line.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-4"
                          >
                            <Link
                              to={`/product/${line.product.slug}`}
                              onClick={closeCart}
                              className="shrink-0"
                            >
                              <img
                                src={line.product.images[0]}
                                alt={line.product.name[lang]}
                                className="h-24 w-20 rounded-2xl object-cover"
                                loading="lazy"
                              />
                            </Link>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <Link
                                  to={`/product/${line.product.slug}`}
                                  onClick={closeCart}
                                  className="font-display text-[15px] leading-snug text-ink transition-colors hover:text-terracotta"
                                >
                                  {line.product.name[lang]}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    removeItem(line.id)
                                    showToast(t('toast.removedFromCart'))
                                  }}
                                  aria-label={t('common.remove')}
                                  className="shrink-0 rounded-full p-1 text-ink-faint transition-colors hover:text-terracotta"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              {color && (
                                <span className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                                  <span
                                    className="h-3 w-3 rounded-full border border-ink/10"
                                    style={{ backgroundColor: color.hex }}
                                    aria-hidden
                                  />
                                  {color.name[lang]}
                                </span>
                              )}
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <QuantityStepper
                                  value={line.qty}
                                  onChange={(qty) => setQty(line.id, qty)}
                                  size="sm"
                                />
                                <span className="font-display text-[15px]">
                                  {formatINR(line.lineTotal)}
                                </span>
                              </div>
                            </div>
                          </motion.li>
                        )
                      })}
                    </AnimatePresence>
                  </ul>
                </div>

                <footer className="border-t border-clay-200 px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{t('common.subtotal')}</span>
                    <span className="font-display text-lg">{formatINR(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-faint">{t('cart.deliveryNote')}</p>
                  <div className="mt-4 grid gap-2">
                    <Link to="/checkout" onClick={closeCart} className="btn-terracotta w-full">
                      {t('common.checkout')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/cart" onClick={closeCart} className="btn-outline w-full">
                      {t('cart.title')}
                    </Link>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
