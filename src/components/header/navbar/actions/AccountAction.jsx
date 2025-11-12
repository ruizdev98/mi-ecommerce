import { Link } from 'react-router-dom'
import styles from '../NavBar.module.css'

export default function AccountAction({ user, handleLinkClick, handleLogout, closeSidebar, isMobile }) {
     const links = user
    ? [
        { to: '/perfil', label: 'Perfil' },
        { to: '/pedidos', label: 'Pedidos' },
      ]
    : [
        { to: '/login', label: 'Iniciar sesión' },
        { to: '/register', label: 'Registrarse' },
      ]

    // Función de click que maneja ambas variantes
    const handleClick = () => isMobile ? closeSidebar?.(): handleLinkClick?.()

  return (
    <ul className={isMobile ? styles.submenuList : styles.accountSubmenuList}>
        {user && !isMobile && (
            <>
                <li className={styles.accountTitle}>
                    Hola, {user.displayName || user.email}
                </li>
            </>
        )}
            {links.map(({ to, label }) => (
                <li key={to} className={styles.submenuItem} >
                    <Link to={to} onClick={handleClick} className={styles.submenuLink}>
                        {label}
                    </Link>
                </li>
            ))}
        {user && (
            <li>
                <button
                    onClick={handleLogout}
                    className={styles.logout}
                >
                    Cerrar sesión
                </button>
            </li>
        )}
    </ul>
  )
}
