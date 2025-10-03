import { useState, useRef } from 'react'
import useClickOutside from '@/core/hooks/useClickOutside'
import MenuList from './MenuList'
import SidebarHeader from './SidebarHeader'
import NavActions from './navActions/NavActions'
import styles from './NavBar.module.css'

export default function NavBar({ isMobile, isSidebarOpen, closeSidebar, userActions }) {

    // Estado local para saber si algún submenú de categorías está abierto
    const [isMenuItemOpen, setIsMenuItemOpen] = useState(false)

    // sidebarRef apunta al contenedor del sidebar
    const sidebarRef = useRef(null)
    // Si el sidebar está abierto y clicas afuera de todo el nav, se ejecuta closeSidebar()
    useClickOutside(sidebarRef, () => {
        if (isSidebarOpen) closeSidebar()
    })

    // menuItemsRef apunta al bloque de categorías
    const menuItemsRef = useRef(null)
    // Si clicas afuera, cierra cualquier submenú abierto (setIsMenuItemOpen(false))
    useClickOutside(menuItemsRef, () => setIsMenuItemOpen(false))

  return (
    <nav ref={sidebarRef} className={`${styles.nav} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={`container ${styles.navContainer}`}>

            {/* Header solo en mobile */}
            {isMobile && (
                <SidebarHeader closeSidebar={closeSidebar} />
            )}

            {/* Menú de categorías */}
            <MenuList ref={menuItemsRef} isMenuItemOpen={isMenuItemOpen} setIsMenuItemOpen={setIsMenuItemOpen} />

            {/* Acciones: usuario y carrito */}
            <NavActions isMobile={isMobile} userActions={userActions} />
        </div>
    </nav>
  )
}
