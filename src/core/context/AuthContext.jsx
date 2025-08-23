import { createContext, useContext } from "react"
import { useAuth } from "@/core/hooks/useAuth"

// Se crea el contexto
const AuthContext = createContext(null)

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const auth = useAuth() // trae user, login, logout, register, loading, error
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto desde cualquier componente
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider")
  }
  return context
};