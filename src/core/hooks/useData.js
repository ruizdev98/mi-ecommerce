import { useState, useEffect } from 'react';
import { validateProduct, cleanProductNumbers } from '../utils/validation';

function cleanProducts(products) {
  return products.map(cleanProductNumbers).filter(validateProduct);
}

function addBrandName(products, brands) {
  return products.map(product => ({
    ...product,
    brandName: brands.find(b => b.id === product.brandId)?.name || 'Marca desconocida'
  }));
}

export function useData() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/api/categories').then(res => res.json()),
      fetch('http://localhost:4000/api/products').then(res => res.json()),
      fetch('http://localhost:4000/api/products/bestsellers').then(res => res.json()),
      fetch('http://localhost:4000/api/products/featured').then(res => res.json()),
      fetch('http://localhost:4000/api/brands').then(res => res.json()),
      fetch('http://localhost:4000/api/genders').then(res => res.json()),
      fetch('http://localhost:4000/api/blogs').then(res => res.json())
    ])
      .then(([categoriesData, productsData, bestSellersData, featuredData, brandsData, gendersData, blogsData]) => {
        setCategories(categoriesData);
        setProducts(addBrandName(cleanProducts(productsData), brandsData));
        setBestSellers(addBrandName(cleanProducts(bestSellersData), brandsData));
        setFeatured(addBrandName(cleanProducts(featuredData), brandsData));
        setBrands(brandsData);
        setGenders(gendersData);
        setBlogs(blogsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  return { categories, products, bestSellers, featured, brands, genders, blogs, loading }
}