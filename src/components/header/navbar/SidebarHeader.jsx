import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './NavBar.module.css'

export default function SidebarHeader({ closeSidebar }) {
  return (
    <div className={styles.mobileHeader}>
        <Link to='/' className={styles.mobileLogo}>
            <img src='/logo.png' alt='Logo' />
        </Link>
        <button 
            className={styles.mobileClose}
            onClick={closeSidebar}
            aria-label='Cerrar menú'
        >
            <FontAwesomeIcon icon={faXmark} />
        </button>
    </div>
  )
}
