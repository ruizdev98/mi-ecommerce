import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductSection from "@/domains/products/section/ProductSection"
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products/categories/${categoryId}`)
        setProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [categoryId])

  if (loading) return <p className={styles.loading}>Cargando...</p>

  return (
    <section className={`container ${styles.category}`}>
      
      {/* 🔥 TÍTULO */}
      <h2 className={styles.title}>
        {currentCategory?.name || "Categoría"}
      </h2>
        <ProductSection title="Productos" products={filteredProducts} />
    </section>
  )
}
