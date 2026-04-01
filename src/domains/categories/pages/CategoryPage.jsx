import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import useProductsFilters from '@/domains/categories/hooks/useProductsFilters'
import useIsMobile from '@/core/hooks/useIsMobile'
import ProductCard from '@/domains/products/card/ProductCard'
import GeneralButton from '@/shared/ui/GeneralButton'
import FiltersPanel from './FiltersPanel'
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
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
  } = useProductsFilters()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const categoryName = capitalizeFirstLetter(products[0]?.categoryName || "Categoría")

  const filtersProps = {
    categoryName,
    brands,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    applyFilters,
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
