import CartAction from './CartAction'
import UserAction from './UserAction'
import styles from '../NavBar.module.css'

export default function Actions({ userActions, cartActions }) {
  return (
    <div className={styles.actions}>
        <UserAction {...userActions} />
        <CartAction {...cartActions} />
    </div>
  )
}
