import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import api from '@/core/api/api'
import useIsMobile from '@/core/hooks/useIsMobile'
import ProductCard from '@/domains/products/card/ProductCard'
import InputField from '@/shared/ui/InputField'
import GeneralButton from '@/shared/ui/GeneralButton'
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const isMobile = useIsMobile()
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

        appliedFilters.brands.forEach(brand => {
          params.append("brand", brand)
        })

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
        : [...prev, brand]
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

  const hasFilters =
    selectedBrands.length > 0 ||
    priceRange.min !== "" ||
    priceRange.max !== ""
  
  return (
    <div className={`container`}>
      
      {/* 🔥 SIDEBAR */}
      <div className={styles.category}>
        <aside className={styles.filtersContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.categoryTitle}>{categoryName}</h2>
          </div>
          {isMobile ? (
            <GeneralButton
              size='medium'
              className={styles.showFilters}
            >
              <FontAwesomeIcon icon={faSliders} />Filtrar
            </GeneralButton>
          ) : (
            <div className={styles.filters}>
              <h3 className={styles.filterTitle}><FontAwesomeIcon icon={faSliders} />Filtros</h3>
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
                    <span className={styles.customCheckbox}></span>
                    <span>{brand}</span>
                  </label>
                ))}
              </div>

              {/* PRECIO */}
              <div className={styles.filterBlock}>
                <p className={styles.filterTitle}>Precio</p>
                <div className={styles.inputs}>
                  <InputField
                    name='numberMin'
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />

                  <InputField
                    name='numberMax'
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
                
              </div>

              {/* 🔥 BOTONES */}
              <div className={styles.filterActions}>
                <GeneralButton
                  size='medium'
                  className={styles.applyBtn}
                  onClick={applyFilters}
                  disabled={!hasFilters}
                >
                  Aplicar filtros
                </GeneralButton>

                <GeneralButton
                  variant='secondary'
                  size='medium'
                  className={styles.clearBtn}
                  onClick={clearFilters}
                  disabled={!hasFilters}
                >
                  Limpiar
                </GeneralButton>
              </div>
            </div>
          )}
          

        </aside>

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
