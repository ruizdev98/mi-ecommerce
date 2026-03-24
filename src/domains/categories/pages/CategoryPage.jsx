import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { capitalizeFirstLetter } from "@/core/utils/textFormat"
import api from "@/core/api/api"
import ProductSection from "@/domains/products/section/ProductSection"
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products/category/${categoryId}`)
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

  // 🔥 obtener nombre dinámico
  const categoryName = capitalizeFirstLetter(products[0]?.categoryName || "Categoría")
  
  return (
    <section className={`container ${styles.category}`}>
      <ProductSection title={categoryName} products={products} />
    </section>
  )
}
