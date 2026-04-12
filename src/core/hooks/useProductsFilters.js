import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "@/core/api/api"

export default function useProductsFilters({ type, categoryId, genderId, search } = {}) {

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

  // FILTROS
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const params = new URLSearchParams()

        if (categoryId) params.append("category", categoryId)
        if (genderId) params.append("gender", genderId)
        if (search) params.append("search", search)

        if (type === "bestsellers") params.append("bestSeller", true)
        if (type === "featured") params.append("featured", true)
        if (type === "offer") params.append("offer", true)

        const res = await api.get(`/products?${params.toString()}`)

        const uniqueBrands = [
          ...new Set(res.data.map(p => p.brandName))
        ]

        setBrands(uniqueBrands)

      } catch (error) {
        console.error(error)
      }
    }

    fetchFilters()
  }, [categoryId, type, genderId, search])

  // PRODUCTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()

        if (categoryId) params.append("category", categoryId)
        if (genderId) params.append("gender", genderId)
        if (search) params.append("search", search)

        if (type === "bestsellers") params.append("bestSeller", true)
        if (type === "featured") params.append("featured", true)
        if (type === "offer") params.append("offer", true)

        appliedFilters.brands.forEach(b => params.append("brand", b))

        if (appliedFilters.min) params.append("minPrice", appliedFilters.min)
        if (appliedFilters.max) params.append("maxPrice", appliedFilters.max)

        const res = await api.get(`/products?${params.toString()}`)

        setProducts(res.data)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId, appliedFilters, type, genderId, search])

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