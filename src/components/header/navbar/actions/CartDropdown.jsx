import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from '../NavBar.module.css'

export default function CartDropdown({
  cartItems,
  updateQuantity,
  removeFromCart,
  totalPrice,
  getItemTotalPrice,
  user
}) {

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartDropdown}>
        <p className={styles.emptyCart}>Tu carrito está vacío</p>
      </div>
    )
  }

  const formatPrice = (value) => {
    const num = Number(value)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  }

  return (
    <div className={styles.cartDropdown}>
      <ul className={styles.cartList}>
        {cartItems.map(item => (
          <li
            key={item.variantId}   
            className={styles.cartItem}
          >
            <img
              src={item.image}
              alt={item.name}
              className={styles.cartImage}
            />

            <div className={styles.cartDetails}>
              <p className={styles.cartName}>
                {item.name}
              </p>

              <div className={styles.cartQty}>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.variantId,
                      Math.max(item.quantity - 1, 1)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.variantId,
                      item.quantity + 1
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            <div className={styles.cartActions}>
              <p className={styles.cartPrice}>
                S/ {formatPrice(getItemTotalPrice(item))}
              </p>

              <button
                onClick={() => removeFromCart(item.variantId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.cartFooter}>
        <p>
          Total: <strong>S/ {formatPrice(totalPrice)}</strong>
        </p>

        {/* BOTÓN DIFERENCIADO SEGÚN USUARIO */}
        {user?.uid ? (
          <button
            className={styles.cartCheckoutBtn}
            onClick={() => window.location.href = '/checkout/cart'} // recarga
          >
            Ver carrito
          </button>
        ) : (
          <Link
            to="/login" // no recarga
            className={styles.cartCheckoutBtn}
          >
            Ver carrito
          </Link>
        )}
      </div>
    </div>
  )
}
