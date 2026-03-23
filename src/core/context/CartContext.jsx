/* src/core/context/CartContext.jsx */
import { createContext, useContext, useEffect } from "react";
import { useCart } from "@/core/hooks/useCart";
import { useAuth } from "@/core/hooks/useAuth";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // user puede ser null o { uid, ... }
  const cart = useCart();
 
  // 🔥 Solo reaccionamos al login/logout
  useEffect(() => {
    if (!user) {
      // Usuario cerró sesión → limpiar carrito
      cart.clearCart()
    } else {
      // Usuario logueado → recargar carrito desde backend
      // (opcional pero recomendado)
      cart.checkPendingOrder()
    }
  }, [user])

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
};