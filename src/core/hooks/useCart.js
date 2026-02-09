import { useState, useEffect } from 'react'
import api from '@/core/api/api'

//const API = 'http://localhost:4000/api/cart'
const API = 'https://ecommerce-api-he4w.onrender.com/api/cart'

// GET carrito del backend
const fetchCart = async (userId) => {
  const res = await fetch(`${API}?userId=${userId}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.cart?.items ?? []
}

// PUT carrito al backend
const saveCart = async (userId, cart) => {
  try {
    // 🔹 Normalizar duplicados
    const normalized = {}
    cart.forEach(item => {
      if (!item.variantId) return
      if (!normalized[item.variantId]) {
        normalized[item.variantId] = { ...item }
        normalized[item.variantId].quantity = 0
      }
      normalized[item.variantId].quantity += item.quantity
    })
    const filtered = Object.values(normalized)

    const res = await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items: filtered }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("❌ Error al guardar carrito:", text)
      throw new Error(text)
    }

    const data = await res.json()
    return data.cart?.items ?? [] // 🔹 devolvemos el carrito actualizado
    
  } catch (err) {
    console.error("❌ saveCart catch:", err)
    return null
  }
}

export const useCart = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [hasPendingOrder, setHasPendingOrder] = useState(false)

  // ✅ Cargar carrito
  useEffect(() => {
    if (isLoggingIn) return

    async function loadCart() {
      setLoading(true)
      try {
        if (userId) {
          const backendCart = await fetchCart(userId)
          setCartItems(backendCart)
        } else {
          const guestCart = JSON.parse(localStorage.getItem("cart") || "[]")
          setCartItems(guestCart)
        }
      } catch (error) {
        console.error("❌ Error cargando carrito:", error)
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }
    loadCart()
  }, [userId, isLoggingIn])

  // ✅ 2️⃣ Guardar en localStorage solo si es invitado
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, userId])

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
    if (!userId) {
      setHasPendingOrder(false)
      return
    }
    checkPendingOrder()
  }, [userId])

  // -----------------------------
  // Funciones del carrito
  // -----------------------------
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
    localStorage.removeItem("cart")
    if (userId) {
      await saveCart(userId, [])
    }
  }

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
  const handleLogin = async (newUserId) => {
    setIsLoggingIn(true)
    // Solo fusionar si hay productos en localStorage
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
    if (localCart.length === 0) {
      setUserId(newUserId)
      return
    }

    const backendCart = await fetchCart(newUserId)
    const mergedCart = [...backendCart]

    localCart.forEach(localItem => {
      const existing = mergedCart.find(i => i.variantId === localItem.variantId)
      if (existing) {
        existing.quantity += localItem.quantity
      } else {
        mergedCart.push(localItem)
      }
    })

    const savedCart = await saveCart(newUserId, mergedCart)
    
    // Actualizamos el hook y eliminamos localStorage
    setCartItems(savedCart)
    setUserId(newUserId)
    localStorage.removeItem("cart")

    setIsLoggingIn(false)
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
    setUserId,
    clearCart,
    handleLogin,
  }
}
