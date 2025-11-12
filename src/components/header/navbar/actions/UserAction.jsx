import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSortDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import AccountAction from './AccountAction'
import styles from '../NavBar.module.css'

export default function UserAction({
    isMobile,
    user,
    handleLinkClick,
    handleLogout,
    closeSidebar,
    openSubmenu,
    userDropdownRef,
    isUserDropdownOpen,
    toggleUserDropdown
}) {


  return (
    <div  ref={userDropdownRef} className={`${styles.action} ${styles.userAction}`}>
        {isMobile ? (
            <ul>
                <li>
                    <a 
                        href="#" 
                        className={`${styles.actionIcon} ${styles.userIcon}`}
                        onClick={(e) => {
                            e.preventDefault()
                            openSubmenu('account')
                        }}
                    >
                        <div className={styles.userTitle}>
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
                    onClick={toggleUserDropdown}
                    aria-haspopup='true'
                    aria-expanded={isUserDropdownOpen}
                    aria-label='Menú de usuario'
                >
                    <FontAwesomeIcon icon={faUser} /> 
                    <FontAwesomeIcon icon={faSortDown} />
                </button>

                {isUserDropdownOpen && (
                    <AccountAction 
                        isMobile={isMobile}
                        user={user}
                        handleLinkClick={handleLinkClick}
                        handleLogout={handleLogout}
                        closeSidebar={closeSidebar}
                    />
                )}
                
            </>
        )}
    </div>
  )
}
