import type { LocalizedText } from '@/i18n/languages'

export type CategoryId = 'keychains' | 'bags' | 'home-decor' | 'accessories'

export interface Category {
  id: CategoryId
  name: LocalizedText
  blurb: LocalizedText
  image: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'keychains',
    name: {
      en: 'Keychains & Charms',
      bn: 'কীচেইন ও চার্ম',
      hi: 'कीचेन और चार्म',
    },
    blurb: {
      en: 'Little companions for your keys and bags.',
      bn: 'আপনার চাবি আর ব্যাগের ছোট সঙ্গী।',
      hi: 'आपकी चाबियों और बैग के छोटे साथी।',
    },
    image: '/products/rc-01.jpg',
  },
  {
    id: 'bags',
    name: {
      en: 'Bags & Purses',
      bn: 'ব্যাগ ও পার্স',
      hi: 'बैग और पर्स',
    },
    blurb: {
      en: 'Soft, hardworking bags crocheted for everyday.',
      bn: 'প্রতিদিনের ব্যবহারের জন্য নরম, হাতে বোনা ব্যাগ।',
      hi: 'रोज़मर्रा के लिए नरम, हाथ से बुने बैग।',
    },
    image: '/products/rc-04.jpg',
  },
  {
    id: 'home-decor',
    name: {
      en: 'Home Décor',
      bn: 'ঘর সাজানোর সামগ্রী',
      hi: 'घर की सजावट',
    },
    blurb: {
      en: 'Small touches that make a house feel warm.',
      bn: 'ঘরকে উষ্ণ করে তোলার ছোট ছোট স্পর্শ।',
      hi: 'घर को अपनापन देने वाली छोटी चीज़ें।',
    },
    image: '/products/rc-07.jpg',
  },
  {
    id: 'accessories',
    name: {
      en: 'Accessories & Gifts',
      bn: 'অ্যাকসেসরিজ ও উপহার',
      hi: 'एक्सेसरीज़ और उपहार',
    },
    blurb: {
      en: 'Thoughtful little gifts, ready to be loved.',
      bn: 'যত্নে বাছাই করা ছোট উপহার, ভালোবাসার জন্য প্রস্তুত।',
      hi: 'सोच-समझकर चुने छोटे उपहार, प्यार के लिए तैयार।',
    },
    image: '/products/rc-10.jpg',
  },
]

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
