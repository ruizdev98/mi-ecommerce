import { useState, useEffect } from 'react'
import { validateProduct, cleanProductNumbers } from '../utils/validation'
import api from '@/core/api/api'

// Función que limpia y valida productos
function cleanProducts(products) {
  if (!Array.isArray(products)) return []
  return products.map(cleanProductNumbers).filter(validateProduct)
}

// Asegura que cualquier dato sea un array
const safeArray = (data) => Array.isArray(data) ? data : []

export function useData() {

  const [data, setData] = useState({
    departments: [],
    categories: [],
    departmentCategories: [],
    products: [],
    bestSellers: [],
    bestSellersLimit8: [],
    featured: [],
    featuredLimit8: [],
    offers: [],
    brands: [],
    genders: [],
    blogs: [],
    loading: true
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const endpoints = [
          'departments',
          'categories',
          'department-categories',
          'products',
          'products?bestSeller=true',
          'products?bestSeller=true&limit=8',
          'products?featured=true',
          'products?featured=true&limit=8',
          'products?offer=true',
          'brands',
          'genders',
          'blogs'
        ]

         // 🔥 llamadas paralelas con axios
        const responses = await Promise.all(
          endpoints.map(endpoint => api.get(endpoint))
        )

        const [
          departmentsRes,
          categoriesRes,
          departmentCategoriesRes,
          productsRes,
          bestSellersRes,
          bestSellersLimit8Res,
          featuredRes,
          featuredLimit8Res,
          offersRes,
          brandsRes,
          gendersRes,
          blogsRes
        ] = responses

        setData({
          departments: safeArray(departmentsRes.data),
          categories: safeArray(categoriesRes.data),
          departmentCategories: safeArray(departmentCategoriesRes.data),
          products: cleanProducts(productsRes.data),
          bestSellers: cleanProducts(bestSellersRes.data),
          bestSellersLimit8: cleanProducts(bestSellersLimit8Res.data),
          featured: cleanProducts(featuredRes.data),
          featuredLimit8: cleanProducts(featuredLimit8Res.data),
          offers: cleanProducts(offersRes.data),
          brands: safeArray(brandsRes.data),
          genders: safeArray(gendersRes.data),
          blogs: safeArray(blogsRes.data),
          loading: false
        })

      } catch (error) {
        console.error('Error cargando datos:', error)
        setData(prev => ({ ...prev, loading: false }))
      }
    }
    fetchData()
  }, [])

  return data
}