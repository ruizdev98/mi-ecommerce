import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSortDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import UserDropdown from './UserDropdown.jsx'
import styles from '../NavBar.module.css'

export default function UserAction({
    isMobile,
    user,
    handleLinkClick,
    handleLogout,
    dropdownRef,
    isDropdownOpen,
    toggleDropdown,
    openSidebarSubmenu
}) {


  return (
    <div  ref={dropdownRef} className={`${styles.action} ${styles.userDropdown}`}>
        {isMobile ? (
            <ul>
                <li>
                    <a 
                        href="#" 
                        className={`${styles.actionIcon} ${styles.userIcon}`}
                        onClick={(e) => {
                            e.preventDefault()
                            openSidebarSubmenu('account')
                        }}
                    >
                        <div className={styles.actionLabel}>
                            {user ? (
                                <>
                                    <FontAwesomeIcon icon={faUser} /> {user.displayName || user.email}
                                </>
                                
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUser} /> Cuenta
                                </>
                            )}
                            
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </li>
            </ul>
        ) : (
            <>
                {/* 🔹 DESKTOP: mostrar dropdown normal */}
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

                {isDropdownOpen && (
                    <UserDropdown user={user} handleLinkClick={handleLinkClick} handleLogout={handleLogout} />
                )}
            </>
        )}
    </div>
  )
}
