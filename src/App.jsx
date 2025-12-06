import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "@/core/context/AuthContext"
import { CartProvider } from "@/core/context/CartContext";
import router from "./app/router"
import './App.css'

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
