import { Minus, Plus } from 'lucide-react'
import { cx } from '@/lib/format'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  className?: string
  decreaseLabel?: string
  increaseLabel?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
  className,
  decreaseLabel = 'Decrease quantity',
  increaseLabel = 'Increase quantity',
}: QuantityStepperProps) {
  const btn =
    size === 'sm'
      ? 'h-8 w-8'
      : 'h-11 w-11'
  const text = size === 'sm' ? 'w-8 text-sm' : 'w-12 text-base'

  return (
    <div
      className={cx(
        'inline-flex items-center rounded-full border border-clay-200 bg-cream-50',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={decreaseLabel}
        className={cx(
          'flex items-center justify-center rounded-full text-ink-soft transition-colors hover:text-terracotta disabled:opacity-35 disabled:hover:text-ink-soft',
          btn,
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={cx('text-center font-medium tabular-nums', text)} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={increaseLabel}
        className={cx(
          'flex items-center justify-center rounded-full text-ink-soft transition-colors hover:text-terracotta disabled:opacity-35 disabled:hover:text-ink-soft',
          btn,
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
