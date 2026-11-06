export type Language = 'en' | 'bn' | 'hi'

export interface LanguageOption {
  code: Language
  /** English label, e.g. "Bengali" */
  label: string
  /** Native label, e.g. "বাংলা" */
  native: string
  /** Short code shown in the compact selector chip. */
  short: string
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', short: 'EN' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', short: 'বাং' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', short: 'हि' },
]

export const DEFAULT_LANGUAGE: Language = 'en'

/** A piece of text available in every supported language. */
export type LocalizedText = Record<Language, string>
