import { useData } from '@/core/hooks/useData'
import ImageCarousel from '@/shared/ui/ImageCarousel'
import CategorySection from '@/domains/categories/section/CategorySection'
import ParallaxBanner from '@/shared/ui/ParallaxBanner'
import ProductSection from '@/domains/products/section/ProductSection'
import BlogSection from '@/domains/blogs/section/BlogSection'
import BrandsSection from '@/domains/brands/section/BrandsSection'

export default function HomePage() {
  const {
    categories,
    products,
    bestSellersLimit8,
    featuredLimit8,
    brands,
    blogs,
    loading 
  } = useData()
  
  const banners = [
    { src: 'https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner1_xywskc.png', alt: 'Banner 1' },
    { src: 'https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner2_xcj9pm.png', alt: 'Banner 2' },
    { src: 'https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767042/banner3_xoeglb.png', alt: 'Banner 3' },
  ]

  if (loading) return <p>Cargando...</p>

  return (
    <>
      <ImageCarousel images={banners}/>
      <CategorySection title='Categorías' categories={categories} />
      <ProductSection title='Más Vendidos' products={bestSellersLimit8} type='bestSeller' />
      <ParallaxBanner 
        title='¡Estilo para todos. En un solo lugar!'
        buttonText='Ver más'
        logoSrc='/white_logo.png'
        backgroundUrl='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767045/parallax_banner_btq2yx.jpg'
      />
      <ProductSection title='Destacados' products={featuredLimit8} type='featured' />
      <BlogSection title='Blog' blogs={blogs} />
      <BrandsSection title='Marcas Destacadas' products={products} brands={brands}/>
    </>
  )
}
