import { useState } from 'react'
import useProductsFilters from '@/domains/categories/hooks/useProductsFilters'
import useIsMobile from '@/core/hooks/useIsMobile'
import ProductCard from '@/domains/products/card/ProductCard'
import FiltersPanel from '@/domains/categories/pages/FiltersPanel'
import GeneralButton from '@/shared/ui/GeneralButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import styles from '@/domains/categories/pages/CategoryPage.module.css'

export default function BestSellersPage() {
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
    } = useProductsFilters({ type: "best-sellers" })

    const isMobile = useIsMobile()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // 🔥 Props reutilizables (DRY)
    const filtersProps = {
        categoryName: "Más vendidos",
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
    <div className='container'>
      <div className={styles.category}>

        {/* 🔥 SIDEBAR / FILTROS */}
        {isMobile ? (
          <>
            <GeneralButton
              className={styles.showFilters}
              onClick={() => setIsSidebarOpen(true)}
            >
              <FontAwesomeIcon icon={faSliders} /> Filtrar
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

        {/* 🔥 PRODUCTOS */}
        <div className={styles.productsContainer}>
          {loading ? (
            <p className={styles.loading}>Cargando...</p>
          ) : products.length === 0 ? (
            <p className={styles.empty}>No hay productos</p>
          ) : (
            <div className={styles.products}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
