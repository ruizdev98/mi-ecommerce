import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from '@/core/context/CartContext'
import CartDropdown from './CartDropdown'
import styles from '../NavBar.module.css'

export default function CartAction({ isCartDropdownOpen, toggleCartDropdown, cartDropdownRef }) {

  const { cartItems, updateQuantity, removeFromCart, totalPrice, totalItems, getItemTotalPrice } = useCartContext()

  const cartDropdownActions = {
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice,
    getItemTotalPrice
  }

  return (
    <div className={styles.action} ref={cartDropdownRef}>
      <button 
        className={`${styles.actionIcon} ${styles.cartIcon}`}
        onClick={toggleCartDropdown}
      >
          <FontAwesomeIcon icon={faBagShopping} />
          {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
      </button>

      {isCartDropdownOpen && <CartDropdown {...cartDropdownActions}/>}
      
    </div>
  )
}
