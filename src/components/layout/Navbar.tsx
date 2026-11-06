import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '@/config/site'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { cx, formatINR } from '@/lib/format'
import { buildChatUrl } from '@/lib/whatsapp'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { Logo } from '@/components/ui/Logo'

export function Navbar() {
  const { t } = useLanguage()
  const { count, openCart } = useCart()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [announceIndex, setAnnounceIndex] = useState(0)

  const announcements = [
    t('topbar.announce', { amount: formatINR(site.freeDeliveryThreshold) }),
    t('topbar.announce2'),
  ]

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/about', label: t('nav.ourStory') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnnounceIndex((i) => (i + 1) % announcements.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [announcements.length])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-40 bg-gradient-to-r from-ink via-[#3A2A1D] to-terracotta-dark text-cream-100">
        <div className="container-x flex h-9 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={announceIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-[11px] font-light tracking-wide sm:text-xs"
            >
              {announcements[announceIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <header
        className={cx(
          'sticky top-0 z-50 transition-all duration-500 ease-smooth',
          scrolled
            ? 'border-b border-clay-200/70 bg-cream-50/90 backdrop-blur-lg'
            : 'border-b border-transparent bg-cream-50/60 backdrop-blur-sm',
        )}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <Link
            to="/"
            aria-label={site.name}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    isActive ? 'text-terracotta' : 'text-ink-soft hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-terracotta"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href={buildChatUrl(t)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-full px-4 py-2 text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {t('nav.contact')}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector className="hidden sm:block" />

            <button
              type="button"
              onClick={openCart}
              aria-label={`${t('nav.cart')} — ${count}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-200"
            >
              <ShoppingBag className="h-[19px] w-[19px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream-50"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.menu')}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-200 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-cream-50 md:hidden"
          >
            <div className="container-x flex h-[68px] items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t('common.close')}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="container-x flex flex-col gap-1 pt-6"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cx(
                        'block border-b border-clay-200/70 py-4 font-display text-[26px] transition-colors',
                        isActive ? 'text-terracotta' : 'text-ink',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <a
                href={buildChatUrl(t)}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-clay-200/70 py-4 font-display text-[26px] text-ink"
              >
                {t('nav.contact')}
              </a>

              <div className="mt-8 flex items-center justify-between gap-4">
                <LanguageSelector />
                <a
                  href={buildChatUrl(t)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('whatsapp.chat')}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
