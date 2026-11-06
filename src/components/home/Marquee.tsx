import { Star } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

export function Marquee() {
  const { t } = useLanguage()
  const items = [
    t('home.marquee1'),
    t('home.marquee2'),
    t('home.marquee3'),
    t('home.marquee4'),
    t('home.marquee5'),
    t('home.marquee6'),
  ]

  const strip = (
    <div className="flex shrink-0 items-center">
      {items.map((text, i) => (
        <span key={`${text}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap font-display text-lg italic text-cream-100/90 sm:text-xl">
            {text}
          </span>
          <Star className="mx-6 h-3.5 w-3.5 shrink-0 fill-honey text-honey sm:mx-8" />
        </span>
      ))}
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-ink py-5 text-cream-100" aria-hidden>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream-100/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cream-100/25 to-transparent" />
      <div className="flex w-max animate-marquee">
        {strip}
        {strip}
      </div>
    </section>
  )
}
