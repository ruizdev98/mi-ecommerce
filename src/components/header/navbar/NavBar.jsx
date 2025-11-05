import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useData } from '@/core/hooks/useData'
import useClickOutside from '@/core/hooks/useClickOutside'
import MenuList from './MenuList'
import SidebarHeader from './SidebarHeader'
import SidebarSubmenu from './SidebarSubmenu'
import Actions from './actions/Actions'
import AnimatedSection from './ui/AnimatedSection'
import styles from './NavBar.module.css'

export default function NavBar({ menuActions, userActions }) {

  const {
    isMobile,
    user,
    handleLinkClick,
    handleLogout,
    isSidebarOpen,
    closeSidebar,
    activeDepartmentId,
    openSidebarSubmenu,
    closeSidebarSubmenu
  } = menuActions

  const data = useData()
  const { loading } = data

  // sidebarRef apunta al contenedor del sidebar
  const sidebarRef = useRef(null)
  // Si el sidebar está abierto y clicas afuera de todo el nav, se ejecuta closeSidebar()
  useClickOutside(sidebarRef, () => {
      if (isSidebarOpen) closeSidebar()
  })

  const sidebarActions = {
    activeDepartmentId,
    closeSidebarSubmenu,
    data
  }

  const sidebarSubmenuActions = {
    isMobile,
    user,
    handleLinkClick,
    handleLogout,
    closeSidebar,
    activeDepartmentId,
    data
  }

  // ✅ Contenido común del menú (MenuList + NavActions)
  const menuContent = (
      <>
        <MenuList isMobile={isMobile} openSidebarSubmenu={openSidebarSubmenu} data={data} />
        <Actions isMobile={isMobile} openSidebarSubmenu={openSidebarSubmenu} userActions={userActions} />
      </>
  )

  if (loading) {
    return (
      <nav className={styles.nav}>
        <div className='container'>Cargando menú...</div>
      </nav>
    )
  }

  return (
    <nav ref={sidebarRef} className={`${styles.nav} ${isSidebarOpen ? styles.open : ''}`}>
    
    {isMobile ? (
        <AnimatePresence mode='wait'>
          {/* --- MENÚ PRINCIPAL --- */}
          {!activeDepartmentId && (
            <AnimatedSection key='mainMenu' direction='left' className={`container ${styles.navContainer}`}>
              <SidebarHeader {...sidebarActions} />
              {menuContent}
            </AnimatedSection>
          )}

          {/* --- SUBMENÚ DEPARTAMENTO --- */}
          {activeDepartmentId && (
            <AnimatedSection key='sidebarSubmenu' direction='left' className={`container ${styles.navContainer}`}>
              <SidebarHeader {...sidebarActions} />
              <SidebarSubmenu {...sidebarSubmenuActions} />
            </AnimatedSection>
          )}
        </AnimatePresence>
      ) : (
        <div className={`container ${styles.navContainer}`}> {menuContent} </div>
    )}
    </nav>
    )
}
