import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Info, MessageCircle, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cx, formatINR } from '@/lib/format'
import { PALETTE } from '@/data/products'
import { buildOrderMessage, buildWhatsAppUrl, type TranslateFn } from '@/lib/whatsapp'

interface FormState {
  name: string
  phone: string
  address: string
  city: string
  pincode: string
  notes: string
}

type FieldKey = keyof FormState
type FormErrors = Partial<Record<FieldKey, string>>

const STORAGE_KEY = 'rimis:customer'
const EMPTY_FORM: FormState = { name: '', phone: '', address: '', city: '', pincode: '', notes: '' }

function loadSavedCustomer(): FormState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_FORM
    const parsed = JSON.parse(raw) as Partial<FormState>
    return { ...EMPTY_FORM, ...parsed }
  } catch {
    return EMPTY_FORM
  }
}

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

function validate(values: FormState, t: TranslateFn): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = t('validation.nameRequired')
  else if (values.name.trim().length < 2) errors.name = t('validation.nameShort')

  const phone = normalizePhone(values.phone)
  if (!values.phone.trim()) errors.phone = t('validation.phoneRequired')
  else if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = t('validation.phoneInvalid')

  if (!values.address.trim()) errors.address = t('validation.addressRequired')
  else if (values.address.trim().length < 8) errors.address = t('validation.addressShort')

  if (!values.city.trim()) errors.city = t('validation.cityRequired')

  if (!values.pincode.trim()) errors.pincode = t('validation.pincodeRequired')
  else if (!/^\d{6}$/.test(values.pincode.trim())) errors.pincode = t('validation.pincodeInvalid')

  return errors
}

