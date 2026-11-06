import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { buildChatUrl } from '@/lib/whatsapp'

/** Floating WhatsApp button — always one tap away on mobile and desktop. */
export function WhatsAppFab() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildChatUrl(t)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp.chat')}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-5 right-5 z-[65] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-medium text-white shadow-card sm:bottom-8 sm:right-8"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">{t('whatsapp.chat')}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
