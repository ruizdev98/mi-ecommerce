import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSortDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from '../NavBar.module.css'

export default function UserButton({ isMobile, user, toggleDropdown, isDropdownOpen }) {
  return isMobile ? (
    <Link
        to={user ? '/perfil' : '/login'}
        className={`${styles.actionIcon} ${styles.userIcon}`}
    >
        <div className={styles.actionLabel}>
            <FontAwesomeIcon icon={faUser} /> Cuenta
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  ) : (
    <button
        className={`${styles.actionIcon} ${styles.userIcon}`}
        onClick={toggleDropdown}
        aria-haspopup='true'
        aria-expanded={isDropdownOpen}
        aria-label='Menú de usuario'
    >
        <FontAwesomeIcon icon={faUser} /> 
        <FontAwesomeIcon icon={faSortDown} />
    </button>
  )
}
