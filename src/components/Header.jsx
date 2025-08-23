import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBagShopping, faSearch, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from "@/core/context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import './Header.css'

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user, logout, loading } = useAuthContext()
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

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
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
            <div className='site-header__logo'>
                <a href="#"><img src="/logo.png" alt="Antonella Logo" /></a>
            </div>
            <div className='site-header__search'>
                <form className='search-form'>
                    <input type="text" placeholder="Buscar" className='search-form__input'/>
                    <button className='search-form__button'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </div>

        {/* Menú principal */}
        <nav className='site-header__nav'>
            <div className='container site-header__nav-container'>
                <ul className='nav-menu'>
                    <li className='nav-menu__item'>
                        <a href="#" className='nav-menu__link'>Hombre<FontAwesomeIcon icon={faSortDown} className='nav-menu__icon' /></a>
                    </li>
                    <li className='nav-menu__item'>
                        <a href="#" className='nav-menu__link'>Mujer<FontAwesomeIcon icon={faSortDown} className='nav-menu__icon' /></a>
                    </li>
                    <li className='nav-menu__item'>
                        <a href="#" className='nav-menu__link'>Accesorios<FontAwesomeIcon icon={faSortDown} className='nav-menu__icon' /></a>
                    </li>
                    <li className='nav-menu__item'>
                        <a href="#" className='nav-menu__link'>Niños</a>
                    </li>
                    <li className='nav-menu__item'>
                        <a href="#" className='nav-menu__link'>Ofertas</a>
                    </li>
                </ul>

                {/* Acciones: usuario y carrito */}
                <div className='nav-menu__actions'>
                    <div className="user-dropdown" ref={dropdownRef}>
                        <button
                            className="nav-menu__action-icon nav-menu__action-icon--user"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            <FontAwesomeIcon icon={faUser} /> <FontAwesomeIcon icon={faSortDown} />
                        </button>

                        {isDropdownOpen && (
                            <ul className="user-dropdown__menu">
                                {user ? (
                                    <>
                                        <li className="user-dropdown__item">Hola, {user.displayName || user.email}</li>
                                        <li className="user-dropdown__divider"></li>
                                        <li><Link to="/perfil" className="user-dropdown__link">Perfil</Link></li>
                                        <li><Link to="/pedidos" className="user-dropdown__link">Mis pedidos</Link></li>
                                        <li>
                                            <button onClick={handleLogout} className="user-dropdown__link user-dropdown__logout">
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login" onClick={handleLinkClick} className="user-dropdown__link">Iniciar sesión</Link></li>
                                        <li><Link to="/register" onClick={handleLinkClick} className="user-dropdown__link">Registrarse</Link></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    <div>
                        <a href="#" className='nav-menu__action-icon nav-menu__action-icon--cart'>
                            <FontAwesomeIcon icon={faBagShopping} />
                            <span className='nav-menu__cart-count'>0</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}
