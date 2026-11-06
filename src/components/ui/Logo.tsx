import { site } from '@/config/site'
import { cx } from '@/lib/format'

interface LogoProps {
  /** `dark` for light backgrounds, `light` for dark backgrounds. */
  tone?: 'dark' | 'light'
  /** `full` shows the wordmark, `mark` shows only the fibre mark. */
  variant?: 'full' | 'mark'
  className?: string
}

/**
 * RIMIS CROCHET logo.
 *
 * TO USE YOUR ORIGINAL LOGO FILE:
 *   1. Save your logo as `public/logo.svg` (or `.png`).
 *   2. Replace the <svg> mark below with:
 *        <img src="/logo.svg" alt="RIMIS CROCHET" className="h-9 w-auto" />
 *   Nothing else needs to change.
 */
export function Logo({ tone = 'dark', variant = 'full', className }: LogoProps) {
  const textColor = tone === 'dark' ? 'text-ink' : 'text-cream-50'
  const subColor = tone === 'dark' ? 'text-ink-muted' : 'text-cream-200/80'

  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={cx(
          'h-9 w-9 shrink-0',
          tone === 'dark' ? 'text-terracotta' : 'text-cream-100',
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <circle cx="24" cy="24" r="21" className="opacity-25" />
        <path d="M24 11c4.2-3.4 10.4-2.6 13 1.8" />
        <path d="M11 24c-2.6 6 1.4 12.4 7.6 13.6" />
        <path d="M37 24c2.6 6-1.4 12.4-7.6 13.6" />
        <path d="M16 17c4.6-4.6 11.6-5.4 17-1.8" />
        <path d="M15 30c5.6 4.6 13.4 4.4 18.6-.6" />
        <circle cx="24" cy="24" r="3.4" fill="currentColor" stroke="none" />
      </svg>
      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span className={cx('font-display text-[19px] font-medium tracking-[0.14em]', textColor)}>
            RIMIS
          </span>
          <span className={cx('text-[9px] font-medium uppercase tracking-widest2', subColor)}>
            {site.name.replace('RIMIS ', '')}
          </span>
        </span>
      )}
    </span>
  )
}
