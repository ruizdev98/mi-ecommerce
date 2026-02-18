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
    const checkPaidOrder = async () => {
      try {
        const { data } = await api.get("/orders/pending")

        if (data?.status === "paid") {
          clearCart()
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkPaidOrder()
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