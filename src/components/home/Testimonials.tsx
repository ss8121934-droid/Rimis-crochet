import { Quote } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StarRating } from '@/components/ui/StarRating'

export function Testimonials() {
  const { t } = useLanguage()

  const reviews = [
    {
      quote: t('home.testimonial1Quote'),
      name: t('home.testimonial1Name'),
      meta: t('home.testimonial1Meta'),
    },
    {
      quote: t('home.testimonial2Quote'),
      name: t('home.testimonial2Name'),
      meta: t('home.testimonial2Meta'),
    },
    {
      quote: t('home.testimonial3Quote'),
      name: t('home.testimonial3Name'),
      meta: t('home.testimonial3Meta'),
    },
  ]

  return (
    <section className="bg-cream-100/70 py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow={t('home.testimonialsEyebrow')}
            title={t('home.testimonialsTitle')}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-[26px] border border-clay-200/70 bg-cream-50/90 p-7 shadow-soft">
                <Quote className="h-6 w-6 text-terracotta/40" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft text-pretty">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-clay-200/70 pt-5">
                  <div>
                    <p className="text-sm font-medium text-ink">{review.name}</p>
                    <p className="text-xs text-ink-muted">{review.meta}</p>
                  </div>
                  <StarRating rating={5} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
