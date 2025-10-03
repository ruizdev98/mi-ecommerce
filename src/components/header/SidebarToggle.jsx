import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

export default function SidebarToggle({ toggleSidebar }) {
  return (
    <button className={styles.mobileMenuToggle} onClick={toggleSidebar} aria-label="Abrir menú">
        <FontAwesomeIcon icon={faBars} />
    </button>
  )
}
