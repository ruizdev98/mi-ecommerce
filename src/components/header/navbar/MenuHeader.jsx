import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function MenuHeader({ user, activeMenuId, closeSubmenu, data}) {

  const { departments } = data
  const currentDepartment = departments.find(dep => dep.id === activeMenuId)

  // Determinar el texto del título según el tipo de submenú
  const menuHeaderTitle = 
    activeMenuId === 'account'
    ? user
        ? user.displayName || user.email
        : 'Cuenta'
    : currentDepartment 
    ? capitalizeFirstLetter (currentDepartment?.name)
    : ''

  return (
    <div className={styles.menuHeader}>
      {activeMenuId ? (
        <>
          <button className={styles.menuHeaderBackBtn} onClick={closeSubmenu} >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className={styles.menuHeaderTitle}>{menuHeaderTitle}</h4>
        </>
      ) : (
        <Link to="/" className={styles.menuHeaderLogo}>
          <img src="/logo.png" alt="Logo" />
        </Link>
      )}
    </div>
  )
}
