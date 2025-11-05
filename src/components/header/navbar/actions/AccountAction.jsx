import { Link } from 'react-router-dom'
import styles from '../NavBar.module.css'

export default function AccountAction({ isMobile, user, handleLinkClick, handleLogout, closeSidebar }) {
     const links = user
    ? [
        { to: '/perfil', label: 'Perfil' },
        { to: '/pedidos', label: 'Pedidos' },
      ]
    : [
        { to: '/login', label: 'Iniciar sesión' },
        { to: '/register', label: 'Registrarse' },
      ]
    
    // Clases dinámicas según mobile o desktop
    const listClass = isMobile ? styles.sidebarSubmenuList : styles.dropdownMenu
    const itemClass = isMobile ? styles.sidebarSubmenuItem : ''
    const linkClass = isMobile ? styles.sidebarSubmenuLink : styles.dropdownLink

    // Función de click que maneja ambas variantes
    const handleClick = () => isMobile ? closeSidebar?.(): handleLinkClick?.()

  return (
    <ul className={listClass}>
        {user && !isMobile && (
            <>
                <li className={styles.dropdownItem}>
                    Hola, {user.displayName || user.email}
                </li>
                    
                <li className={styles.dropdownDivider}></li>
            </>
        )}
            {links.map(({ to, label }) => (
                <li key={to} className={itemClass} >
                    <Link to={to} onClick={handleClick} className={linkClass}>
                        {label}
                    </Link>
                </li>
            ))}
        {user && (
            <li>
                <button
                    onClick={handleLogout}
                    className={isMobile ? '' : `${styles.dropdownLink} ${styles.logout}`}
                >
                    Cerrar sesión
                </button>
            </li>
        )}
    </ul>
  )
}
