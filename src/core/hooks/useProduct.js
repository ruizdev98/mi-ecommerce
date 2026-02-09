import { useEffect, useMemo, useState } from 'react'

export function useProduct(productId) {
    const [product, setProduct] = useState(null)
    const [variants, setVariants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!productId) return
        setLoading(true)

        // 🔹 Traer producto base
        const fetchProduct = fetch(`https://ecommerce-api-he4w.onrender.com/api/products/${productId}`).then(res => res.json())

        // 🔹 Traer variantes
        const fetchVariants = fetch(`https://ecommerce-api-he4w.onrender.com/api/product-variants/product/${productId}`).then(res => res.json())

        Promise.all([fetchProduct, fetchVariants])
        .then(([prod, vars]) => {
            setProduct(prod)
            setVariants(vars)
        })
        .catch(err => {
            console.error("❌ Error en useProduct:", err)
            setProduct(null)
            setVariants([])
        })
        .finally(() => setLoading(false))
    }, [productId])

    /**
     * 🎨 Colores disponibles (con stock)
     */
    const colors = useMemo(() => {
        const map = new Map()

        variants.forEach(v => {
        if (v.stock > 0 && !map.has(v.colorId)) {
            map.set(v.colorId, {
            id: v.colorId,
            name: v.colorName,
            hex: v.colorHex,
            })
        }
        })

        return Array.from(map.values())
    }, [variants])

    /**
     * 👕 Tallas disponibles por color
     */
    const getSizesByColor = (colorId) =>
        variants
        .filter(v => v.colorId === colorId && v.stock > 0)
        .map(v => ({
            id: v.sizeId,
            name: v.sizeName,
        }))

    /**
     * 📦 Variante exacta
     */
    const getVariant = (colorId, sizeId) =>
        variants.find(v => v.colorId === colorId && v.sizeId === sizeId)

  return { product, variants, colors, getSizesByColor, getVariant, loading }
}
