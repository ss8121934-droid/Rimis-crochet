import { ArrowRight, Check, Heart, Leaf, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { buildChatUrl } from '@/lib/whatsapp'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

/* Real shop photography, served from /public/products (see vite.config.ts). */
const studioImage = '/products/rc-05.jpg'
const craftImage = '/products/rc-09.jpg'

export function About() {
  const { t } = useLanguage()
  useDocumentTitle(`${t('about.title')} — ${site.name}`)

  const values = [
    { icon: Heart, title: t('about.value1Title'), text: t('about.value1Text') },
    { icon: Sparkles, title: t('about.value2Title'), text: t('about.value2Text') },
    { icon: Leaf, title: t('about.value3Title'), text: t('about.value3Text') },
  ]

  const promises = [
    t('home.storyPoint1Text'),
    t('home.storyPoint2Text'),
    t('home.storyPoint3Text'),
  ]

  return (
    <div className="pb-24">
      {/* Intro */}
      <section className="container-x pt-12 lg:pt-16">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-terracotta/50" aria-hidden />
            {t('about.eyebrow')}
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-[56px]">
            {t('about.title')}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft text-pretty">
            {t('about.lead')}
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="container-x mt-16 lg:mt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[34px] shadow-card">
              <img
                src={studioImage}
                alt={t('about.title')}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[15px] leading-relaxed text-ink-soft text-pretty">
                {t('about.p1')}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
                {t('about.p2')}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
                {t('about.p3')}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-4">
                {promises.map((text) => (
                  <li key={text} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="mt-20 bg-cream-100/70 py-20 lg:mt-24 lg:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.valuesTitle')} />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.07}>
                <div className="flex h-full flex-col rounded-[26px] border border-clay-200/70 bg-cream-50 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing image + CTA */}
      <section className="container-x mt-20 lg:mt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[34px] shadow-card">
              <img
                src={craftImage}
                alt=""
                aria-hidden
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display text-3xl leading-[1.12] text-balance sm:text-4xl">
              {t('about.ctaTitle')}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
              {t('about.ctaText')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildChatUrl(t)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terracotta group"
              >
                <MessageCircle className="h-4 w-4" />
                {t('whatsapp.chat')}
              </a>
              <Link to="/shop" className="btn-outline group">
                {t('common.shopNow')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-ink-faint">
              {site.whatsappDisplay} · {site.email}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
