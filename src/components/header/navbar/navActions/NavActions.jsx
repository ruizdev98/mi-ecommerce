import CartAction from './CartAction'
import UserAction from './UserAction'
import styles from '../NavBar.module.css'

export default function NavActions({ isMobile, userActions }) {
  return (
    <div className={styles.actions}>
        <UserAction isMobile={isMobile} {...userActions} />
        <CartAction />
    </div>
  )
}
