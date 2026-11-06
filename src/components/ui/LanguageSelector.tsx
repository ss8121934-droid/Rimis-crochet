import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LANGUAGES } from '@/i18n/languages'
import { useLanguage } from '@/i18n/LanguageContext'
import { useToast } from '@/context/ToastContext'
import { cx } from '@/lib/format'

interface LanguageSelectorProps {
  tone?: 'dark' | 'light'
  className?: string
}

export function LanguageSelector({ tone = 'dark', className }: LanguageSelectorProps) {
  const { lang, setLang, t } = useLanguage()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const triggerTone =
    tone === 'dark'
      ? 'text-ink-soft hover:text-terracotta border-clay-200 hover:border-clay-300'
      : 'text-cream-100/90 hover:text-cream-50 border-cream-100/25 hover:border-cream-100/50'

  return (
    <div ref={ref} className={cx('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className={cx(
          'flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium tracking-wide transition-colors duration-300',
          triggerTone,
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{current.native}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('nav.language')}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-clay-200 bg-cream-50 p-1.5 shadow-card"
          >
            {LANGUAGES.map((option) => {
              const active = option.code === lang
              return (
                <li key={option.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setLang(option.code)
                      setOpen(false)
                      showToast(t('toast.languageChanged'))
                    }}
                    className={cx(
                      'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                      active
                        ? 'bg-terracotta/10 text-terracotta'
                        : 'text-ink-soft hover:bg-cream-200',
                    )}
                  >
                    <span className="flex flex-col leading-tight">
                      <span className="font-medium">{option.native}</span>
                      <span className="text-[10px] uppercase tracking-wider text-ink-faint">
                        {option.label}
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
