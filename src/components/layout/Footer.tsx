import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { CATEGORIES } from '@/data/categories'
import { useLanguage } from '@/i18n/LanguageContext'
import { buildChatUrl } from '@/lib/whatsapp'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-b from-ink via-[#33251A] to-[#241B13] text-cream-100">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/50 to-transparent"
        aria-hidden
      />
      <div className="relative container-x py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-200/75">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={buildChatUrl(t)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.chatWhatsApp')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream-50"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label={t('footer.emailUs')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream-50"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream-50"
                >
                  <Instagram className="h-[18px] w-[18px]" />
                </a>
              )}
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream-50"
                >
                  <Facebook className="h-[18px] w-[18px]" />
                </a>
              )}
            </div>
          </div>

          {/* Shop */}
          <nav aria-label={t('footer.shopHeading')}>
            <h3 className="text-[11px] font-medium uppercase tracking-widest2 text-cream-200/60">
              {t('footer.shopHeading')}
            </h3>
            <ul className="mt-5 space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/shop?category=${category.id}`}
                    className="text-sm text-cream-200/80 transition-colors hover:text-terracotta"
                  >
                    {category.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label={t('footer.exploreHeading')}>
            <h3 className="text-[11px] font-medium uppercase tracking-widest2 text-cream-200/60">
              {t('footer.exploreHeading')}
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/" className="text-sm text-cream-200/80 transition-colors hover:text-terracotta">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-cream-200/80 transition-colors hover:text-terracotta">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-cream-200/80 transition-colors hover:text-terracotta">
                  {t('nav.ourStory')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-cream-200/80 transition-colors hover:text-terracotta">
                  {t('nav.cart')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-widest2 text-cream-200/60">
              {t('footer.contactHeading')}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={buildChatUrl(t)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-cream-200/80 transition-colors hover:text-terracotta"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-cream-200/50">
                      {t('footer.whatsappOrdering')}
                    </span>
                    {site.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-3 break-all text-cream-200/80 transition-colors hover:text-terracotta"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-cream-200/50">
                      {t('footer.emailUs')}
                    </span>
                    {site.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/12 pt-8 sm:flex-row">
          <p className="text-xs text-cream-200/60">
            © {year} {site.name}. {t('footer.rights')}
          </p>
          <p className="text-xs text-cream-200/60">{t('footer.handmade')}</p>
        </div>
      </div>
    </footer>
  )
}
