import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from './languages'
import { translations, type TranslationDict, type TranslationValue } from './translations'

const STORAGE_KEY = 'rimis:language'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  /** Translate a dot-path key, e.g. t('cart.title'). Supports {param} interpolation. */
  t: (path: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function resolve(dict: TranslationDict, path: string): string | undefined {
  const parts = path.split('.')
  let current: TranslationValue | undefined = dict
  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return undefined
    current = (current as TranslationDict)[part]
    if (current === undefined) return undefined
  }
  return typeof current === 'string' ? current : undefined
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  )
}

function detectInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      return stored as Language
    }
  } catch {
    /* localStorage unavailable — fall through */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : ''
  if (nav.startsWith('bn')) return 'bn'
  if (nav.startsWith('hi')) return 'hi'
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => detectInitialLanguage())

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore write failures (private mode etc.) */
    }
  }, [])

  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => {
      const value = resolve(translations[lang], path) ?? resolve(translations[DEFAULT_LANGUAGE], path)
      return interpolate(value ?? path, params)
    },
    [lang],
  )

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
