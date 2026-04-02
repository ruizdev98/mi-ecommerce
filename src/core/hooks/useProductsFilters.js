import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "@/core/api/api"

export default function useProductsFilters({ type } = {}) {
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

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        let brandsData = []

        // 🔥 CASO: SIN CATEGORY (best sellers, featured, etc.)
        if (!categoryId) {
          const params = new URLSearchParams()

          if (type === 'bestsellers') params.append('bestSeller', true)
          if (type === 'featured') params.append('featured', true)
          if (type === 'offer') params.append('offer', true)

          const res = await api.get(`/products?${params.toString()}`)

          // 🔥 extraer marcas únicas
          const uniqueBrands = [
            ...new Set(res.data.map(p => p.brandName))
          ]

          brandsData = uniqueBrands

        } else {
          // 🔥 CASO NORMAL (categoría)
          const { data } = await api.get(`/products/filters?category=${categoryId}`)
          brandsData = data.brands
        }

        setBrands(brandsData)

      } catch (error) {
        console.error(error)
      }
    }

    fetchFilters()
  }, [categoryId, type])

  // 🔥 TRAER PRODUCTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()

        // 🔥 CATEGORY
        if (categoryId) {
          params.append('category', categoryId)
        }

        // 🔥 TYPE (CLAVE 🔥)
        if (type === 'bestsellers') {
          params.append('bestSeller', true)
        }

        if (type === 'featured') {
          params.append('featured', true)
        }

        if (type === 'offer') {
          params.append('offer', true)
        }

        // 🔥 FILTERS
        appliedFilters.brands.forEach(brand => {
          params.append('brand', brand)
        })

        if (appliedFilters.min) {
          params.append('minPrice', appliedFilters.min)
        }

        if (appliedFilters.max) {
          params.append('maxPrice', appliedFilters.max)
        }

        // 🔥 UNA SOLA LLAMADA
        const res = await api.get(`/products?${params.toString()}`)

        setProducts(res.data)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId, appliedFilters, type])

  // 🔥 acciones
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const applyFilters = () => {
    setAppliedFilters({
      brands: selectedBrands,
      min: priceRange.min,
      max: priceRange.max
    })
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange({ min: '', max: '' })

    setAppliedFilters({
      brands: [],
      min: '',
      max: ''
    })
  }

  const hasFilters =
    selectedBrands.length > 0 ||
    priceRange.min !== '' ||
    priceRange.max !== ''

    return {
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
    }
}