import { site } from '@/config/site'

/** Formats a number as Indian Rupees, e.g. 180 -> "₹180". */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount)
}

/** Simple class name joiner. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
