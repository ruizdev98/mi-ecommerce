// src/app/layout/MainLayout.jsx
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>   
      <Footer />
    </>
  );
};

export default MainLayout;