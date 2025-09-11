import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSortDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function UserDropdown({
    isMobile,
    isDropdownOpen,
    toggleDropdown,
    handleLinkClick,
    handleLogout,
    user,
    dropdownRef,
}) {
  return (
    <div className={`${styles.action} ${styles.userDropdown}`} ref={dropdownRef}>
        {isMobile ? (
            <Link 
                to={user ? '/perfil' : '/login'}
                className={`${styles.actionIcon} ${styles.userIcon}`}
            >
                <div className={styles.actionLabel}>
                    <FontAwesomeIcon icon={faUser} /> 
                    Cuenta
                </div>
                <FontAwesomeIcon icon={faChevronRight} />
            </Link>
        ) : (
            <button
                className={`${styles.actionIcon} ${styles.userIcon}`}
                onClick={toggleDropdown}
                aria-haspopup='true'
                aria-expanded={isDropdownOpen}
            >
                <FontAwesomeIcon icon={faUser} /> 
                <FontAwesomeIcon icon={faSortDown} />
            </button>
        )}

        {/* Dropdown solo en desktop */}
        {!isMobile && isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
            {user ? (
                <>
                    <li className={styles.dropdownItem}>Hola, {user.displayName || user.email}</li>
                    <li className={styles.dropdownDivider}></li>
                    <li><Link to="/perfil" className={styles.dropdownLink}>Perfil</Link></li>
                    <li><Link to="/pedidos" className={styles.dropdownLink}>Mis pedidos</Link></li>
                    <li>
                        <button onClick={handleLogout} className={`${styles.dropdownLink} ${styles.logout}`}>
                            Cerrar sesión
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li><Link to="/login" onClick={handleLinkClick} className={styles.dropdownLink}>Iniciar sesión</Link></li>
                    <li><Link to="/register" onClick={handleLinkClick} className={styles.dropdownLink}>Registrarse</Link></li>
                </>
            )}
            </ul>
        )}
    </div>
  )
}
