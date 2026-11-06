import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/App'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import { LanguageProvider } from '@/i18n/LanguageContext'
import '@/index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
