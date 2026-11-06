import { motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '@/data/products'
import { getCategory } from '@/data/categories'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { useToast } from '@/context/ToastContext'
import { cx, formatINR } from '@/lib/format'
import { StarRating } from './StarRating'

interface ProductCardProps {
  product: Product
  /** Stagger index used for the entrance animation. */
  index?: number
  className?: string
}

export function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const { lang, t } = useLanguage()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const reduceMotion = useReducedMotion()

  const category = getCategory(product.categoryId)

  const badge =
    product.badge === 'bestseller'
      ? t('common.bestseller')
      : product.badge === 'new'
        ? t('common.new')
        : product.badge === 'limited'
          ? t('common.limited')
          : null

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id, { colorId: product.colors[0], qty: 1 })
    showToast(t('toast.addedToCart'))
  }

  const MotionArticle = reduceMotion ? 'article' : motion.article

  return (
    <MotionArticle
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 26 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.15 },
            transition: {
              duration: 0.6,
              delay: Math.min(index * 0.06, 0.4),
              ease: [0.22, 1, 0.36, 1] as const,
            },
          })}
      className={cx('group relative flex flex-col', className)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
        aria-label={`${product.name[lang]} — ${formatINR(product.price)}`}
      >
        <div className="relative overflow-hidden rounded-[26px] border border-clay-200/60 bg-cream-200 shadow-soft transition-shadow duration-500 ease-smooth group-hover:shadow-lift">
          <div className="aspect-[4/5] w-full">
            <img
              src={product.images[0]}
              alt={product.name[lang]}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]"
            />
          </div>

          {/* inner hairline that reveals on hover — a quiet "framed print" detail */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-[20px] border border-cream-50/0 transition-colors duration-500 ease-smooth group-hover:border-cream-50/45"
          />

          {/* soft gradient for legibility */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />

          {badge && (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ink shadow-soft backdrop-blur">
              {badge}
            </span>
          )}

          {!product.inStock && (
            <span className="absolute right-3.5 top-3.5 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-cream-50">
              {t('common.madeToOrder')}
            </span>
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`${t('common.addToCart')} — ${product.name[lang]}`}
            className="absolute bottom-3.5 right-3.5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-cream-50 text-ink opacity-0 shadow-card transition-all duration-400 ease-smooth hover:bg-terracotta hover:text-cream-50 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          {category && (
            <span className="text-[10px] font-medium uppercase tracking-widest2 text-ink-faint">
              {category.name[lang]}
            </span>
          )}
          <h3 className="mt-1.5 font-display text-[17px] leading-snug text-ink transition-colors duration-300 group-hover:text-terracotta">
            {product.name[lang]}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
            {product.shortDescription[lang]}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3 pt-1">
            <span className="font-display text-lg text-ink">{formatINR(product.price)}</span>
            <StarRating rating={product.rating} />
          </div>
        </div>
      </Link>
    </MotionArticle>
  )
}
