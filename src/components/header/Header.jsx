import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '@/core/context/AuthContext'
import useScroll from '@/core/hooks/useScroll'
import useIsMobile from '@/core/hooks/useIsMobile'
import useClickOutside from '@/core/hooks/useClickOutside'
import useHeaderState from '@/core/hooks/useHeaderState'
import Socials from './Socials'
import Logo from './Logo'
import Search from './Search'
import NavBar from './navbar/NavBar'
import styles from './Header.module.css'

export default function Header() {

    const { user, logout } = useAuthContext()

    const {
        isSidebarOpen,      // si el menú lateral (mobile) está abierto.
        toggleSidebar,      // abre/cierra el sidebar en mobile.
        closeSidebar,       // cierra el sidebar.
        activeMenuId,       // id del department abierto
        openSubmenu,
        closeSubmenu,
        toggleSubmenu,
        menuRef,
        submenuRef,

        isUserDropdownOpen, // si el menú de usuario está abierto.
        closeUserDropdown,  // cierra el dropdown
        toggleUserDropdown, // abre/cierra el dropdown.
        handleLinkClick,    // lógica para cuando haces clic en un enlace (ej. cerrar sidebar).
        isCartDropdownOpen,
        closeCartDropdown,
        toggleCartDropdown,
        handleLogout,       // cierra sesión del usuario.
        userDropdownRef,    // referencia al menú de usuario, para detectar clics afuera.
        cartDropdownRef,

        isSearchOpen,       // si el buscador en mobile está abierto.
        openSearch,         // abre el buscador en mobile.
        closeSearch         // cierra el buscador en mobile.
    } = useHeaderState(logout)

    const isScrolled    = useScroll()   // detecta si el usuario bajó con el scroll (para aplicar estilos).
    const isMobile      = useIsMobile() // detecta si la pantalla es chica (para renderizar mobile vs desktop).

    useClickOutside(userDropdownRef, closeUserDropdown) // Si el usuario hace clic fuera del menú de usuario (dropdownRef), se cierra.
    useClickOutside(menuRef, closeSidebar)
    useClickOutside(submenuRef, closeSubmenu)
    useClickOutside(cartDropdownRef, closeCartDropdown)

    const actions = {
        isMobile,
        user,
        handleLinkClick,
        handleLogout,
        closeSidebar,
        openSubmenu
    }

    const userActions = {
        ...actions,
        userDropdownRef,
        isUserDropdownOpen,
        toggleUserDropdown,
    }

    const cartActions = {
        isCartDropdownOpen,
        toggleCartDropdown,
        cartDropdownRef
    }

    const menuActions = {
        ...actions,
        isSidebarOpen,
        activeMenuId,
        closeSubmenu,
        toggleSubmenu,
        menuRef,
        submenuRef
    }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.top}`}>
            <Socials />
            <Logo />

            {/* Search unificado para desktop y mobile */}
            <Search
                isMobile={isMobile}
                isSearchOpen={isSearchOpen}
                openSearch={openSearch}
                closeSearch={closeSearch}
            />

            {/* Toggle del sidebar en mobile */}
            {isMobile && 
                <button 
                    className={styles.mobileMenuToggle} 
                    onClick={toggleSidebar} 
                    aria-label="Abrir menú"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            }
        </div>

        <NavBar
            isMobile={isMobile}
            // Pasamos las acciones del Sidebar como un solo objeto
            menuActions={menuActions}
            // Pasamos las acciones del usuario como un solo objeto
            userActions={userActions}
            // Pasamos las acciones del carrito como un solo objeto
            cartActions={cartActions}
        />

        {/* Si el sidebar está abierto, se muestra el overlay para cerrar haciendo clic afuera */}
        {isSidebarOpen && 
            <div 
                className={styles.overlay} 
                onClick={() => {
                    closeSidebar()
                    closeSubmenu()
                }}
            >
            </div>
        }

    </header>
  )
}
