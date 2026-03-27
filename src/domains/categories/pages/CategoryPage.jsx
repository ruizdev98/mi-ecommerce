import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { capitalizeFirstLetter } from "@/core/utils/textFormat"
import api from "@/core/api/api"
import ProductSection from "@/domains/products/section/ProductSection"
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [appliedFilters, setAppliedFilters] = useState({
    brands: [],
    min: "",
    max: ""
  })

  // 🔥 1. TRAER FILTROS (MARCAS)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await api.get(`/products/filters?category=${categoryId}`)
        setBrands(data.brands)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFilters()
  }, [categoryId])

  // 🔥 2. TRAER PRODUCTOS CON FILTROS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        params.append("category", categoryId)

        if (appliedFilters.brands.length > 0) {
          params.append("brand", appliedFilters.brands[0])
        }

        if (appliedFilters.min) {
          params.append("minPrice", appliedFilters.min)
        }

        if (appliedFilters.max) {
          params.append("maxPrice", appliedFilters.max)
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
  }, [categoryId, appliedFilters])

  // 🔥 obtener nombre dinámico
  const categoryName = capitalizeFirstLetter(products[0]?.categoryName || "Categoría")

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [brand] // 🔥 una sola marca por ahora
    )
  }

  // 🔥 aplicar filtros
  const applyFilters = () => {
    setAppliedFilters({
      brands: selectedBrands,
      min: priceRange.min,
      max: priceRange.max
    })
  }
  // 🔥 limpiar filtros
  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange({ min: "", max: "" })

    setAppliedFilters({
      brands: [],
      min: "",
      max: ""
    })
  }
  
  return (
    <div className={`container ${styles.category}`}>
      <h2 className={styles.categoryName}></h2>
      {/* 🔥 SIDEBAR */}
      <aside className={styles.filters}>
        <h3>Filtros</h3>

        {/* MARCAS */}
        <div className={styles.filterBlock}>
          <p className={styles.filterTitle}>Marca</p>

          {brands.map(brand => (
            <label key={brand} className={styles.checkbox}>
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
        <div className={styles.filterBlock}>
          <p className={styles.filterTitle}>Precio</p>

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

        {/* 🔥 BOTONES */}
        <div className={styles.filterActions}>
          <button onClick={applyFilters} className={styles.applyBtn}>
            Aplicar filtros
          </button>

          <button onClick={clearFilters} className={styles.clearBtn}>
            Limpiar
          </button>
        </div>
      </aside>

      {/* PRODUCTOS */}
      <div className={styles.products}>
        {loading ? (
          <p className={styles.loading}>Cargando...</p>
        ) : (
          products.length === 0 ? (
            <p className={styles.empty}>No hay productos</p>
          ) : (
            <div className={styles.productsContainer}>
              <div className={styles.products}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            </div>
          )
        )}
      </div>

    </div>
  )
}
