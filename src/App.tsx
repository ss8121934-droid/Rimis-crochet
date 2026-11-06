import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { About } from '@/pages/About'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { ProductDetails } from '@/pages/ProductDetails'
import { Shop } from '@/pages/Shop'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
