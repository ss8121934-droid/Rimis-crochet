import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'

/* Real shop photography, served from /public/products (see vite.config.ts). */
const heroMain = '/products/rc-04.jpg'
const heroSmall = '/products/rc-01.jpg'

export function Hero() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
  }
  const item: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }

  const stats = [
    { value: t('home.heroStat1Value'), label: t('home.heroStat1Label') },
    { value: t('home.heroStat2Value'), label: t('home.heroStat2Label') },
    { value: t('home.heroStat3Value'), label: t('home.heroStat3Label') },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* woven + grain texture bed */}
      <div className="weave-texture absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className="bg-grain absolute inset-0 -z-10 opacity-[0.04] mix-blend-multiply" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-terracotta/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-40 -z-10 h-[360px] w-[360px] rounded-full bg-sage/20 blur-3xl"
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="h-px w-6 bg-terracotta/50" aria-hidden />
            {t('home.heroEyebrow')}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[40px] leading-[1.03] tracking-[-0.02em] text-balance sm:text-[54px] lg:text-[64px]"
          >
            {t('home.heroTitle1')}
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-warm italic">{t('home.heroTitle2')}</span>
              <svg
                aria-hidden
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-terracotta/35"
              >
                <path
                  d="M2 8c34-6 64 2 96-1s58-6 120-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft text-pretty sm:text-base"
          >
            {t('home.heroSubtitle')}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-primary group">
              {t('home.heroCtaPrimary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/about" className="btn-outline">
              {t('home.heroCtaSecondary')}
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-ink/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-display text-[26px] leading-none text-ink">{stat.value}</dt>
                <dd className="mt-2 text-[11px] font-medium uppercase tracking-widest2 text-ink-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Image collage */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* offset "stitch" frame behind the hero photo */}
          <div
            className="absolute -inset-4 -z-10 rounded-[42px] border border-dashed border-terracotta/30"
            aria-hidden
          />

          <div className="overflow-hidden rounded-[34px] shadow-lift">
            <img
              src={heroMain}
              alt={t('home.heroEyebrow')}
              className="aspect-[4/5] w-full object-cover"
              fetchPriority="high"
            />
          </div>

          <motion.div
            className="absolute -bottom-6 -left-4 w-[46%] overflow-hidden rounded-[26px] border-4 border-cream-50 shadow-card sm:-left-8"
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={heroSmall}
              alt=""
              aria-hidden
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="glass-panel absolute -right-2 top-6 flex items-center gap-2 rounded-full px-4 py-2.5 sm:-right-6">
            <Sparkles className="h-4 w-4 text-terracotta" />
            <span className="text-xs font-medium text-ink">{t('home.heroBadge')}</span>
          </div>

          {/* small hand-made seal */}
          <div className="absolute -bottom-5 right-6 hidden h-20 w-20 place-items-center rounded-full border border-clay-200/80 bg-cream-50/90 text-center shadow-soft backdrop-blur sm:grid">
            <span className="text-[9px] font-medium uppercase leading-tight tracking-widest2 text-terracotta">
              {t('common.handmade')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
