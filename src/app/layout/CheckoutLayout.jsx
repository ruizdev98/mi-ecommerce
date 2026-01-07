import CheckoutHeader from '@/components/checkout/CheckoutHeader'
import Footer from '@/components/footer/Footer'
import { Outlet } from 'react-router-dom'


export default function CheckoutLayout() {
  return (
    <>
      <CheckoutHeader />
      <main className="checkoutMain">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}