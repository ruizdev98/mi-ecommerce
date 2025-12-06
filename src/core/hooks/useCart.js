import { useState, useEffect } from "react"

const API = "http://localhost:4000/api/cart"

// GET carrito del backend
const fetchCart = async (userId) => {
  const res = await fetch(`${API}?userId=${userId}`)
  if (!res.ok) return null
  const data = await res.json()
  return data.cart?.items ?? null
}

// PUT carrito al backend
const saveCart = async (userId, cart) => {
  await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      items: cart.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    }),
  })
}

export const useCart = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null)

  // Estado inicial del carrito para invitados
  const [cartItems, setCartItems] = useState(() => {
    return userId ? [] : JSON.parse(localStorage.getItem("cart") || "[]")
  })

  // 1. Cargar o fusionar carrito al iniciar sesión
  useEffect(() => {

    if (!userId) return

    async function loadCart() {

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const backendCart = await fetchCart(userId)

      // Fusionar backend + local
      const map = new Map()
      backendCart.forEach(item => map.set(item.productId, { ...item }))
      localCart.forEach(item => {
        if (map.has(item.productId)) {
          map.set(item.productId, {
            ...map.get(item.productId),
            quantity: map.get(item.productId).quantity + item.quantity,
          })
        } else {
          map.set(item.productId, { ...item })
        }
      })
      const merged = [...map.values()]

      setCartItems(merged)
      await saveCart(userId, merged)

      localStorage.removeItem("cart")
    }

    loadCart()
  }, [userId])

  // 2. Guardar carrito en localStorage si NO hay usuario
  useEffect(() => {
    if (!userId) localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems, userId])

  // -----------------------------
  //   Funciones del carrito
  // -----------------------------
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === product.id)

      const newCart = existing
        ? prev.map(i =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { ...product, productId: product.id, quantity: 1 }]

      if (userId) saveCart(userId, newCart)
      return newCart
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newCart = prev.filter(i => i.productId !== productId)
      if (userId) saveCart(userId, newCart)
      return newCart
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems(prev => {
      const newCart = prev.map(i =>
        i.productId === productId ? { ...i, quantity } : i
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

  const totalPrice = cartItems.reduce((s, i) => s + Number(i.discountPrice ?? i.price ?? 0) * i.quantity, 0)

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