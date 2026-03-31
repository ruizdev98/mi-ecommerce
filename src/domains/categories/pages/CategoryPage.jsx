import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import useCategoryProducts from '@/domains/categories/hooks/useCategoryProducts'
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
  } = useCategoryProducts()

  const isMobile = useIsMobile()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // 🔥 obtener nombre dinámico
  const categoryName = capitalizeFirstLetter(products[0]?.categoryName || "Categoría")
  
  return (
    <div className={`container`}>
      
      {/* 🔥 SIDEBAR */}
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
              <div className={styles.sidebarHeader}>
                <h3>Filtros</h3>
                <button onClick={() => setIsSidebarOpen(false)}>✕</button>
              </div>
              <FiltersPanel
                categoryName={categoryName}
                brands={brands}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
          </>
        ) : (
          <FiltersPanel
            categoryName={categoryName}
            brands={brands}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
          />
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
