import { renderDropdownItem } from './UserDropdownUtils'
import UserButton from './UserButton'
import styles from '../NavBar.module.css'

export default function UserAction({
    isMobile,
    isDropdownOpen,
    toggleDropdown,
    handleLinkClick,
    handleLogout,
    user,
    dropdownRef,
}) {

    // Array dinámico de items según si hay usuario logueado
    const dropdownItems = user
        ? [
            { type: 'label', text: `Hola, ${user.displayName || user.email}` },
            { type: 'divider' },
            { type: 'link', to: '/perfil', text: 'Perfil' },
            { type: 'link', to: '/pedidos', text: 'Mis pedidos' },
            { type: 'button', text: 'Cerrar sesión', onClick: handleLogout, className: styles.logout }
        ]
        : [
            { type: 'link', to: '/login', text: 'Iniciar sesión', onClick: handleLinkClick },
            { type: 'link', to: '/register', text: 'Registrarse', onClick: handleLinkClick }
        ]

  return (
    <div className={`${styles.action} ${styles.userDropdown}`} ref={dropdownRef}>

        {/* Icono / botón según mobile o desktop */}
        <UserButton
            isMobile={isMobile}
            user={user}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
        />

        {/* Dropdown solo en desktop */}
        {!isMobile && isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
                {dropdownItems.map(renderDropdownItem)}
            </ul>
        )}
    </div>
  )
}
