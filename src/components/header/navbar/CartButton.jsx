import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './NavBar.module.css'

export default function CartButton() {
  return (
    <div className={styles.action}>
        <a href="#" className={`${styles.actionIcon} ${styles.cartIcon}`}>
            <FontAwesomeIcon icon={faBagShopping} />
            <span className={styles.cartCount}>0</span>
        </a>
    </div>
  )
}
