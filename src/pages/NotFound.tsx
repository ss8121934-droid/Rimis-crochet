import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  const { t } = useLanguage()
  useDocumentTitle(`404 — ${t('notFound.title')} | RIMIS CROCHET`)

  return (
    <div className="container-x flex flex-col items-center gap-4 py-28 text-center lg:py-36">
      <p className="font-display text-[68px] leading-none text-terracotta/25 sm:text-[96px]">404</p>
      <h1 className="font-display text-3xl">{t('notFound.title')}</h1>
      <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{t('notFound.subtitle')}</p>
      <Link to="/" className="btn-primary group mt-3">
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        {t('notFound.cta')}
      </Link>
    </div>
  )
}
