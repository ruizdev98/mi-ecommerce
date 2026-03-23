import { useState, useEffect } from 'react'
import { useAuth } from '@/core/hooks/useAuth'
import api from '@/core/api/api'

export const useCart = () => {
  const { user } = useAuth()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasPendingOrder, setHasPendingOrder] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  /* ================= GET CART ================= */
  const fetchCart = async () => {
    try {
      if (!user) return []

      const token = await user.getIdToken()

      const { data } = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data.cart?.items ?? []
    } catch (error) {
      console.error("❌ Error fetchCart:", error)
      return []
    }
  }

  /* ================= SAVE CART ================= */
  const saveCart = async (cart) => {
    try {
      if (!user) return null

      const token = await user.getIdToken()

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

      const { data } = await api.put("/cart", { items }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data.cart?.items ?? []
    } catch (err) {
      console.error("❌ saveCart:", err)
      return null
    }
  }

  /* ================= LOAD CART ================= */
  useEffect(() => {
    async function loadCart() {
      if (!user) {
        setCartItems([])
        setLoading(false)
        return
      }

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
  }, [user])

  /* ================= PENDING ORDER ================= */
  const checkPendingOrder = async () => {
    try {
      if (!user) return false

      const token = await user.getIdToken()

      const { data } = await api.get("/orders/pending", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const hasOrder = !!data?.orderId
      setHasPendingOrder(hasOrder)
      return hasOrder
    } catch {
      setHasPendingOrder(false)
      return false
    }
  }
  useEffect(() => {
    if (user) {
      checkPendingOrder()
    }
  }, [user])

  /* ================= CART ACTIONS ================= */
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

      saveCart(newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const removeFromCart = (variantId) => {
    if (hasPendingOrder) return

    setCartItems(prev => {
      const newCart = prev.filter(i => i.variantId !== variantId)

      saveCart(newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const updateQuantity = (variantId, quantity) => {
    if (hasPendingOrder || quantity < 1) return

    setCartItems(prev => {
      const newCart = prev.map(i =>
        i.variantId === variantId ? { ...i, quantity } : i
      )

      saveCart(newCart).catch(err => console.error(err))

      return newCart
    })
  }

  const clearCart = async () => {
    setCartItems([])
    await saveCart([])
    setHasPendingOrder(false)
  }

  /* ================= LOGIN MERGE ================= */
  const handleLogin = async () => {
    if (!user) {
      console.warn("⚠️ User aún no listo")
      return
    }

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
  
  /* ================= PRICE HELPERS ================= */
  const getItemTotalPrice = (item) => {
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

  const subtotal = cartItems.reduce((sum, item) => sum + getItemOriginalTotal(item), 0)
  const totalDiscount = cartItems.reduce((sum, item) => sum + getItemDiscount(item), 0)
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = cartItems.reduce((s, i) => s + getItemTotalPrice(i), 0)

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
    isLoggingIn
  }
}
