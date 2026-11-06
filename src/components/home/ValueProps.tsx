import { Heart, Leaf, MessageCircle, Package } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ValueProps() {
  const { t } = useLanguage()

  const values = [
    { icon: Heart, title: t('home.value1Title'), text: t('home.value1Text') },
    { icon: Package, title: t('home.value2Title'), text: t('home.value2Text') },
    { icon: Leaf, title: t('home.value3Title'), text: t('home.value3Text') },
    { icon: MessageCircle, title: t('home.value4Title'), text: t('home.value4Text') },
  ]

  return (
    <section className="bg-cream-100/70 py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow={t('home.valuesEyebrow')}
            title={t('home.valuesTitle')}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.07}>
              <div className="group flex h-full flex-col rounded-[26px] border border-clay-200/70 bg-cream-50/90 p-7 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta transition-colors duration-400 group-hover:bg-terracotta group-hover:text-cream-50">
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
  )
}
