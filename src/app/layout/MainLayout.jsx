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
    console.log("🟡 Effect ejecutado. orderId:", orderId)
    if (!orderId) return

    const confirmPayment = async () => {
      try {
        console.log("🔎 Consultando orden...")
        const { data: order } = await api.get(`/orders/${orderId}`)

        console.log("📦 Order status:", order.status)

        if (order.status === "paid") {
          console.log("✅ Detectado como paid")
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
  console.log("MainLayout mounted")
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