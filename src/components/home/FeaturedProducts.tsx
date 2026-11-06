import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '@/data/products'
import { useLanguage } from '@/i18n/LanguageContext'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FeaturedProducts() {
  const { t } = useLanguage()

  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8)

  return (
    <section className="container-x py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow={t('home.featuredEyebrow')}
          title={t('home.featuredTitle')}
          subtitle={t('home.featuredSubtitle')}
          action={
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-terracotta"
            >
              {t('common.viewAll')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
