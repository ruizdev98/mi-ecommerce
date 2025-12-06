import { AnimatePresence } from 'framer-motion'
import { useData } from '@/core/hooks/useData'
import Menu from './menu/Menu'
import MenuHeader from './menu/MenuHeader'
import Submenu from './menu/Submenu'
import Actions from './actions/Actions'
import AnimatedSection from './AnimatedSection'
import styles from './NavBar.module.css'

export default function NavBar({ menuActions, userActions, cartActions }) {

  const {
    isMobile,
    user,
    handleLinkClick,
    handleLogout,
    closeSidebar,
    openSubmenu,
    isSidebarOpen,
    activeMenuId,
    closeSubmenu,
    toggleSubmenu,
    menuRef,
    submenuRef
  } = menuActions

  const data = useData()
  const { loading } = data

  const basicMenuActions = {
    isMobile,
    data,
    activeMenuId,
  }
  const mainMenuActions = {
    openSubmenu,
    toggleSubmenu,
    submenuRef,
    ...basicMenuActions
  }
  const secondaryMenuActions = {
    user,
    handleLinkClick,
    handleLogout,
    closeSidebar,
  }

  // ✅ Contenido común del menú (MenuList + NavActions)
  const menuContent = (
      <>
        <Menu {...mainMenuActions} secondaryMenuActions={secondaryMenuActions} />
        <Actions userActions={userActions} cartActions={cartActions} />
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
    <nav ref={menuRef} className={`${styles.nav} ${isSidebarOpen ? styles.open : ''}`}>
    
    {isMobile ? (
      <AnimatePresence mode='wait'>
        <AnimatedSection 
          key={activeMenuId ? 'sidebarSubmenu' : 'mainMenu'} 
          direction='left' 
          className={`container ${styles.navContainer}`}
        >
          <MenuHeader user={user} activeMenuId={activeMenuId} closeSubmenu={closeSubmenu} data={data}/>
          {activeMenuId 
            ? <Submenu {...secondaryMenuActions} {...basicMenuActions} /> 
            : menuContent }
        </AnimatedSection>
      </AnimatePresence>
    ) : (
      <div className={`container ${styles.navContainer}`}> {menuContent} </div>
    )}
    </nav>
    )
}
