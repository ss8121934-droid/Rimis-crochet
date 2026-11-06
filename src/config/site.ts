/**
 * RIMIS CROCHET — central business configuration.
 *
 * Everything a shop owner needs to change lives here (or in `src/data/products.ts`).
 * No prices or business-critical values are hidden inside components.
 */
export const site = {
  /** Brand name — rendered as the wordmark logo. */
  name: 'RIMIS CROCHET',
  /** Used in the short form of the logo mark. */
  monogram: 'RC',

  /**
   * Official WhatsApp business number in international format,
   * digits only, no "+" and no spaces. Used for Click-to-Chat ordering.
   */
  whatsappNumber: '917602478438',
  /** Human-friendly version shown in the UI. */
  whatsappDisplay: '+91 76024 78438',

  /** Customer support email. */
  email: 'rimmandal4455@gmail.com',

  /** Shown in the footer. Keep short. */
  location: 'India',

  /** Social profiles — leave as empty string to hide the link in the footer. */
  instagram: '',
  facebook: '',

  /** Delivery charges in INR. Set `deliveryFee` to 0 for free delivery. */
  deliveryFee: 49,
  /** Orders at or above this subtotal qualify for free delivery. */
  freeDeliveryThreshold: 699,

  /** Currency (Indian Rupees). */
  currency: 'INR',
  currencySymbol: '₹',
}

export type SiteConfig = typeof site
