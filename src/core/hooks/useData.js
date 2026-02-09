import { useState, useEffect } from 'react'
import { validateProduct, cleanProductNumbers } from '../utils/validation'

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
    featured: [],
    offers: [],
    brands: [],
    genders: [],
    blogs: [],
    loading: true
  })

  useEffect(() => {
    const controller = new AbortController() // Crea el controlador
    const { signal } = controller            // Extrae la señal para fetch

    async function fetchData() {
      try {
        const endpoints = [
          'departments',
          'categories',
          'department-categories',
          'products',
          'products/bestsellers',
          'products/featured',
          'products/offers',
          'brands',
          'genders',
          'blogs'
        ]

        // Llamadas paralelas
        const responses = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`https://ecommerce-api-he4w.onrender.com/api/${endpoint}`, { signal })
              .then(res => res.json())
          )
        )

        const [
          departmentsData,
          categoriesData,
          departmentCategoriesData,
          productsData,
          bestSellersData,
          featuredData,
          offersData,
          brandsData,
          gendersData,
          blogsData
        ] = responses

        setData({
          departments: safeArray(departmentsData),
          categories: safeArray(categoriesData),
          departmentCategories: safeArray(departmentCategoriesData),
          products: cleanProducts(productsData),
          bestSellers: cleanProducts(bestSellersData),
          featured: cleanProducts(featuredData),
          offers: cleanProducts(offersData),
          brands: safeArray(brandsData),
          genders: safeArray(gendersData),
          blogs: safeArray(blogsData),
          loading: false
        })

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch cancelado al desmontar el componente')
          return
        }
        console.error('Error cargando datos:', error)
        setData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchData()
    // Se ejecuta al desmontar el componente
    return () => {
      controller.abort() // Cancela todas las peticiones pendientes
    }

  }, [])

  return data
}