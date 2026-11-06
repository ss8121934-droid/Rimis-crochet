import type { ReactNode } from 'react'
import { cx } from '@/lib/format'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'flex flex-col gap-6',
        action ? 'sm:flex-row sm:items-end sm:justify-between' : '',
        className,
      )}
    >
      <div
        className={cx(
          'max-w-2xl',
          align === 'center' && !action ? 'mx-auto text-center' : 'text-left',
        )}
      >
        {eyebrow && (
          <p
            className={cx(
              'eyebrow mb-3 flex items-center gap-2.5',
              align === 'center' && !action ? 'justify-center' : 'justify-start',
            )}
          >
            <span className="h-px w-6 bg-terracotta/50" aria-hidden />
            {eyebrow}
            <span className="h-1.5 w-1.5 rounded-full bg-honey/80" aria-hidden />
          </p>
        )}
        <h2 className="font-display text-[30px] leading-[1.08] tracking-[-0.015em] text-balance sm:text-[38px] lg:text-[44px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}
