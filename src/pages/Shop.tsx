import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type CategoryId } from '@/data/categories'
import { PRODUCTS } from '@/data/products'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cx, formatINR } from '@/lib/format'
import { ProductCard } from '@/components/ui/ProductCard'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name' | 'newest'
type PriceBand = 'all' | 'under-200' | '200-249' | '250-plus'

const PRICE_BANDS: PriceBand[] = ['all', 'under-200', '200-249', '250-plus']

export function Shop() {
  const { lang, t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [priceBand, setPriceBand] = useState<PriceBand>('all')
  const [sort, setSort] = useState<SortKey>('featured')

  const categoryParam = searchParams.get('category')
  const activeCategory: CategoryId | 'all' =
    categoryParam && CATEGORIES.some((c) => c.id === categoryParam)
      ? (categoryParam as CategoryId)
      : 'all'

  useDocumentTitle(`${t('shop.title')} — RIMIS CROCHET`)

  const setCategory = (id: CategoryId | 'all') => {
    const next = new URLSearchParams(searchParams)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setSearchParams(next, { replace: true })
  }

  const priceBandLabel = (band: PriceBand) => {
    switch (band) {
      case 'under-200':
        return `< ${formatINR(200)}`
      case '200-249':
        return `${formatINR(200)} – ${formatINR(249)}`
      case '250-plus':
        return `${formatINR(250)}+`
      default:
        return t('shop.priceAll')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    const matchesPrice = (price: number) => {
      switch (priceBand) {
        case 'under-200':
          return price < 200
        case '200-249':
          return price >= 200 && price < 250
        case '250-plus':
          return price >= 250
        default:
          return true
      }
    }

    const result = PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.categoryId !== activeCategory) return false
      if (!matchesPrice(product.price)) return false
      if (!q) return true
      const haystack = [
        product.name.en,
        product.name.bn,
        product.name.hi,
        product.shortDescription.en,
        product.shortDescription.bn,
        product.shortDescription.hi,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })

    const sorted = [...result]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name':
        sorted.sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
        break
      case 'newest':
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return sorted
  }, [query, priceBand, sort, activeCategory, lang])

  const hasFilters = query.trim() !== '' || priceBand !== 'all' || activeCategory !== 'all'

  const clearFilters = () => {
    setQuery('')
    setPriceBand('all')
    setCategory('all')
  }

  return (
    <div className="container-x pb-24 pt-12 lg:pt-16">
      <header className="max-w-2xl">
        <p className="eyebrow mb-3 flex items-center gap-2.5">
          <span className="h-px w-6 bg-terracotta/50" aria-hidden />
          {t('nav.shop')}
        </p>
        <h1 className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl">
          {t('shop.title')}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
          {t('shop.subtitle')}
        </p>
      </header>

      {/* Toolbar */}
      <div className="mt-10 rounded-[28px] border border-clay-200/70 bg-cream-100 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t('shop.searchPlaceholder')}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('shop.searchPlaceholder')}
              className="input pl-11"
            />
          </label>

          <div className="flex items-center gap-3">
            <label className="relative flex-1 sm:flex-none">
              <span className="sr-only">{t('shop.sortLabel')}</span>
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="input cursor-pointer appearance-none pl-11 pr-10 sm:w-56"
              >
                <option value="featured">{t('shop.sortFeatured')}</option>
                <option value="price-asc">{t('shop.sortPriceLow')}</option>
                <option value="price-desc">{t('shop.sortPriceHigh')}</option>
                <option value="name">{t('shop.sortName')}</option>
                <option value="newest">{t('shop.sortNewest')}</option>
              </select>
            </label>
          </div>
        </div>

        {/* Category chips */}
        <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
          <CategoryChip
            active={activeCategory === 'all'}
            onClick={() => setCategory('all')}
            label={t('shop.allCategories')}
          />
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setCategory(category.id)}
              label={category.name[lang]}
            />
          ))}
        </div>

        {/* Price chips */}
        <div className="no-scrollbar -mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1">
          <span className="flex shrink-0 items-center pr-1 text-[11px] font-medium uppercase tracking-widest2 text-ink-faint">
            {t('shop.priceLabel')}
          </span>
          {PRICE_BANDS.map((band) => (
            <CategoryChip
              key={band}
              active={priceBand === band}
              onClick={() => setPriceBand(band)}
              label={priceBandLabel(band)}
              subtle
            />
          ))}
        </div>
      </div>

      {/* Results meta */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">{t('shop.results', { count: filtered.length })}</p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-sm text-terracotta transition-opacity hover:opacity-75"
          >
            <X className="h-3.5 w-3.5" />
            {t('shop.clearFilters')}
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-16 flex flex-col items-center gap-3 rounded-[28px] border border-dashed border-clay-300 bg-cream-100 px-8 py-20 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-200">
            <Search className="h-6 w-6 text-ink-faint" />
          </div>
          <h2 className="font-display text-2xl">{t('shop.noResults')}</h2>
          <p className="max-w-sm text-sm text-ink-soft">{t('shop.noResultsHint')}</p>
          <button type="button" onClick={clearFilters} className="btn-primary mt-3">
            {t('shop.clearFilters')}
          </button>
        </motion.div>
      )}
    </div>
  )
}

interface CategoryChipProps {
  active: boolean
  label: string
  onClick: () => void
  subtle?: boolean
}

function CategoryChip({ active, label, onClick, subtle }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-smooth',
        active
          ? 'border-ink bg-ink text-cream-50'
          : subtle
            ? 'border-clay-200 bg-transparent text-ink-muted hover:border-clay-300 hover:text-ink'
            : 'border-clay-200 bg-cream-50 text-ink-soft hover:border-clay-300 hover:text-ink',
      )}
    >
      {label}
    </button>
  )
}
