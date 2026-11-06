import type { LocalizedText } from '@/i18n/languages'
import type { CategoryId } from './categories'

/*
 * Real product photography — the shop owner's own photos.
 *
 * The originals live in `/assets` with WhatsApp export names (spaces and
 * parentheses), which are fragile inside URLs. The `publishProductPhotos`
 * plugin in `vite.config.ts` copies them, byte-for-byte, into
 * `/public/products` as clean, URL-safe files (`rc-01.jpg` … `rc-10.jpg`)
 * every time the dev server or a build starts. The app therefore only ever
 * references simple, reliable paths like `/products/rc-01.jpg`.
 *
 * To swap a photo, drop a new file into `public/products` and update the
 * matching `images` entry below. The website frames every photo with a
 * fixed 4:5 ratio and `object-cover`, so each image fills the frame
 * edge-to-edge without being stretched or distorted.
 */

export interface ColorOption {
  id: PaletteKey
  name: LocalizedText
  hex: string
}

/**
 * Shared yarn palette. Reused across products so colours stay consistent
 * and translations live in exactly one place.
 */
export const PALETTE = {
  mustard: { hex: '#DFA72B', name: { en: 'Mustard', bn: 'সরিষা', hi: 'सरसों' } },
  cream: { hex: '#F1E6D2', name: { en: 'Cream', bn: 'ক্রিম', hi: 'क्रीम' } },
  ivory: { hex: '#FAF4E9', name: { en: 'Ivory', bn: 'আইভরি', hi: 'आइवरी' } },
  terracotta: { hex: '#C06B3E', name: { en: 'Terracotta', bn: 'টেরাকোটা', hi: 'टेराकोटा' } },
  sage: { hex: '#7C8B6B', name: { en: 'Sage', bn: 'সেজ সবুজ', hi: 'सेज हरा' } },
  olive: { hex: '#6E7A4B', name: { en: 'Olive', bn: 'অলিভ', hi: 'ऑलिव' } },
  blush: { hex: '#D8A79B', name: { en: 'Blush', bn: 'ব্লাশ', hi: 'ब्लश' } },
  rose: { hex: '#C97D8E', name: { en: 'Dusty Rose', bn: 'গোলাপি', hi: 'गुलाबी' } },
  sky: { hex: '#A7C4D6', name: { en: 'Sky', bn: 'আকাশি', hi: 'आसमानी' } },
  charcoal: { hex: '#3B3A38', name: { en: 'Charcoal', bn: 'চারকোল', hi: 'चारकोल' } },
  forest: { hex: '#43503A', name: { en: 'Forest', bn: 'গাঢ় সবুজ', hi: 'गहरा हरा' } },
} satisfies Record<string, Omit<ColorOption, 'id'>>

export type PaletteKey = keyof typeof PALETTE

