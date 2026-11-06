import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/data/categories'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function CategoryGrid() {
  const { lang, t } = useLanguage()

  return (
    <section className="container-x py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow={t('home.categoriesEyebrow')}
          title={t('home.categoriesTitle')}
          subtitle={t('home.categoriesSubtitle')}
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.07}>
            <Link
              to={`/shop?category=${category.id}`}
              className="group relative block overflow-hidden rounded-[28px] border border-clay-200/60 bg-cream-200 shadow-soft transition-shadow duration-500 ease-smooth hover:shadow-lift"
            >
              <div className="aspect-[4/5] w-full">
                <img
                  src={category.image}
                  alt={category.name[lang]}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.07]"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl text-cream-50">{category.name[lang]}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream-200/80">
                      {category.blurb[lang]}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50/95 text-ink transition-transform duration-400 ease-smooth group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
