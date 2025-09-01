import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '@/core/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import './Header.css'


export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const { user, logout } = useAuthContext()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    // Detectar scroll para aplicar estilo
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Manejar cierre de dropdown por cambio de usuario o clic fuera
    useEffect(() => {
        // Si el usuario cambia (ej. login/logout) → cerrar menú
        if (user) setIsDropdownOpen(false)

        // Función para cerrar al hacer click fuera
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        
        // Cleanup del event listener
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev)
    const handleLinkClick = () => setIsDropdownOpen(false)

    const handleLogout = async () => {
        try {
            await logout()
            console.log("Sesión cerrada correctamente")
            setIsDropdownOpen(false)
            navigate("/")
        } catch (err) {
            console.error("Error al cerrar sesión:", err)
        }
    }

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className='container site-header__top'>
            <div className='site-header__socials'>
                <a href="#"><FontAwesomeIcon icon={faTiktok} className='site-header__social-icon' /></a>
                <a href="#"><FontAwesomeIcon icon={faYoutube} className='site-header__social-icon' /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} className='site-header__social-icon' /></a>
                <a href="#"><FontAwesomeIcon icon={faFacebook} className='site-header__social-icon' /></a>
                <a href="#"><FontAwesomeIcon icon={faXTwitter} className='site-header__social-icon' /></a>
            </div>

            {/* logo */}
            <div className='site-header__logo'>
                <a href="#"><img src="/logo.png" alt="Antonella Logo" /></a>
            </div>

            {/* search */}
            <div className='site-header__search'>
                <form className='search-form'>
                    <input type="text" placeholder="Buscar" className='search-form__input'/>
                    <button className='search-form__button'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

            {/* botón hamburguesa 👇 solo en mobile */}
            <button 
                className='mobile-menu-toggle'
                onClick={toggleMobileMenu}
                aria-label='Abrir menú'
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>

        {/* Menú principal */}
        <NavBar
            isMobileMenuOpen={isMobileMenuOpen}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
            handleLogout={handleLogout}
            user={user}
            dropdownRef={dropdownRef}
        />
        {/* Overlay oscuro */}
        {isMobileMenuOpen && (
            <div 
                className="overlay"
                onClick={closeMobileMenu} // 👈 al hacer click fuera, cierra el menú
            ></div>
        )}
    </header>
  )
}
