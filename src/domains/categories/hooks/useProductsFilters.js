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

  // 🔥 TRAER FILTROS
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const query = categoryId ? `?category=${categoryId}` : ''
        const { data } = await api.get(`/products/filters${query}`)
        setBrands(data.brands)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFilters()
  }, [categoryId])

  // 🔥 TRAER PRODUCTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()

        if (categoryId) {
          params.append('category', categoryId)
        }
        if (type === 'bestSellers') {
          params.append('bestSeller', true)
        }
        appliedFilters.brands.forEach(brand => {
          params.append('brand', brand)
        })

        if (appliedFilters.min) {
          params.append('minPrice', appliedFilters.min)
        }

        if (appliedFilters.max) {
          params.append('maxPrice', appliedFilters.max)
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