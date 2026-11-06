import { site } from '@/config/site'
import { formatINR } from './format'

export type TranslateFn = (path: string, params?: Record<string, string | number>) => string

export interface OrderCustomer {
  name: string
  phone: string
  address: string
  city: string
  pincode: string
  notes?: string
}

export interface OrderLineItem {
  name: string
  colorName?: string
  qty: number
  price: number
}

export interface OrderTotals {
  subtotal: number
  delivery: number
  total: number
}

/**
 * Builds the official WhatsApp Click-to-Chat URL.
 * @see https://faq.whatsapp.com/5913398998672934
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** A friendly pre-filled message used by the "chat with us" buttons. */
export function buildChatUrl(t: TranslateFn): string {
  return buildWhatsAppUrl(t('whatsapp.prefill'))
}

/**
 * Builds the complete, human-readable order message that is pre-filled
 * into WhatsApp. Labels follow the customer's selected language.
 */
export function buildOrderMessage(
  t: TranslateFn,
  customer: OrderCustomer,
  items: OrderLineItem[],
  totals: OrderTotals,
): string {
  const label = (key: string) => t(`order.${key}`)
  const out: string[] = []

  out.push(`*${label('header')}*`)
  out.push('')

  out.push(`*${label('customerSection')}*`)
  out.push(`${label('name')}: ${customer.name}`)
  out.push(`${label('phone')}: ${customer.phone}`)
  out.push(`${label('address')}: ${customer.address}`)
  out.push(`${label('city')}: ${customer.city}`)
  out.push(`${label('pincode')}: ${customer.pincode}`)
  if (customer.notes && customer.notes.trim()) {
    out.push(`${label('notes')}: ${customer.notes.trim()}`)
  }
  out.push('')

  out.push(`*${label('itemsSection')}*`)
  items.forEach((item, index) => {
    const name = item.colorName ? `${item.name} (${item.colorName})` : item.name
    out.push(
      `${index + 1}. ${name} × ${item.qty} — ${formatINR(item.price)} × ${item.qty} = ${formatINR(
        item.price * item.qty,
      )}`,
    )
  })
  out.push('')

  out.push(`*${label('summarySection')}*`)
  out.push(`${label('subtotal')}: ${formatINR(totals.subtotal)}`)
  out.push(
    `${label('delivery')}: ${totals.delivery === 0 ? t('common.free') : formatINR(totals.delivery)}`,
  )
  out.push(`${label('total')}: ${formatINR(totals.total)}`)
  out.push('')
  out.push(label('footer'))
  out.push(label('footerNote'))

  return out.join('\n')
}

/**
 * Message used by the "Order on WhatsApp" button on a product page.
 * Asks the shop to confirm availability before the customer shares delivery details.
 */
export function buildProductOrderMessage(
  t: TranslateFn,
  item: OrderLineItem,
  totals: OrderTotals,
): string {
  const label = (key: string) => t(`order.${key}`)
  const out: string[] = []

  out.push(`*${label('header')}*`)
  out.push('')
  out.push(label('productIntro'))

  const name = item.colorName ? `${item.name} (${item.colorName})` : item.name
  out.push(
    `• ${name} × ${item.qty} — ${formatINR(item.price)} × ${item.qty} = ${formatINR(
      item.price * item.qty,
    )}`,
  )
  out.push('')

  out.push(`*${label('summarySection')}*`)
  out.push(`${label('subtotal')}: ${formatINR(totals.subtotal)}`)
  out.push(
    `${label('delivery')}: ${totals.delivery === 0 ? t('common.free') : formatINR(totals.delivery)}`,
  )
  out.push(`${label('total')}: ${formatINR(totals.total)}`)
  out.push('')
  out.push(label('productOutro'))

  return out.join('\n')
}
