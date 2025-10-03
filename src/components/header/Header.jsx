import { useAuthContext } from '@/core/context/AuthContext'
import useScroll from '@/core/hooks/useScroll'
import useIsMobile from '@/core/hooks/useIsMobile'
import useClickOutside from '@/core/hooks/useClickOutside'
import useHeaderState from '@/core/hooks/useHeaderState'

import Logo from './Logo'
import Socials from './Socials'
import Search from './Search'
import MobileSearch from './MobileSearch'
import Overlay from './Overlay'
import NavBar from './navbar/NavBar'
import SidebarToggle from './SidebarToggle'
import styles from './Header.module.css'

export default function Header() {

    const { user, logout } = useAuthContext()

    const {
        isSidebarOpen,      // si el menú lateral (mobile) está abierto.
        toggleSidebar,      // abre/cierra el sidebar en mobile.
        closeSidebar,       // cierra el sidebar.

        isDropdownOpen,     // si el menú de usuario está abierto.
        toggleDropdown,     // abre/cierra el menú de usuario.
        handleLinkClick,    // lógica para cuando haces clic en un enlace (ej. cerrar sidebar).
        handleLogout,       // cierra sesión del usuario.
        dropdownRef,        // referencia al menú de usuario, para detectar clics afuera.

        isSearchOpen,       // si el buscador en mobile está abierto.
        openSearch,         // abre el buscador en mobile.
        closeSearch         // cierra el buscador en mobile.
    } = useHeaderState(logout)

    const isScrolled    = useScroll()   // detecta si el usuario bajó con el scroll (para aplicar estilos).
    const isMobile      = useIsMobile() // detecta si la pantalla es chica (para renderizar mobile vs desktop).

    useClickOutside(dropdownRef, () => toggleDropdown(false)) // Si el usuario hace clic fuera del menú de usuario (dropdownRef), se cierra.

    const userActions = {
        isDropdownOpen,
        toggleDropdown,
        handleLinkClick,
        handleLogout,
        user,
        dropdownRef
    }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.top}`}>
            <Socials />
            <Logo />
            <Search isMobile={isMobile} openSearch={openSearch} />
            {isMobile && <SidebarToggle toggleSidebar={toggleSidebar} />}
        </div>

        <NavBar
            isMobile={isMobile}
            
            // Sidebar
            isSidebarOpen   = {isSidebarOpen}
            closeSidebar    = {closeSidebar}

            // Pasamos las acciones del usuario como un solo objeto
            userActions={userActions}
        />

        {/* Si el sidebar está abierto, se muestra el overlay para cerrar haciendo clic afuera */}
        {isSidebarOpen && <Overlay closeSidebar={closeSidebar} />}

        {/* Si estás en mobile y el buscador está abierto, muestra el componente MobileSearch */}
        {isSearchOpen && isMobile && <MobileSearch closeSearch={closeSearch} />}

    </header>
  )
}
