// src/app/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import FloatingCartButton from '@/shared/ui/FloatingCartButton'

const MainLayout = () => {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <FloatingCartButton />
      <Footer />
    </>
  )
}

export default MainLayout