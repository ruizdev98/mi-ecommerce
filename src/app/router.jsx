import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// Páginas principales
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// Páginas por dominio
import CategoryPage from "@/domains/categories/pages/CategoryPage";
import BrandPage from "@/domains/brands/pages/BrandPage";
import ProductDetailPage from "@/domains/products/pages/ProductDetailPage";

// Página no encontrada
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home
      { index: true, element: <HomePage /> },

      // Secciones estáticas
      { path: "blog", element: <BlogPage /> },
      { path: "carrito", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      // Rutas dinámicas
      { path: "categoria/:categorySlug", element: <CategoryPage /> },
      { path: "marca/:brandSlug", element: <BrandPage /> },
      { path: "producto/:productId", element: <ProductDetailPage /> },

      // Página no encontrada
      { path: "*", element: <NotFoundPage /> }
    ],
  },
]);

export default router;