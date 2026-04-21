import { createBrowserRouter } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import CheckoutLayout from "./layout/CheckoutLayout"

// Páginas principales
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

// Checkout pages (dominio)
import CartPage from "@/domains/checkout/pages/cart/CartPage"
import ShippingPage from "@/domains/checkout/pages/shipping/ShippingPage"
import PaymentPage from "@/domains/checkout/pages/payment/PaymentPage"

// Páginas por dominio
import ProductPage from '@/domains/products/pages/product/ProductPage'
import ProductDetailPage from "@/domains/products/pages/detail/ProductDetailPage"

// Página no encontrada
import NotFoundPage from "@/pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      // Rutas dinámicas
      { path: "products", element: <ProductPage />},
      { path: "products/:productId", element: <ProductDetailPage /> }
    ],
  },

  {
    path: "/checkout",
    element: <CheckoutLayout />,
    children: [
      { path: "cart", element: <CartPage /> },
      { path: "shipping", element: <ShippingPage /> },
      { path: "payment/:orderId", element: <PaymentPage /> },
    ],
  },

  // Página no encontrada
  { path: "*", element: <NotFoundPage /> }
]);

export default router;