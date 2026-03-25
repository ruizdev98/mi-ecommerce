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
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams()

        // 🔥 categoría siempre
        params.append("category", categoryId)

        // 🔥 marca (solo una por ahora)
        if (selectedBrands.length > 0) {
          params.append("brand", selectedBrands[0])
        }

        // 🔥 precios
        if (priceRange.min) {
          params.append("minPrice", priceRange.min)
        }

        if (priceRange.max) {
          params.append("maxPrice", priceRange.max)
        }

        const { data } = await api.get(`/products?${params.toString()}`)
        setProducts(data)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId, selectedBrands, priceRange])

  if (loading) return <p className={styles.loading}>Cargando...</p>

  // 🔥 obtener nombre dinámico
  const categoryName = capitalizeFirstLetter(products[0]?.categoryName || "Categoría")
  const brands = [...new Set(products.map(p => p.brandName))]

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [brand] // 🔥 una sola marca por ahora
    )
  }
  
  return (
    <div>
      {/* 🔥 SIDEBAR */}
      <aside className={styles.filters}>
        <h3>Filtros</h3>

        {/* MARCAS */}
        <div>
          <p>Marca</p>
          {brands.map(brand => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>

        {/* PRECIO */}
        <div>
          <p>Precio</p>

          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </div>
      </aside>
      <div className={`container ${styles.category}`}>
        <ProductSection title={categoryName} products={products} />
      </div>
    </div>
    
  )
}
