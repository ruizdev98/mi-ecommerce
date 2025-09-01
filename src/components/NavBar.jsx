import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './NavBar.css'


export default function NavBar({ 
  isMobileMenuOpen, 
  isDropdownOpen, 
  toggleDropdown, 
  handleLinkClick, 
  handleLogout, 
  user, 
  dropdownRef 
}) {
  return (
    <nav className={`site-header__nav ${isMobileMenuOpen ? 'open' : ''}`}>
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
  )
}
