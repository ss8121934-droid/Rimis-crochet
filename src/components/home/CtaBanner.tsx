import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { buildChatUrl } from '@/lib/whatsapp'
import { Reveal } from '@/components/ui/Reveal'

export function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="container-x py-20 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-ink via-[#3A2A1D] to-[#4A3222] px-8 py-16 text-center sm:px-14 lg:py-20">
          {/* warm colour clouds */}
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-terracotta/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sage/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey/15 blur-3xl"
            aria-hidden
          />
          {/* uncoated-paper grain */}
          <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" aria-hidden />
          {/* hand-stitched inner frame */}
          <div
            className="pointer-events-none absolute inset-5 rounded-[26px] border border-dashed border-cream-100/20"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl leading-[1.1] text-cream-50 text-balance sm:text-4xl lg:text-[46px]">
              {t('home.ctaTitle')}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream-200/80 text-pretty">
              {t('home.ctaSubtitle')}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/shop"
                className="btn group bg-cream-50 text-ink hover:bg-terracotta hover:text-cream-50"
              >
                {t('home.ctaPrimary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={buildChatUrl(t)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-cream-100/25 text-cream-50 hover:bg-cream-50/10"
              >
                <MessageCircle className="h-4 w-4" />
                {t('home.ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
