import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, MessageCircle, ShoppingBag, Sparkles, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { site } from '@/config/site'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { getCategory } from '@/data/categories'
import { getColorOptions, getProductBySlug, getRelatedProducts } from '@/data/products'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/LanguageContext'
import { cx, formatINR } from '@/lib/format'
import { buildProductOrderMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { ProductCard } from '@/components/ui/ProductCard'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { Reveal } from '@/components/ui/Reveal'
import { StarRating } from '@/components/ui/StarRating'

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useLanguage()
  const { addItem, openCart } = useCart()
  const { showToast } = useToast()

  const product = slug ? getProductBySlug(slug) : undefined
  const [activeImage, setActiveImage] = useState(0)
  const [colorId, setColorId] = useState(product?.colors[0])
  const [qty, setQty] = useState(1)

  useDocumentTitle(product ? `${product.name.en} — ${site.name}` : `RIMIS CROCHET`)

  const colors = useMemo(() => (product ? getColorOptions(product) : []), [product])
  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product])

  if (!product) {
    return (
      <div className="container-x flex flex-col items-center gap-4 py-28 text-center">
        <h1 className="font-display text-3xl">{t('product.notFound')}</h1>
        <p className="max-w-sm text-sm text-ink-soft">{t('product.notFoundHint')}</p>
        <Link to="/shop" className="btn-primary mt-3">
          {t('product.backToShop')}
        </Link>
      </div>
    )
  }

  const category = getCategory(product.categoryId)
  const selectedColor = colors.find((c) => c.id === colorId)

  const subtotal = product.price * qty
  const delivery =
    site.deliveryFee === 0 || subtotal >= site.freeDeliveryThreshold ? 0 : site.deliveryFee
  const total = subtotal + delivery

  const handleAddToCart = () => {
    addItem(product.id, { colorId, qty })
    showToast(t('toast.addedToCart'))
    openCart()
  }

  const handleOrderNow = () => {
    const message = buildProductOrderMessage(
      t,
      {
        name: product.name[lang],
        colorName: selectedColor?.name[lang],
        qty,
        price: product.price,
      },
      { subtotal, delivery, total },
    )
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const details = [
    { label: t('product.materials'), value: product.materials[lang] },
    { label: t('product.dimensions'), value: product.dimensions[lang] },
    { label: t('product.care'), value: product.care[lang] },
  ]

  return (
    <div className="container-x pb-24 pt-6 lg:pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        <Link to="/" className="transition-colors hover:text-terracotta">
          {t('common.breadcrumbHome')}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="transition-colors hover:text-terracotta">
          {t('common.breadcrumbShop')}
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              to={`/shop?category=${category.id}`}
              className="transition-colors hover:text-terracotta"
            >
              {category.name[lang]}
            </Link>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-soft">{product.name[lang]}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[30px] bg-cream-200">
            <div className="aspect-[4/5] w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name[lang]}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-cream-50/95 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest2 text-ink shadow-soft backdrop-blur">
                {product.badge === 'bestseller'
                  ? t('common.bestseller')
                  : product.badge === 'new'
                    ? t('common.new')
                    : t('common.limited')}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`${product.name[lang]} ${index + 1}`}
                aria-current={activeImage === index}
                className={cx(
                  'overflow-hidden rounded-2xl border-2 transition-all duration-300',
                  activeImage === index
                    ? 'border-terracotta'
                    : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-20 w-16 object-cover sm:h-24 sm:w-20"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-2">
          {category && (
            <Link
              to={`/shop?category=${category.id}`}
              className="eyebrow transition-colors hover:text-terracotta-dark"
            >
              {category.name[lang]}
            </Link>
          )}
          <h1 className="mt-3 font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            {product.name[lang]}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              reviewLabel={t('product.reviews')}
              size="md"
            />
            <span
              className={cx(
                'rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider',
                product.inStock
                  ? 'bg-sage/15 text-sage-dark'
                  : 'bg-terracotta/10 text-terracotta-dark',
              )}
            >
              {product.inStock ? t('common.inStock') : t('common.madeToOrder')}
            </span>
          </div>

          <p className="mt-6 font-display text-3xl text-ink">{formatINR(product.price)}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
            {product.shortDescription[lang]}
          </p>

          {/* Colour */}
          {colors.length > 0 && (
            <div className="mt-8">
              <p className="field-label">
                {t('product.colour')}
                {selectedColor && (
                  <span className="ml-2 font-normal normal-case tracking-normal text-ink-soft">
                    {selectedColor.name[lang]}
                  </span>
                )}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setColorId(color.id)}
                    aria-label={color.name[lang]}
                    aria-pressed={colorId === color.id}
                    title={color.name[lang]}
                    className={cx(
                      'relative h-9 w-9 rounded-full border transition-transform duration-300',
                      colorId === color.id
                        ? 'scale-110 border-terracotta ring-2 ring-terracotta/30 ring-offset-2 ring-offset-cream-50'
                        : 'border-ink/15 hover:scale-105',
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div>
              <p className="field-label">{t('product.quantity')}</p>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
            <div className="hidden sm:block">
              <p className="field-label">{t('common.total')}</p>
              <p className="font-display text-2xl">{formatINR(total)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleAddToCart} className="btn-primary flex-1">
              <ShoppingBag className="h-4 w-4" />
              {t('common.addToCart')}
            </button>
            <button type="button" onClick={handleOrderNow} className="btn-terracotta flex-1">
              <MessageCircle className="h-4 w-4" />
              {t('common.orderNow')}
            </button>
          </div>

          {/* Trust strip */}
          <div className="mt-7 grid gap-3 rounded-3xl border border-clay-200/70 bg-cream-100 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <p className="text-xs leading-relaxed text-ink-soft">{t('product.dispatched')}</p>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <p className="text-xs leading-relaxed text-ink-soft">
                {t('product.freeDelivery', { amount: formatINR(site.freeDeliveryThreshold) })}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-8">
            <h2 className="font-display text-xl">{t('product.description')}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft text-pretty">
              {product.description[lang]}
            </p>

            <h2 className="mt-8 font-display text-xl">{t('product.details')}</h2>
            <dl className="mt-4 divide-y divide-clay-200/70 overflow-hidden rounded-3xl border border-clay-200/70">
              {details.map((detail) => (
                <div key={detail.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]">
                  <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                    {detail.label}
                  </dt>
                  <dd className="text-sm text-ink-soft">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="font-display text-3xl">{t('product.related')}</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
