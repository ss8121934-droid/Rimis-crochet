import { Outlet, useLocation } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageBackdrop } from './PageBackdrop'
import { ScrollProgress } from './ScrollProgress'
import { ScrollToTop } from './ScrollToTop'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <PageBackdrop />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        {/* Re-keyed on route change so the CSS fade-up replays (and is
            neutralised automatically when reduced motion is preferred). */}
        <div key={pathname} className="animate-fade-up">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFab />
    </div>
  )
}
