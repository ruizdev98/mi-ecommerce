import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '@/core/utils/pricing'
import { Link } from 'react-router-dom'
import api from "@/core/api/api"
import styles from '../NavBar.module.css'

export default function CartDropdown({
  cartItems,
  updateQuantity,
  removeFromCart,
  totalPrice,
  getItemTotalPrice,
  user
}) {

  const navigate = useNavigate()
  

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartDropdown}>
        <p className={styles.emptyCart}>Tu carrito está vacío</p>
      </div>
    )
  }

  const handleCheckoutClick = async () => {
    // 🔐 SI NO ESTÁ LOGUEADO
    if (!user?.uid) {
      navigate("/login")
      return
    }
    try {
      const { data } = await api.get("/orders/pending")

      if (data?.orderId) {
        navigate(`/checkout/payment/${data.orderId}`)
      } else {
        navigate("/checkout/cart")
      }

    } catch (error) {
      console.error("Error checkout:", error)
      navigate("/checkout/cart")
    }
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
            onClick={handleCheckoutClick}
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
