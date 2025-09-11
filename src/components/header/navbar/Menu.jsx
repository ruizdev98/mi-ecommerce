import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSortDown } from '@fortawesome/free-solid-svg-icons'
import useIsMobile from '@/core/hooks/useIsMobile'
import styles from './NavBar.module.css'

export default function Menu() {
    const isMobile = useIsMobile()
  return (
    <ul className={styles.menu}>
        <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
                Hombre
                <FontAwesomeIcon icon={isMobile ? faChevronRight : faSortDown} className={styles.menuIcon} />
            </a>
        </li>
        <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
                Mujer
                <FontAwesomeIcon icon={isMobile ? faChevronRight : faSortDown} className={styles.menuIcon} />
            </a>
        </li>
        <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
                Accesorios
                <FontAwesomeIcon icon={isMobile ? faChevronRight : faSortDown} className={styles.menuIcon} />
            </a>
        </li>
        <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
                Niños
            </a>
        </li>
        <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
                Ofertas
            </a>
        </li>
    </ul>
  )
}
