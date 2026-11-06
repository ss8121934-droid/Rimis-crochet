import { Star } from 'lucide-react'
import { cx } from '@/lib/format'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  reviewLabel?: string
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, reviewCount, reviewLabel, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <div className={cx('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cx(
              starSize,
              i < Math.round(rating) ? 'fill-honey text-honey' : 'text-clay-300',
            )}
          />
        ))}
      </div>
      <span className="text-xs text-ink-muted">
        {rating.toFixed(1)}
        {reviewCount !== undefined && reviewLabel ? ` · ${reviewCount} ${reviewLabel}` : ''}
      </span>
    </div>
  )
}