export function Checkout() {
  const { lang, t } = useLanguage()
  const { detailedLines, subtotal, deliveryFee, total } = useCart()

  const [form, setForm] = useState<FormState>(() => loadSavedCustomer())
  const [errors, setErrors] = useState<FormErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement | null>>>({})

  useDocumentTitle(`${t('checkout.title')} — RIMIS CROCHET`)

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        }),
      )
    } catch {
      /* ignore */
    }
  }, [form])

  const orderItems = useMemo(
    () =>
      detailedLines.map((line) => ({
        name: line.product.name[lang],
        colorName: line.colorId ? PALETTE[line.colorId].name[lang] : undefined,
        qty: line.qty,
        price: line.product.price,
      })),
    [detailedLines, lang],
  )

  const update = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)

    const nextErrors = validate(form, t)
    setErrors(nextErrors)

    const firstError = (Object.keys(nextErrors) as FieldKey[])[0]
    if (firstError) {
      const el = fieldRefs.current[firstError]
      el?.focus()
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const message = buildOrderMessage(
      t,
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
        notes: form.notes,
      },
      orderItems,
      { subtotal, delivery: deliveryFee, total },
    )

    const url = buildWhatsAppUrl(message)
    setWhatsappUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const errorList = (Object.keys(errors) as FieldKey[]).filter((k) => errors[k])

  if (detailedLines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-4 py-24 text-center lg:py-32">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
          <MessageCircle className="h-8 w-8 text-ink-faint" />
        </div>
        <h1 className="font-display text-3xl">{t('checkout.empty')}</h1>
        <Link to="/shop" className="btn-primary mt-3">
          {t('checkout.backToShop')}
        </Link>
      </div>
    )
  }

  return (
    <div className="container-x pb-24 pt-12 lg:pt-16">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-terracotta"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('cart.title')}
      </Link>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow mb-3 flex items-center gap-2.5">
          <span className="h-px w-6 bg-terracotta/50" aria-hidden />
          {t('checkout.title')}
        </p>
        <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl">{t('checkout.title')}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
          {t('checkout.subtitle')}
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="font-display text-2xl">{t('checkout.yourDetails')}</h2>

          {attempted && errorList.length > 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <div className="text-sm">
                <p className="font-medium text-terracotta-dark">{t('checkout.errorSummary')}</p>
                <ul className="mt-1 list-inside list-disc text-ink-soft">
                  {errorList.map((key) => (
                    <li key={key}>{errors[key]}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              className="sm:col-span-2"
              label={t('checkout.name')}
              placeholder={t('checkout.namePlaceholder')}
              value={form.name}
              error={attempted ? errors.name : undefined}
              autoComplete="name"
              onChange={(v) => update('name', v)}
              inputRef={(el) => (fieldRefs.current.name = el)}
            />
            <Field
              className="sm:col-span-2"
              label={t('checkout.phone')}
              placeholder={t('checkout.phonePlaceholder')}
              value={form.phone}
              error={attempted ? errors.phone : undefined}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              onChange={(v) => update('phone', v)}
              inputRef={(el) => (fieldRefs.current.phone = el)}
            />
            <Field
              className="sm:col-span-2"
              label={t('checkout.address')}
              placeholder={t('checkout.addressPlaceholder')}
              value={form.address}
              error={attempted ? errors.address : undefined}
              multiline
              autoComplete="street-address"
              onChange={(v) => update('address', v)}
              inputRef={(el) => (fieldRefs.current.address = el)}
            />
            <Field
              label={t('checkout.city')}
              placeholder={t('checkout.cityPlaceholder')}
              value={form.city}
              error={attempted ? errors.city : undefined}
              autoComplete="address-level2"
              onChange={(v) => update('city', v)}
              inputRef={(el) => (fieldRefs.current.city = el)}
            />
            <Field
              label={t('checkout.pincode')}
              placeholder={t('checkout.pincodePlaceholder')}
              value={form.pincode}
              error={attempted ? errors.pincode : undefined}
              inputMode="numeric"
              autoComplete="postal-code"
              onChange={(v) => update('pincode', v.replace(/\D/g, '').slice(0, 6))}
              inputRef={(el) => (fieldRefs.current.pincode = el)}
            />
            <Field
              className="sm:col-span-2"
              label={t('checkout.notes')}
              placeholder={t('checkout.notesPlaceholder')}
              value={form.notes}
              multiline
              required={false}
              onChange={(v) => update('notes', v)}
              inputRef={(el) => (fieldRefs.current.notes = el)}
            />
          </div>

          {/* How it works */}
          <div className="mt-10 rounded-[26px] border border-clay-200/70 bg-cream-100 p-6">
            <h3 className="font-display text-lg">{t('checkout.howItWorksTitle')}</h3>
            <ol className="mt-4 space-y-3">
              {[t('checkout.howStep1'), t('checkout.howStep2'), t('checkout.howStep3')].map(
                (step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-xs font-medium text-terracotta">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                  </li>
                ),
              )}
            </ol>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-cream-50 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" />
              <p className="text-xs leading-relaxed text-ink-soft">{t('checkout.waNote')}</p>
            </div>
          </div>

          <button type="submit" className="btn-terracotta mt-8 w-full py-4 text-base">
            <MessageCircle className="h-5 w-5" />
            {t('common.placeOrder')}
          </button>
          <p className="mt-3 text-center text-xs text-ink-faint">{t('checkout.terms')}</p>

          {whatsappUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 flex items-start gap-3 rounded-2xl border border-sage/30 bg-sage/5 p-4"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" />
              <p className="text-xs leading-relaxed text-ink-soft">
                {t('checkout.waNote')}{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-terracotta underline underline-offset-2"
                >
                  {t('whatsapp.orderVia')}
                </a>
              </p>
            </motion.div>
          )}
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[26px] border border-clay-200/70 bg-cream-100 p-6">
            <h2 className="font-display text-xl">{t('checkout.orderSummary')}</h2>

            <ul className="mt-5 space-y-4">
              {detailedLines.map((line) => {
                const color = line.colorId ? PALETTE[line.colorId] : undefined
                return (
                  <li key={line.id} className="flex gap-3.5">
                    <img
                      src={line.product.images[0]}
                      alt={line.product.name[lang]}
                      loading="lazy"
                      className="h-16 w-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug text-ink">
                        {line.product.name[lang]}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {color ? `${color.name[lang]} · ` : ''}
                        {t('common.quantity')}: {line.qty}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-ink">{formatINR(line.lineTotal)}</span>
                  </li>
                )
              })}
            </ul>

            <dl className="mt-6 space-y-3 border-t border-clay-200 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">{t('cart.itemTotal')}</dt>
                <dd className="text-ink">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">{t('common.delivery')}</dt>
                <dd className="text-ink">
                  {deliveryFee === 0 ? t('common.free') : formatINR(deliveryFee)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-clay-200 pt-5">
              <span className="text-sm font-medium text-ink">{t('common.total')}</span>
              <span className="font-display text-2xl">{formatINR(total)}</span>
            </div>

            <p className="mt-5 rounded-2xl bg-cream-50 p-4 text-xs leading-relaxed text-ink-soft">
              {t('product.dispatched')}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-4 block text-center text-xs text-ink-faint transition-colors hover:text-terracotta"
            >
              {t('footer.emailUs')}: {site.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
  type?: string
  inputMode?: 'text' | 'tel' | 'numeric' | 'email'
  autoComplete?: string
  multiline?: boolean
  required?: boolean
  inputRef?: (el: HTMLInputElement | HTMLTextAreaElement | null) => void
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
  type = 'text',
  inputMode,
  autoComplete,
  multiline,
  required = true,
  inputRef,
}: FieldProps) {
  const { t } = useLanguage()
  const describedBy = error ? `${label}-error` : undefined

  return (
    <div className={className}>
      <label className="field-label">
        {label}
        {required ? (
          <span aria-hidden className="ml-1">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal normal-case tracking-normal text-ink-faint">
            ({t('common.optional')})
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          ref={inputRef}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cx('input resize-none', error && 'border-terracotta focus:border-terracotta')}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cx('input', error && 'border-terracotta focus:border-terracotta')}
        />
      )}
      {error && (
        <p id={describedBy} className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
