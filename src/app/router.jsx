//import { createBrowserRouter } from "react-router-dom"
import { createHashRouter } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import CheckoutLayout from "./layout/CheckoutLayout"

// Páginas principales
import HomePage from "@/pages/HomePage"
import BlogPage from "@/pages/BlogPage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

// Checkout pages (dominio)
import CartPage from "@/domains/cart/CartPage"
import ShippingPage from "@/domains/cart/ShippingPage"
import PaymentPage from "@/domains/cart/PaymentPage"

// Páginas por dominio
import CategoryPage from "@/domains/categories/pages/CategoryPage"
import BrandPage from "@/domains/brands/pages/BrandPage"
import ProductDetailPage from "@/domains/products/pages/ProductDetailPage"

// Página no encontrada
import NotFoundPage from "@/pages/NotFoundPage"

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home
      { index: true, element: <HomePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      // Rutas dinámicas
      { path: "categoria/:categorySlug", element: <CategoryPage /> },
      { path: "marca/:brandSlug", element: <BrandPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
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