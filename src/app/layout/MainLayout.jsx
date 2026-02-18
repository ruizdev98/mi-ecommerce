// src/app/layout/MainLayout.jsx
import { useEffect } from "react"
import { Outlet, useLocation } from 'react-router-dom'
import { useCartContext } from "@/core/context/CartContext"
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'


const MainLayout = () => {
  const { clearCart } = useCartContext()
  const location = useLocation()

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId")
    if (!orderId) return

    const confirmPayment = async () => {
      try {
        const res = await fetch(
          `https://ecommerce-api-he4w.onrender.com/api/orders/${orderId}`
        )

        if (!res.ok) return

        const order = await res.json()

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
  }, [])  // 👈 sin dependencias
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