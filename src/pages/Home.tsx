import { site } from '@/config/site'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/LanguageContext'
import { CtaBanner } from '@/components/home/CtaBanner'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { StorySection } from '@/components/home/StorySection'
import { Testimonials } from '@/components/home/Testimonials'
import { ValueProps } from '@/components/home/ValueProps'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { PRODUCTS } from '@/data/products'

export function Home() {
  const { t } = useLanguage()
  useDocumentTitle(`${site.name} — ${t('brand.tagline')}`)

  const bestsellers = PRODUCTS.filter((p) => p.badge === 'bestseller')

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <FeaturedProducts />

      {bestsellers.length > 0 && (
        <section className="container-x pb-20 lg:pb-24">
          <Reveal>
            <SectionHeading
              eyebrow={t('home.bestsellersEyebrow')}
              title={t('home.bestsellersTitle')}
            />
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      <StorySection />
      <ValueProps />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
