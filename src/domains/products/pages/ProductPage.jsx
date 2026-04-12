import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import useProductsFilters from '@/core/hooks/useProductsFilters'
import useIsMobile from '@/core/hooks/useIsMobile'
import ProductCard from '@/domains/products/card/ProductCard'
import GeneralButton from '@/shared/ui/GeneralButton'
import FiltersPanel from '../ui/FiltersPanel'
import styles from './ProductPage.module.css'

export default function ProductPage() {

  const [searchParams] = useSearchParams()

  // FLAGS
  const isBestSeller = searchParams.get("bestSeller") === "true"
  const isFeatured = searchParams.get("featured") === "true"
  const isOffer = searchParams.get("offer") === "true"

  // CATEGORY
  const categoryParam = searchParams.get("category")
  const categoryId = categoryParam ? Number(categoryParam) : undefined

  // GENDER
  const genderParam = searchParams.get("gender")
  const genderId = genderParam ? Number(genderParam) : undefined

  const {
    products,
    brands,
    loading,
    selectedBrands,
    priceRange,
    setPriceRange,
    toggleBrand,
    applyFilters,
    clearFilters,
    hasFilters
  } = useProductsFilters({
    type: isBestSeller
      ? "bestsellers"
      : isFeatured
      ? "featured"
      : isOffer
      ? "offer"
      : undefined,
    categoryId,
    genderId
  })

  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Título dinámico
  let categoryName = "Productos"

  if (isBestSeller) {
    categoryName = "Más vendidos"
  } else if (isFeatured) {
    categoryName = "Destacados"
  } else if (isOffer) {
    categoryName = "Ofertas"
  } else if (categoryId && products.length > 0) {
    categoryName = capitalizeFirstLetter(products[0].categoryName)
  }

  // AGREGAR GÉNERO AL TÍTULO
  if (genderId === 1) {
    categoryName += ' - Mujer'
  } else if (genderId === 2) {
    categoryName += ' - Hombre'
  }

  const filtersProps = {
    categoryName,
    brands,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    // 🔥 cerrar sidebar al aplicar filtros (UX PRO)
    applyFilters: () => {
      applyFilters()
      setIsSidebarOpen(false)
    },
    clearFilters,
    hasFilters
  }
  
  return (
    <div className={`container`}>
      <div className={styles.category}>
        {isMobile ? (
          <>
            <GeneralButton
              size='medium'
              className={styles.showFilters}
              onClick={() => setIsSidebarOpen(true)}
            >
              <FontAwesomeIcon icon={faSliders} />Filtrar
            </GeneralButton>

            {/* Overlay */}
            <div 
              className={`${styles.overlay} ${isSidebarOpen ? styles.show : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar */}
            <div className={`${styles.mobileSidebar} ${isSidebarOpen ? styles.open : ''}`}>
              <FiltersPanel {...filtersProps} />
            </div>
          </>
        ) : (
          <FiltersPanel {...filtersProps} />
        )}

        {/* PRODUCTOS */}
        <div className={styles.productsContainer}>
          {loading ? (
            <p className={styles.loading}>Cargando...</p>
          ) : (
            products.length === 0 ? (
              <p className={styles.empty}>No hay productos</p>
            ) : (
              <div className={styles.products}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            )
          )}
        </div>

      </div>

    </div>
  )
}