export interface Product {
  id: string
  slug: string
  name: LocalizedText
  categoryId: CategoryId
  price: number
  shortDescription: LocalizedText
  description: LocalizedText
  materials: LocalizedText
  dimensions: LocalizedText
  care: LocalizedText
  colors: PaletteKey[]
  images: string[]
  inStock: boolean
  badge?: 'bestseller' | 'new' | 'limited'
  rating: number
  reviewCount: number
  /** ISO date — used for "Newest first" sorting. */
  createdAt: string
  featured: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'p-01',
    slug: 'sunny-sunflower-keychain',
    name: {
      en: 'Sunny Sunflower Keychain',
      bn: 'রোদেলা সূর্যমুখী কীচেইন',
      hi: 'सनशाइन सूरजमुखी कीचेन',
    },
    categoryId: 'keychains',
    price: 250,
    shortDescription: {
      en: 'A cheerful crochet sunflower to brighten your keys or bag.',
      bn: 'আপনার চাবি বা ব্যাগে রোদ্দুর আনার একটি আনন্দময় সূর্যমুখী।',
      hi: 'आपकी चाबी या बैग को रोशन करने वाला एक खुशमिजाज सूरजमुखी।',
    },
    description: {
      en: 'Hand-crocheted petal by petal, this little sunflower is the perfect everyday pick-me-up. Finished with a sturdy metal ring, it clips easily onto keys, totes or backpacks and holds its shape beautifully.',
      bn: 'একটি একটি পাপড়ি হাতে বুনে তৈরি এই ছোট সূর্যমুখীটি প্রতিদিনের আনন্দ। মজবুত ধাতব রিং দেওয়া, তাই চাবি, টোট ব্যাগ বা স্কুলব্যাগে সহজেই লাগানো যায় এবং দীর্ঘদিন সুন্দর থাকে।',
      hi: 'एक-एक पंखुड़ी हाथ से बुनकर बनाया गया यह छोटा सूरजमुखी रोज़ की खुशी है। मज़बूत धातु की रिंग के साथ, इसे चाबियों, टोट बैग या स्कूल बैग पर आसानी से लगाया जा सकता है और यह लंबे समय तक सुंदर बना रहता है।',
    },
    materials: {
      en: 'Soft cotton yarn, metal keyring',
      bn: 'নরম সুতি সুতা, ধাতব কী-রিং',
      hi: 'नरम सूती धागा, धातु की-रिंग',
    },
    dimensions: {
      en: 'Approx. 7 cm across',
      bn: 'প্রায় ৭ সেমি চওড়া',
      hi: 'लगभग 7 सेमी चौड़ाई',
    },
    care: {
      en: 'Hand wash gently in cool water. Do not wring. Dry flat in shade.',
      bn: 'ঠান্ডা জলে হালকা করে হাতে ধুয়ে নিন। মোচড়াবেন না। ছায়ায় সমান করে শুকান।',
      hi: 'ठंडे पानी में हल्के हाथ से धोएँ। निचोड़ें नहीं। छाया में सपाट सुखाएँ।',
    },
    colors: ['mustard', 'cream', 'terracotta'],
    images: ['/products/rc-01.jpg'],
    inStock: true,
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2024-02-10',
    featured: true,
  },
  {
    id: 'p-02',
    slug: 'blossom-bloom-keychain',
    name: {
      en: 'Blossom Bloom Keychain',
      bn: 'ব্লসম ফুল কীচেইন',
      hi: 'ब्लॉसम फूल कीचेन',
    },
    categoryId: 'keychains',
    price: 270,
    shortDescription: {
      en: 'A tiny five-petal blossom that never wilts.',
      bn: 'একটি ছোট পাঁচ পাপড়ির ফুল, যা কখনও শুকায় না।',
      hi: 'एक छोटा पाँच पंखुड़ियों वाला फूल, जो कभी मुरझाता नहीं।',
    },
    description: {
      en: 'A delicate little blossom crocheted in fine cotton, with a soft padded centre and a neat leaf. Small enough to be subtle, special enough to be noticed — lovely as a gift topper too.',
      bn: 'সূক্ষ্ম সুতি সুতায় বোনা একটি কোমল ফুল, নরম ভরা কেন্দ্র আর একটি ছোট পাতা সহ। যথেষ্ট ছোট যাতে বিনয়ী দেখায়, আবার যথেষ্ট বিশেষ যাতে চোখে পড়ে — উপহারের সাথেও দারুণ মানায়।',
      hi: 'महीन सूती धागे से बुना एक कोमल फूल, नरम भरे केंद्र और एक छोटी पत्ती के साथ। इतना छोटा कि सहज लगे, इतना खास कि नज़र आ जाए — उपहार के साथ भी बहुत सुंदर लगता है।',
    },
    materials: {
      en: 'Soft cotton yarn, metal keyring',
      bn: 'নরম সুতি সুতা, ধাতব কী-রিং',
      hi: 'नरम सूती धागा, धातु की-रिंग',
    },
    dimensions: {
      en: 'Approx. 6 cm across',
      bn: 'প্রায় ৬ সেমি চওড়া',
      hi: 'लगभग 6 सेमी चौड़ाई',
    },
    care: {
      en: 'Hand wash gently in cool water. Dry flat in shade.',
      bn: 'ঠান্ডা জলে হালকা করে হাতে ধুয়ে নিন। ছায়ায় সমান করে শুকান।',
      hi: 'ठंडे पानी में हल्के हाथ से धोएँ। छाया में सपाट सुखाएँ।',
    },
    colors: ['blush', 'ivory', 'sky'],
    images: ['/products/rc-02.jpg'],
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
    createdAt: '2024-03-18',
    featured: false,
  },
  {
    id: 'p-03',
    slug: 'little-bunny-buddy-keychain',
    name: {
      en: 'Little Bunny Buddy Keychain',
      bn: 'লিটল বানি বন্ধু কীচেইন',
      hi: 'लिटिल बनी बडी कीचेन',
    },
    categoryId: 'keychains',
    price: 290,
    shortDescription: {
      en: 'A pocket-sized bunny with the softest floppy ears.',
      bn: 'সবচেয়ে নরম ঝুলে পড়া কানওয়ালা পকেট-সাইজ খরগোশ।',
      hi: 'सबसे नरम लटकते कानों वाला जेब के आकार का खरगोश।',
    },
    description: {
      en: 'Meet your new little buddy — a palm-sized crochet bunny with floppy ears, stitched eyes and a tiny cotton tail. Light enough to carry everywhere and sturdy enough to survive the journey.',
      bn: 'আপনার নতুন ছোট বন্ধুর সাথে পরিচয় — হাতের তালুর আকারের একটি ক্রোশে খরগোশ, ঝুলে পড়া কান, সেলাই করা চোখ আর ছোট তুলতুলে লেজ সহ। যেখানেই যান, সহজে নিয়ে যেতে পারবেন।',
      hi: 'अपने नए छोटे दोस्त से मिलिए — हथेली के आकार का क्रोशे खरगोश, लटकते कान, सिली हुई आँखें और छोटी सूती पूँछ के साथ। हल्का, इसलिए हर जगह साथ ले जाएँ।',
    },
    materials: {
      en: 'Soft cotton yarn, hypoallergenic fibrefill, metal keyring',
      bn: 'নরম সুতি সুতা, অ্যালার্জি-মুক্ত ফাইবারফিল, ধাতব কী-রিং',
      hi: 'नरम सूती धागा, एलर्जी-रहित फाइबरफिल, धातु की-रिंग',
    },
    dimensions: {
      en: 'Approx. 8 cm tall',
      bn: 'প্রায় ৮ সেমি উচ্চ',
      hi: 'लगभग 8 सेमी ऊँचाई',
    },
    care: {
      en: 'Spot clean with a damp cloth. Do not machine wash.',
      bn: 'ভেজা কাপড় দিয়ে হালকা করে মুছুন। মেশিনে ধোবেন না।',
      hi: 'गीले कपड़े से हल्के हाथ से साफ़ करें। मशीन में न धोएँ।',
    },
    colors: ['ivory', 'blush', 'sage'],
    images: ['/products/rc-03.jpg'],
    inStock: true,
    badge: 'new',
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2024-08-02',
    featured: true,
  },
  {
    id: 'p-04',
    slug: 'meadow-mini-tote',
    name: {
      en: 'Meadow Mini Tote',
      bn: 'মেডো মিনি টোট',
      hi: 'मेडो मिनी टोट',
    },
    categoryId: 'bags',
    price: 450,
    shortDescription: {
      en: 'A sturdy little tote for errands, books and everyday treasures.',
      bn: 'ছোট কাজ, বই আর প্রতিদিনের জিনিসের জন্য একটি মজবুত ছোট টোট।',
      hi: 'छोटे काम, किताबों और रोज़ की चीज़ों के लिए मज़बूत छोटा टोट।',
    },
    description: {
      en: 'Crocheted with a dense stitch so it holds its shape, the Meadow Mini Tote carries more than it looks. Soft cotton handles sit comfortably on the shoulder, and the open top keeps everything easy to reach.',
      bn: 'ঘন বুনন দিয়ে তৈরি, তাই আকৃতি ভালোভাবে ধরে রাখে — দেখতে ছোট হলেও মেডো মিনি টোট অনেক কিছু বহন করে। নরম সুতি হাতল কাঁধে আরামদায়ক, আর খোলা মুখের জন্য জিনিস বের করা সহজ।',
      hi: 'घनी बुनाई से बना, इसलिए आकार बनाए रखता है — देखने में छोटा, पर मेडो मिनी टोट बहुत कुछ ले जाता है। नरम सूती हैंडल कंधे पर आरामदायक, और खुला मुँह चीज़ें निकालना आसान बनाता है।',
    },
    materials: {
      en: 'Soft cotton yarn, cotton lining, reinforced handles',
      bn: 'নরম সুতি সুতা, সুতি আস্তরণ, মজবুত হাতল',
      hi: 'नरम सूती धागा, सूती लाइनिंग, मज़बूत हैंडल',
    },
    dimensions: {
      en: 'Approx. 28 × 24 cm',
      bn: 'প্রায় ২৮ × ২৪ সেমি',
      hi: 'लगभग 28 × 24 सेमी',
    },
    care: {
      en: 'Hand wash gently in cool water and dry flat. Reshape while damp.',
      bn: 'ঠান্ডা জলে হালকা করে হাতে ধুয়ে সমান করে শুকান। ভেজা অবস্থায় আকার ঠিক করে নিন।',
      hi: 'ठंडे पानी में हल्के हाथ से धोएँ और सपाट सुखाएँ। गीले में आकार ठीक करें।',
    },
    colors: ['cream', 'sage', 'terracotta'],
    images: ['/products/rc-04.jpg'],
    inStock: true,
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 56,
    createdAt: '2024-01-22',
    featured: true,
  },
  {
    id: 'p-05',
    slug: 'ivory-grace-sling-purse',
    name: {
      en: 'Ivory Grace Sling Purse',
      bn: 'আইভরি গ্রেস স্লিং পার্স',
      hi: 'आइवरी ग्रेस स्लिंग पर्स',
    },
    categoryId: 'bags',
    price: 420,
    shortDescription: {
      en: 'A dainty cross-body purse for hands-free days.',
      bn: 'হাত খালি রাখার দিনের জন্য একটি ছোট ক্রস-বডি পার্স।',
      hi: 'हाथ खाली रखने वाले दिनों के लिए एक छोटा क्रॉस-बॉडी पर्स।',
    },
    description: {
      en: 'Slim, soft and quietly elegant, the Ivory Grace is just big enough for a phone, cards and a lip balm. The long strap sits across the body so your hands stay free.',
      bn: 'পাতলা, নরম আর নিঃশব্দে রুচিশীল — আইভরি গ্রেস-এ ফোন, কার্ড আর একটি লিপ বাম যথেষ্ট ভালোভাবে ধরে। লম্বা স্ট্র্যাপ কাঁধ থেকে ঝোলে, হাত থাকে খালি।',
      hi: 'पतला, नरम और शांत रूप से सुंदर — आइवरी ग्रेस में फ़ोन, कार्ड और लिप बाम आराम से आ जाते हैं। लंबा पट्टा क्रॉस-बॉडी रहता है, इसलिए हाथ खाली रहते हैं।',
    },
    materials: {
      en: 'Soft cotton yarn, cotton lining, wooden button',
      bn: 'নরম সুতি সুতা, সুতি আস্তরণ, কাঠের বোতাম',
      hi: 'नरम सूती धागा, सूती लाइनिंग, लकड़ी का बटन',
    },
    dimensions: {
      en: 'Approx. 20 × 15 cm, 110 cm strap',
      bn: 'প্রায় ২০ × ১৫ সেমি, ১১০ সেমি স্ট্র্যাপ',
      hi: 'लगभग 20 × 15 सेमी, 110 सेमी पट्टा',
    },
    care: {
      en: 'Hand wash gently. Dry flat in shade and reshape while damp.',
      bn: 'হালকা করে হাতে ধুয়ে নিন। ছায়ায় সমান করে শুকিয়ে ভেজা অবস্থায় আকার ঠিক করুন।',
      hi: 'हल्के हाथ से धोएँ। छाया में सपाट सुखाएँ और गीले में आकार ठीक करें।',
    },
    colors: ['ivory', 'blush', 'forest'],
    images: ['/products/rc-05.jpg'],
    inStock: true,
    rating: 4.8,
    reviewCount: 31,
    createdAt: '2024-05-09',
    featured: false,
  },
  {
    id: 'p-06',
    slug: 'terracotta-everyday-pouch',
    name: {
      en: 'Terracotta Everyday Pouch',
      bn: 'টেরাকোটা এভরিডে পাউচ',
      hi: 'टेराकोटा एवरीडे पाउच',
    },
    categoryId: 'bags',
    price: 380,
    shortDescription: {
      en: 'A warm little pouch that keeps the small things together.',
      bn: 'ছোট জিনিসগুলো একসাথে রাখার একটি উষ্ণ ছোট পাউচ।',
      hi: 'छोटी चीज़ों को साथ रखने वाला एक गर्म, छोटा पाउच।',
    },
    description: {
      en: 'Keep your earphones, keys and coins in one tidy place. The Everyday Pouch has a zip closure and a roomy base, crocheted in a warm terracotta that pairs with almost anything.',
      bn: 'আপনার ইয়ারফোন, চাবি আর কয়েন এক জায়গায় গুছিয়ে রাখুন। এভরিডে পাউচে জিপ আর বড় বেস আছে, প্রায় সবকিছুর সাথে মানানসই উষ্ণ টেরাকোটা রঙে বোনা।',
      hi: 'अपने ईयरफ़ोन, चाबियाँ और सिक्के एक जगह साफ़-सुथरे रखें। एवरीडे पाउच में ज़िप और चौड़ा बेस है, गर्म टेराकोटा रंग में बुना जो लगभग हर चीज़ के साथ मेल खाता है।',
    },
    materials: {
      en: 'Soft cotton yarn, cotton lining, metal zip',
      bn: 'নরম সুতি সুতা, সুতি আস্তরণ, ধাতব জিপ',
      hi: 'नरम सूती धागा, सूती लाइनिंग, धातु की ज़िप',
    },
    dimensions: {
      en: 'Approx. 18 × 12 cm',
      bn: 'প্রায় ১৮ × ১২ সেমি',
      hi: 'लगभग 18 × 12 सेमी',
    },
    care: {
      en: 'Hand wash gently in cool water. Dry flat in shade.',
      bn: 'ঠান্ডা জলে হালকা করে হাতে ধুয়ে নিন। ছায়ায় সমান করে শুকান।',
      hi: 'ठंडे पानी में हल्के हाथ से धोएँ। छाया में सपाट सुखाएँ।',
    },
    colors: ['terracotta', 'cream', 'olive'],
    images: ['/products/rc-06.jpg'],
    inStock: true,
    rating: 4.6,
    reviewCount: 24,
    createdAt: '2024-04-14',
    featured: false,
  },
  {
    id: 'p-07',
    slug: 'cozy-round-coaster-set',
    name: {
      en: 'Cozy Round Coaster Set (Set of 4)',
      bn: 'কোজি রাউন্ড কোস্টার সেট (৪টি)',
      hi: 'कोज़ी राउंड कोस्टर सेट (4 का)',
    },
    categoryId: 'home-decor',
    price: 350,
    shortDescription: {
      en: 'Four soft coasters that protect your table in style.',
      bn: 'চারটি নরম কোস্টার, যা সুন্দরভাবে আপনার টেবিল বাঁচায়।',
      hi: 'चार नरम कोस्टर, जो खूबसूरती से आपकी मेज़ बचाते हैं।',
    },
    description: {
      en: 'A set of four round coasters crocheted in a neat spiral, thick enough to soak up condensation and soft enough to protect delicate surfaces. A simple, useful way to bring handmade warmth to your table.',
      bn: 'চারটি গোল কোস্টারের সেট, পরিষ্কার সর্পিল বুননে তৈরি — ঘন হওয়ায় জল শোষণ করে, আবার নরম হওয়ায় সূক্ষ্ম টেবিল বাঁচায়। টেবিলে হাতে তৈরি উষ্ণতা আনার সহজ উপায়।',
      hi: 'चार गोल कोस्टर का सेट, साफ़ सर्पिल बुनाई में बना — इतना मोटा कि पानी सोख ले और इतना नरम कि नाज़ुक मेज़ बचाए। मेज़ पर हस्तनिर्मित गर्माहट लाने का आसान तरीका।',
    },
    materials: {
      en: 'Thick cotton yarn',
      bn: 'মোটা সুতি সুতা',
      hi: 'मोटा सूती धागा',
    },
    dimensions: {
      en: 'Approx. 10 cm across each',
      bn: 'প্রতিটি প্রায় ১০ সেমি চওড়া',
      hi: 'प्रत्येक लगभग 10 सेमी चौड़ाई',
    },
    care: {
      en: 'Hand wash gently and dry flat. Warm iron on reverse if needed.',
      bn: 'হালকা করে হাতে ধুয়ে সমান করে শুকান। দরকার হলে উল্টো দিকে হালকা গরম ইস্ত্রি করুন।',
      hi: 'हल्के हाथ से धोएँ और सपाट सुखाएँ। ज़रूरत हो तो उलटी तरफ़ हल्का इस्त्री करें।',
    },
    colors: ['cream', 'terracotta', 'sage'],
    images: ['/products/rc-07.jpg'],
    inStock: true,
    rating: 4.8,
    reviewCount: 37,
    createdAt: '2024-06-21',
    featured: true,
  },
  {
    id: 'p-08',
    slug: 'hanging-harmony-wall-charm',
    name: {
      en: 'Hanging Harmony Wall Charm',
      bn: 'হ্যাঙ্গিং হারমোনি ওয়াল চার্ম',
      hi: 'हैंगिंग हार्मनी वॉल चार्म',
    },
    categoryId: 'home-decor',
    price: 390,
    shortDescription: {
      en: 'A gentle handmade accent for a quiet corner.',
      bn: 'শান্ত কোণের জন্য একটি কোমল হাতে তৈরি সাজসজ্জা।',
      hi: 'किसी शांत कोने के लिए एक कोमल हस्तनिर्मित सजावट।',
    },
    description: {
      en: 'Suspend a little handmade calm on your wall. This decorative charm pairs soft botanical shapes with a natural wooden ring and a cotton cord, ready to hang above a bed, desk or doorway.',
      bn: 'আপনার দেয়ালে একটু হাতে তৈরি শান্তি ঝুলিয়ে দিন। এই সাজসজ্জাটি নরম উদ্ভিদ-আকৃতি, প্রাকৃতিক কাঠের রিং আর সুতি দড়ির সাথে মিলে তৈরি — বিছানা, ডেস্ক বা দরজার উপরে ঝোলানোর জন্য প্রস্তুত।',
      hi: 'अपनी दीवार पर थोड़ी हस्तनिर्मित शांति टाँगिए। यह सजावट नरम पत्ती-आकार, प्राकृतिक लकड़ी की रिंग और सूती डोरी के साथ बनी है — बिस्तर, डेस्क या दरवाज़े के ऊपर लटकाने के लिए तैयार।',
    },
    materials: {
      en: 'Cotton yarn, natural wooden ring, cotton cord',
      bn: 'সুতি সুতা, প্রাকৃতিক কাঠের রিং, সুতি দড়ি',
      hi: 'सूती धागा, प्राकृतिक लकड़ी की रिंग, सूती डोरी',
    },
    dimensions: {
      en: 'Approx. 34 cm long, 14 cm wide',
      bn: 'প্রায় ৩৪ সেমি লম্বা, ১৪ সেমি চওড়া',
      hi: 'लगभग 34 सेमी लंबा, 14 सेमी चौड़ा',
    },
    care: {
      en: 'Dust gently with a soft dry brush. Spot clean only.',
      bn: 'নরম শুকনো ব্রাশ দিয়ে আলতো করে ধুলো সরান। শুধু দাগ মুছুন।',
      hi: 'नरम सूखे ब्रश से धीरे-धीरे धूल हटाएँ। केवल दाग साफ़ करें।',
    },
    colors: ['sage', 'cream', 'terracotta'],
    images: ['/products/rc-08.jpg'],
    inStock: true,
    badge: 'new',
    rating: 4.7,
    reviewCount: 15,
    createdAt: '2024-09-11',
    featured: true,
  },
  {
    id: 'p-09',
    slug: 'bloom-table-vase-cozy',
    name: {
      en: 'Bloom Table Vase Cozy',
      bn: 'ব্লুম টেবিল ভাস কজি',
      hi: 'ब्लूम टेबल वेज़ कोज़ी',
    },
    categoryId: 'home-decor',
    price: 330,
    shortDescription: {
      en: 'Slip a plain glass jar into something beautiful.',
      bn: 'সাধারণ কাচের বয়ামকে ঢেকে দিন সুন্দর কিছু দিয়ে।',
      hi: 'सादे काँच के जार को कुछ सुंदर में बदल दें।',
    },
    description: {
      en: 'A ribbed crochet cover that turns a simple glass jar into a vase worth showing off. Stretch it over a jar of water and fill it with dried stems, or use it on your desk to hold pens and brushes.',
      bn: 'ডোরাকাটা ক্রোশে কভার, যা সাধারণ কাচের বয়ামকে শোবার মতো একটি ফুলদানিতে বদলে দেয়। জলে ভরা বয়ামে এই কভার পরিয়ে শুকনো ডাল সাজান, বা ডেস্কে কলম-ব্রাশ রাখতে ব্যবহার করুন।',
      hi: 'धारीदार क्रोशे कवर, जो साधारण काँच के जार को दिखाने लायक फूलदान बना देता है। पानी से भरे जार पर यह कवर चढ़ाकर सूखी टहनियाँ सजाएँ, या डेस्क पर पेन-ब्रश रखने के लिए इस्तेमाल करें।',
    },
    materials: {
      en: 'Soft cotton yarn',
      bn: 'নরম সুতি সুতা',
      hi: 'नरम सूती धागा',
    },
    dimensions: {
      en: 'Fits jars up to approx. 8 cm wide, 11 cm tall',
      bn: 'প্রায় ৮ সেমি চওড়া, ১১ সেমি উঁচু বয়ামে ফিট করে',
      hi: 'लगभग 8 सेमी चौड़े, 11 सेमी ऊँचे जार में फिट होता है',
    },
    care: {
      en: 'Remove before washing the vase. Hand wash the cozy gently.',
      bn: 'ভাস ধোয়ার আগে কভার খুলে নিন। কভার হালকা করে হাতে ধুয়ে নিন।',
      hi: 'फूलदान धोने से पहले कवर हटाएँ। कवर हल्के हाथ से धोएँ।',
    },
    colors: ['ivory', 'blush', 'olive'],
    images: ['/products/rc-09.jpg'],
    inStock: true,
    rating: 4.6,
    reviewCount: 12,
    createdAt: '2024-07-05',
    featured: false,
  },
  {
    id: 'p-10',
    slug: 'pearl-blossom-hair-clip',
    name: {
      en: 'Pearl Blossom Hair Clip',
      bn: 'পার্ল ব্লসম হেয়ার ক্লিপ',
      hi: 'पर्ल ब्लॉसम हेयर क्लिप',
    },
    categoryId: 'accessories',
    price: 300,
    shortDescription: {
      en: 'A sweet little blossom clip for everyday hair days.',
      bn: 'প্রতিদিনের চুলের জন্য একটি মিষ্টি ছোট ফুলের ক্লিপ।',
      hi: 'रोज़ के बालों के लिए एक प्यारी छोटी फूल क्लिप।',
    },
    description: {
      en: 'A crochet blossom with a tiny pearl centre, mounted on a sturdy clip that grips gently without pulling. Perfect for a half-up look or to tame the wisps around your face.',
      bn: 'ছোট মুক্তো কেন্দ্রসহ একটি ক্রোশে ফুল, মজবুত ক্লিপে বসানো যা চুল টানা ছাড়াই আলতো করে ধরে। হাফ-আপ লুক বা মুখের চারপাশের ছোট চুলের জন্য দুর্দান্ত।',
      hi: 'छोटे मोती केंद्र वाला क्रोशे फूल, मज़बूत क्लिप पर लगा जो बाल खींचे बिना कोमलता से पकड़ता है। हाफ़-अप लुक या चेहरे के आसपास की छोटी लटों के लिए बढ़िया।',
    },
    materials: {
      en: 'Cotton yarn, faux pearl bead, metal clip',
      bn: 'সুতি সুতা, কৃত্রিম মুক্তো, ধাতব ক্লিপ',
      hi: 'सूती धागा, कृत्रिम मोती, धातु क्लिप',
    },
    dimensions: {
      en: 'Approx. 5 cm across',
      bn: 'প্রায় ৫ সেমি চওড়া',
      hi: 'लगभग 5 सेमी चौड़ाई',
    },
    care: {
      en: 'Wipe clean with a dry cloth. Keep away from water.',
      bn: 'শুকনো কাপড়ে মুছে পরিষ্কার করুন। জল থেকে দূরে রাখুন।',
      hi: 'सूखे कपड़े से साफ़ करें। पानी से दूर रखें।',
    },
    colors: ['ivory', 'blush', 'rose'],
    images: ['/products/rc-10.jpg'],
    inStock: true,
    rating: 4.7,
    reviewCount: 33,
    createdAt: '2024-03-02',
    featured: false,
  },
]

/* --------------------------- helpers --------------------------- */

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getColorOptions(product: Product): ColorOption[] {
  return product.colors.map((key) => ({ id: key, ...PALETTE[key] }))
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId,
  )
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId)
  return [...sameCategory, ...others].slice(0, limit)
}
