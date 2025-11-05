import CartAction from './CartAction'
import UserAction from './UserAction'
import styles from '../NavBar.module.css'

export default function Actions({ isMobile, openSidebarSubmenu, userActions }) {
  return (
    <div className={styles.actions}>
        <UserAction isMobile={isMobile} openSidebarSubmenu={openSidebarSubmenu} {...userActions} />
        <CartAction />
    </div>
  )
}
