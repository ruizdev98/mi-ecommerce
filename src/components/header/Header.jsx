import { useState, useRef } from 'react'
import { useAuthContext } from '@/core/context/AuthContext'
import useScroll from '@/core/hooks/useScroll'
import useIsMobile from '@/core/hooks/useIsMobile'
import useClickOutside from '@/core/hooks/useClickOutside'
import Logo from './Logo'
import Socials from './Socials'
import Search from './Search'
import MobileSearch from './MobileSearch'
import MobileMenuToggle from './MobileMenuToggle'
import Overlay from './Overlay'
import NavBar from './navbar/NavBar'
import styles from './Header.module.css'

export default function Header() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { user, logout } = useAuthContext()
    const dropdownRef = useRef(null)

    const isScrolled = useScroll()
    const isMobile = useIsMobile()
    
    useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev)
    const handleLinkClick = () => setIsDropdownOpen(false)
    const openSearch = () => setIsSearchOpen(true)
    const closeSearch = () => setIsSearchOpen(false)

    const handleLogout = async () => {
        try {
            await logout()
            console.log("Sesión cerrada correctamente")
            setIsDropdownOpen(false)
        } catch (err) {
            console.error("Error al cerrar sesión:", err)
        }
    }

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.top}`}>
            <Socials />
            <Logo />
            <Search isMobile={isMobile} openSearch={openSearch} />
            {isMobile && <MobileMenuToggle toggleMobileMenu={toggleMobileMenu} />}
        </div>

        <NavBar
            isMobileMenuOpen={isMobileMenuOpen}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
            handleLogout={handleLogout}
            user={user}
            dropdownRef={dropdownRef}
            closeMobileMenu={closeMobileMenu}
        />
        
        {isMobileMenuOpen && <Overlay closeMobileMenu={closeMobileMenu} />}
        {isSearchOpen && isMobile && <MobileSearch closeSearch={closeSearch} />}

    </header>
  )
}
