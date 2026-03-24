import { useParams } from "react-router-dom"
import { useData } from "@/core/hooks/useData"
import ProductSection from "@/domains/products/section/ProductSection"
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const { products, categories, loading } = useData()

  if (loading) return <p className={styles.loading}>Cargando...</p>

  // 🔥 obtener categoría actual
  const currentCategory = categories.find(c => c.id === categoryId)
  const filteredProducts = products.filter(p => p.categoryId === categoryId)

  return (
    <section className={`container ${styles.category}`}>
      
      {/* 🔥 TÍTULO */}
      <h2 className={styles.title}>
        {currentCategory?.name || "Categoría"}
      </h2>

      {/* 🔥 MENSAJE SI NO HAY PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <p className={styles.empty}>
          No hay productos en esta categoría
        </p>
      ) : (
        <ProductSection
          products={filteredProducts}
        />
      )}
    </section>
  )
}
