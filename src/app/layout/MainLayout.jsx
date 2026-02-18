// src/app/layout/MainLayout.jsx
import { useEffect } from "react"
import { Outlet } from 'react-router-dom'
import { useCartContext } from "@/core/context/CartContext"
import api from "@/core/api/api"
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'


const MainLayout = () => {
  const { clearCart } = useCartContext()

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId")
    if (!orderId) return

    const confirmPayment = async () => {
      try {
        const { data: order } = await api.get(`/orders/${orderId}`)

        console.log("Checking order:", order.status)

        if (order.status === "paid") {
          clearCart()
          localStorage.removeItem("lastOrderId")
          console.log("🧹 Carrito limpiado")
        }
      } catch (err) {
        console.error("Error verificando pago:", err)
      }
    }

    confirmPayment()
  }, [])
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>   
      <Footer />
    </>
  )
}

export default MainLayout