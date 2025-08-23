import ImageCarousel from '@/shared/ui/ImageCarousel'
import Categories from '@/domains/categories/ui/Categories'
import ParallaxBanner from '@/shared/ui/ParallaxBanner'
import ProductSection from '@/domains/products/ui/ProductSection'
import BlogSection from '@/domains/blogs/ui/BlogSection'
import BrandsSection from '@/domains/brands/ui/BrandsSection'
import { useData } from '@/core/hooks/useData'

export default function HomePage() {
  const { categories, products, bestSellers, featured, brands, genders, blogs, loading } = useData();
  
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
