import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'

/* Real shop photography, served from /public/products (see vite.config.ts). */
const storyImage = '/products/rc-08.jpg'

export function StorySection() {
  const { t } = useLanguage()

  const points = [
    { title: t('home.storyPoint1Title'), text: t('home.storyPoint1Text') },
    { title: t('home.storyPoint2Title'), text: t('home.storyPoint2Text') },
    { title: t('home.storyPoint3Title'), text: t('home.storyPoint3Text') },
  ]

  return (
    <section className="container-x py-20 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="overflow-hidden rounded-[34px] shadow-card">
              <img
                src={storyImage}
                alt={t('home.storyTitle')}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 rounded-3xl border border-clay-200 bg-cream-50 px-6 py-4 shadow-soft sm:right-8">
              <p className="font-display text-2xl text-terracotta">100%</p>
              <p className="text-[11px] font-medium uppercase tracking-widest2 text-ink-muted">
                {t('home.heroStat1Label')}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-3 flex items-center gap-2.5">
              <span className="h-px w-6 bg-terracotta/50" aria-hidden />
              {t('home.storyEyebrow')}
            </p>
            <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
              {t('home.storyTitle')}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft text-pretty">
              {t('home.storyP1')}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
              {t('home.storyP2')}
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => (
                <li key={point.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{point.title}</p>
                    <p className="text-sm text-ink-soft">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/about" className="btn-outline group mt-8">
              {t('home.storyCta')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
