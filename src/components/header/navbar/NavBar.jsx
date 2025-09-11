import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import useIsMobile from '@/core/hooks/useIsMobile'
import Menu from './Menu'
import UserDropdown from './UserDropdown'
import CartButton from './CartButton'
import styles from './NavBar.module.css'


export default function NavBar({
    isMobileMenuOpen,
    isDropdownOpen,
    toggleDropdown,
    handleLinkClick,
    handleLogout,
    user,
    dropdownRef,
    closeMobileMenu
}) {
    const isMobile = useIsMobile()

  return (
    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={`container ${styles.navContainer}`}>

            {/* 🔹 Header solo en mobile */}
            {isMobile && (
                <div className={styles.mobileHeader}>
                    <Link to='/' className={styles.mobileLogo}>
                        <img src='/logo.png' alt='Logo' />
                    </Link>
                    <button 
                        className={styles.mobileClose}
                        onClick={closeMobileMenu}
                        aria-label='Cerrar menú'
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            )}

            {/* 🔹 Menú de categorías */}
            <Menu />

            {/* Acciones: usuario y carrito */}
            <div className={styles.actions}>
                <UserDropdown 
                    isMobile={isMobile}
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                    handleLinkClick={handleLinkClick}
                    handleLogout={handleLogout}
                    user={user}
                    dropdownRef={dropdownRef}
                />
                <CartButton />
            </div>
        </div>
    </nav>
  )
}
