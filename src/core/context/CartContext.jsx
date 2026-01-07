/* src/core/context/CartContext.jsx */
import { createContext, useContext, useEffect } from "react";
import { useCart } from "@/core/hooks/useCart";
import { useAuth } from "@/core/hooks/useAuth";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cart = useCart();
  const { user } = useAuth(); // user puede ser null o { uid, ... }

  // 🔹 Efecto para detectar cambios de sesión
  useEffect(() => {
    if (user?.uid) {
      // Usuario inicia sesión → actualizar userId en useCart
      cart.setUserId(user.uid);
      // useCart se encargará de fusionar carrito local con backend
    } else {
      // Usuario cierra sesión → limpiar carrito local e invitado
      cart.clearCartOnLogout();
    }
  }, [user]);

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