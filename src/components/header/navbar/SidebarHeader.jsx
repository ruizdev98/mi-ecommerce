import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import styles from './NavBar.module.css'

export default function SidebarHeader({ activeDepartmentId, closeSidebarSubmenu, data}) {

  const { departments } = data
  const currentDepartment = departments.find(dep => dep.id === activeDepartmentId)

  // Determinar el texto del título según el tipo de submenú
  const titleSidebar = 
    activeDepartmentId === 'account' 
    ? 'Cuenta' 
    : currentDepartment 
    ? capitalizeFirstLetter (currentDepartment?.name) 
    : ''

  return (
    <div className={styles.mobileHeader}>
      {activeDepartmentId ? (
        <>
          <button onClick={closeSidebarSubmenu} className={styles.mobileBackBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className={styles.mobileDeptName}>{titleSidebar}</h4>
        </>
      ) : (
        <Link to="/" className={styles.mobileLogo}>
          <img src="/logo.png" alt="Logo" />
        </Link>
      )}
    </div>
  )
}
