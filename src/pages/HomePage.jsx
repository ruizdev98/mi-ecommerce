import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useCartContext } from "@/core/context/CartContext"
import { useData } from '@/core/hooks/useData'

import ImageCarousel from '@/shared/ui/ImageCarousel'
import Categories from '@/domains/categories/ui/Categories'
import ParallaxBanner from '@/shared/ui/ParallaxBanner'
import ProductSection from '@/domains/products/section/ProductSection'
import BlogSection from '@/domains/blogs/ui/BlogSection'
import BrandsSection from '@/domains/brands/ui/BrandsSection'


export default function HomePage() {
  const {
    categories,
    products,
    bestSellers,
    featured,
    brands,
    blogs,
    loading 
  } = useData()

  // 👉 NUEVO
  const { clearCart } = useCartContext()
  const [searchParams, setSearchParams] = useSearchParams()

  // 👉 NUEVO: validar pago al volver del checkout
  useEffect(() => {
    const status = searchParams.get("status")
    const orderId = localStorage.getItem("lastOrderId")

    if (status !== "approved" || !orderId) return

    const confirmPayment = async () => {
      try {
        let attempts = 0
        let paid = false

        while (attempts < 5 && !paid) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/orders/${orderId}`
          )

          if (!res.ok) break

          const order = await res.json()

          if (order.status === "paid") {
            paid = true
            break
          }

          // Espera 1 segundo antes de volver a intentar
          await new Promise(resolve => setTimeout(resolve, 1000))
          attempts++
        }

        if (paid) {
          clearCart()
          localStorage.removeItem("lastOrderId")
          setSearchParams({})
        }
      } catch (err) {
        console.error("Error confirmando pago", err)
      }
    }

    confirmPayment()
  }, [searchParams, clearCart, setSearchParams])
  
  const banners = [
    { src: "https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner1_xywskc.png", alt: "Banner 1" },
    { src: "https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner2_xcj9pm.png", alt: "Banner 2" },
    { src: "https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner3_xoeglb.png", alt: "Banner 3" },
  ];

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <ImageCarousel images={banners}/>
      <Categories title='Categorías' categories={categories} />
      <ProductSection title='Más Vendidos' products={bestSellers} />
      <ParallaxBanner 
        title="¡Estilo para todos. En un solo lugar!"
        buttonText="Ver más"
        logoSrc="/white_logo.png"
        backgroundUrl="https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767045/parallax_banner_btq2yx.jpg"
      />
      <ProductSection title='Destacados' products={featured} />
      <BlogSection title='Blog' blogs={blogs} />
      <BrandsSection title='Marcas Destacadas' products={products} brands={brands}/>
    </>
  )
}
