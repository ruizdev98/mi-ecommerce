import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

export default function MobileMenuToggle({ toggleMobileMenu }) {
  return (
    <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu} aria-label="Abrir menú">
        <FontAwesomeIcon icon={faBars} />
    </button>
  )
}
