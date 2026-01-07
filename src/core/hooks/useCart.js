import { useState, useEffect } from "react"

const API = "http://localhost:4000/api/cart"

// GET carrito del backend
const fetchCart = async (userId) => {
  const res = await fetch(`${API}?userId=${userId}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.cart?.items ?? []
}

// PUT carrito al backend
const saveCart = async (userId, cart) => {
  await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      items: cart.map(i => ({
        variantId: i.variantId,
        quantity: i.quantity,
      })),
    }),
  })
}

export const useCart = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
  const [cartItems, setCartItems] = useState(() => {
    return userId ? [] : JSON.parse(localStorage.getItem("cart") || "[]")
  })

  // 🔹 Al iniciar sesión → merge carrito
  useEffect(() => {
    if (!userId) return

    async function loadCart() {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const backendCart = await fetchCart(userId)

      const map = new Map()

      backendCart.forEach(item => {
        map.set(item.variantId, { ...item })
      })

      localCart.forEach(item => {
        if (map.has(item.variantId)) {
          map.set(item.variantId, {
            ...map.get(item.variantId),
            quantity: map.get(item.variantId).quantity + item.quantity,
          })
        } else {
          map.set(item.variantId, ...item)
        }
      })

      const merged = [...map.values()]

      setCartItems(merged)
      await saveCart(userId, merged)
      localStorage.removeItem("cart")
    }

    loadCart()
  }, [userId])

  // 🔹 Guardar local si es invitado
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, userId])

  // -----------------------------
  // Funciones del carrito
  // -----------------------------
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.variantId === item.variantId)

      const newCart = existing
        ? prev.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item]

      if (userId) saveCart(userId, newCart)
      return newCart
    })
  }

  const removeFromCart = (variantId) => {
    setCartItems(prev => {
      const newCart = prev.filter(i => i.variantId !== variantId)
      if (userId) saveCart(userId, newCart)
      return newCart
    })
  }

  const updateQuantity = (variantId, quantity) => {
    if (quantity < 1) return

    setCartItems(prev => {
      const newCart = prev.map(i =>
        i.variantId === variantId ? { ...i, quantity } : i
      )
      if (userId) saveCart(userId, newCart)
      return newCart
    })
  }

  const clearCartOnLogout = () => {
    setCartItems([])
    localStorage.removeItem("cart")
    setUserId(null)
  }

  // Totales
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = cartItems.reduce(
    (s, i) => s + Number(i.discountPrice ?? i.price ?? 0) * i.quantity,
    0
  )

  const getItemTotalPrice = (item) => {
    const unitPrice = Number(item.discountPrice ?? item.price ?? 0)
    return unitPrice * item.quantity
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    getItemTotalPrice,
    setUserId,
    clearCartOnLogout,
  }
}
