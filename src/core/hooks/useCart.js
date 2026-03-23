import { useState, useEffect } from 'react'
import api from '@/core/api/api'

const API = 'https://ecommerce-api-he4w.onrender.com/api/cart'

/* ================= GET CART ================= */
const fetchCart = async () => {
  try {
    const { data } = await api.get("/cart")
    return data.cart?.items ?? []
  } catch (error) {
    console.error("❌ Error fetchCart:", error)
    return []
  }
}

// PUT carrito al backend
const saveCart = async (cart) => {
  try {
    // 🔹 Normalizar duplicados
    const normalized = {}
    cart.forEach(item => {
      if (!item.variantId) return
      if (!normalized[item.variantId]) {
        normalized[item.variantId] = {
          variantId: item.variantId,
          quantity: 0,
          productId: item.productId ?? null
        }
      }
      normalized[item.variantId].quantity += item.quantity
    })
    const items = Object.values(normalized)

    const { data } = await api.put("/cart", {
      items: items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        productId: item.productId
      }))
    })

    return data.cart?.items ?? []
    
  } catch (err) {
    console.error("❌ saveCart:", err)
    return null
  }
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasPendingOrder, setHasPendingOrder] = useState(false)

  /* ================= LOAD CART ================= */
  useEffect(() => {
    async function loadCart() {
      setLoading(true)
      try {
        const backendCart = await fetchCart()
        setCartItems(backendCart)
      } catch (error) {
        console.error("❌ Error cargando carrito:", error)
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }
    loadCart()
  }, [])

  /* ================= PENDING ORDER ================= */
  const checkPendingOrder = async () => {
    try {
      const { data } = await api.get("/orders/pending")
      setHasPendingOrder(!!data?.orderId)
      return !!data?.orderId
    } catch {
      setHasPendingOrder(false)
      return false
    }
  }
  useEffect(() => {
    checkPendingOrder()
  }, [])

  /* ================= LOAD CART ================= */
  const addToCart = async (item) => {
    if (hasPendingOrder) {
      alert("Tienes una compra pendiente. Finalízala o cancélala para seguir comprando.")
      return
    }

    if (!item.variantId) return

    setCartItems(prev => {
      const exists = prev.find(i => i.variantId === item.variantId)
      const newCart = exists
        ? prev.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item]

      // Guardar en backend, pero no dependemos de la respuesta para UI
      if (userId) saveCart(userId, newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const removeFromCart = (variantId) => {
    if (hasPendingOrder) return

    setCartItems(prev => {
      const newCart = prev.filter(i => i.variantId !== variantId)

      // Guardar en backend, pero no dependemos de la respuesta para UI
      if (userId) saveCart(userId, newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const updateQuantity = (variantId, quantity) => {
    if (hasPendingOrder || quantity < 1) return

    setCartItems(prev => {
      const newCart = prev.map(i =>
        i.variantId === variantId ? { ...i, quantity } : i
      )

      if (userId) saveCart(userId, newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const clearCart = async () => {
    setCartItems([])
    await saveCart([])
    setHasPendingOrder(false)
  }
  
  /* ================= PRICE HELPERS ================= */
  const getItemTotalPrice = (item) => {
    // Precio por unidad
    const unitPrice = item.promoNote
      ? item.quantity >= 3
        ? Number(item.discountPrice ?? item.price ?? 0)  // Aplica descuento si cantidad >= 3
        : Number(item.price ?? 0)                        // Precio normal si cantidad < 3
      : Number(item.discountPrice ?? item.price ?? 0)    // Sin promo, usamos descuento si existe

    return unitPrice * item.quantity
  }

  const getItemOriginalTotal = (item) => {
    return Number(item.price ?? 0) * item.quantity
  }

  const getItemDiscount = (item) => {
    return getItemOriginalTotal(item) - getItemTotalPrice(item)
  }

  // -----------------------------
  // 3️⃣ Login: fusionar carrito invitado con backend
  // -----------------------------
  const handleLogin = async () => {
    setIsLoggingIn(true)

    try {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]")

      if (localCart.length === 0) return

      // 🔥 obtener carrito actual del backend (con token)
      const backendCart = await fetchCart()

      const mergedCart = [...backendCart]

      localCart.forEach(localItem => {
        const existing = mergedCart.find(i => i.variantId === localItem.variantId)

        if (existing) {
          existing.quantity += localItem.quantity
        } else {
          mergedCart.push(localItem)
        }
      })

      // 🔥 guardar SIN userId
      await saveCart(mergedCart)

      const updatedCart = await fetchCart()
      setCartItems(updatedCart)

      localStorage.removeItem("cart")

    } catch (error) {
      console.error("❌ Error fusionando carrito:", error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getItemOriginalTotal(item),
    0
  )
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + getItemDiscount(item),
    0
  )

  // Totales
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = cartItems.reduce(
    (s, i) => s + getItemTotalPrice(i),
    0
  )

  return {
    cartItems,
    loading,
    hasPendingOrder,
    setHasPendingOrder,
    checkPendingOrder,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    subtotal,
    totalDiscount,
    getItemTotalPrice,
    getItemOriginalTotal,
    clearCart,
    handleLogin,
  }
}
