import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { useToast } from '@/context/ToastContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatINR } from '@/lib/format'
import { PALETTE } from '@/data/products'
import { QuantityStepper } from '@/components/ui/QuantityStepper'

export function Cart() {
  const { lang, t } = useLanguage()
  const { detailedLines, subtotal, deliveryFee, total, count, setQty, removeItem, clearCart, freeDeliveryRemaining } =
    useCart()
  const { showToast } = useToast()

  useDocumentTitle(`${t('cart.title')} — RIMIS CROCHET`)

  const progress =
    site.deliveryFee === 0 || site.freeDeliveryThreshold === 0
      ? 100
      : Math.min(100, Math.round((subtotal / site.freeDeliveryThreshold) * 100))

  if (detailedLines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-4 py-24 text-center lg:py-32">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
          <ShoppingBag className="h-8 w-8 text-ink-faint" />
        </div>
        <h1 className="font-display text-3xl">{t('cart.empty')}</h1>
        <p className="max-w-sm text-sm text-ink-soft">{t('cart.emptyHint')}</p>
        <Link to="/shop" className="btn-primary mt-3">
          {t('common.continueShopping')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-x pb-24 pt-12 lg:pt-16">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-terracotta/50" aria-hidden />
            {t('nav.cart')}
          </p>
          <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl">{t('cart.title')}</h1>
          <p className="mt-3 text-sm text-ink-muted">{t('cart.itemsCount', { count })}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearCart()
            showToast(t('toast.cartCleared'))
          }}
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-terracotta"
        >
          <Trash2 className="h-4 w-4" />
          {t('cart.clear')}
        </button>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        {/* Lines */}
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {detailedLines.map((line) => {
              const color = line.colorId ? PALETTE[line.colorId] : undefined
              return (
                <motion.li
                  key={line.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 rounded-[26px] border border-clay-200/70 bg-cream-100 p-4 sm:gap-5 sm:p-5"
                >
                  <Link to={`/product/${line.product.slug}`} className="shrink-0">
                    <img
                      src={line.product.images[0]}
                      alt={line.product.name[lang]}
                      loading="lazy"
                      className="h-28 w-24 rounded-2xl object-cover sm:h-32 sm:w-28"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${line.product.slug}`}
                          className="font-display text-[17px] leading-snug text-ink transition-colors hover:text-terracotta"
                        >
                          {line.product.name[lang]}
                        </Link>
                        {color && (
                          <span className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-muted">
                            <span
                              className="h-3 w-3 rounded-full border border-ink/10"
                              style={{ backgroundColor: color.hex }}
                              aria-hidden
                            />
                            {color.name[lang]}
                          </span>
                        )}
                        <p className="mt-1.5 text-sm text-ink-muted">
                          {formatINR(line.product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(line.id)
                          showToast(t('toast.removedFromCart'))
                        }}
                        aria-label={`${t('common.remove')} — ${line.product.name[lang]}`}
                        className="shrink-0 rounded-full p-2 text-ink-faint transition-colors hover:text-terracotta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(qty) => setQty(line.id, qty)}
                      />
                      <span className="font-display text-xl">{formatINR(line.lineTotal)}</span>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[26px] border border-clay-200/70 bg-cream-100 p-6">
            <h2 className="font-display text-xl">{t('cart.orderSummary')}</h2>

            {site.deliveryFee > 0 && (
              <div className="mt-5 rounded-2xl bg-cream-50 p-4">
                <p className="text-xs text-ink-soft">
                  {freeDeliveryRemaining > 0
                    ? t('cart.freeDeliveryHint', { amount: formatINR(freeDeliveryRemaining) })
                    : t('cart.freeDeliveryUnlocked')}
                </p>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-clay-200">
                  <motion.div
                    className="h-full rounded-full bg-terracotta"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">{t('cart.itemTotal')}</dt>
                <dd className="text-ink">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">{t('common.delivery')}</dt>
                <dd className="text-ink">
                  {deliveryFee === 0 ? t('common.free') : formatINR(deliveryFee)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-clay-200 pt-5">
              <span className="text-sm font-medium text-ink">{t('common.total')}</span>
              <span className="font-display text-2xl">{formatINR(total)}</span>
            </div>

            <Link to="/checkout" className="btn-terracotta mt-6 w-full">
              {t('common.checkout')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="btn-ghost mt-2 w-full">
              {t('common.continueShopping')}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
