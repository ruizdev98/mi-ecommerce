import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from "@/core/context/CartContext"
import { useNavigate } from 'react-router-dom'
import OrderSummary from './OrderSummary'
//import "./CartPage.css"
import styles from './CartPage.module.css'

export default function CartPage() {
  const {
      cartItems,
      loading,
      updateQuantity, 
      removeFromCart, 
      totalPrice,
      subtotal,
      totalDiscount,
      totalItems,
      getItemTotalPrice,
      getItemOriginalTotal, 
  } = useCartContext()

  const navigate = useNavigate()

    // 🟡 1. Estado de carga (MUY IMPORTANTE)
  if (loading) {
    return <div className={styles.cartPageEmpty}><h2>Cargando carrito...</h2></div>
  }

  if (cartItems.length === 0) {
      return (
      <div className={styles.cartPageEmpty}>
          <h2>Tu carrito está vacío</h2>
          <a href="/" className={styles.cartReturn}>Volver a comprar</a>
      </div>
      )
  }
  
  return (
    <div className="container">
      <div className={styles.cartPage}>
        
        <div className={styles.cartListSection}>
          <h2>Carrito de Compras</h2>

          {cartItems.map(item => (
            <div key={item.variantId} className={styles.cartItemRow}>
              <img src={item.image} alt={item.name} className={styles.cartItemImage} />

              <div className={styles.cartItemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.brand}>{item.brandName}</p>
                <p className={styles.sku}>{item.sku}</p>

                <div className={styles.variantInfo}>
                  <span>
                    Color: <strong>{item.color}</strong>
                  </span>
                  <div className={styles.verticalLine}></div>
                  <span>
                    Talla: <strong>{item.size}</strong>
                  </span>
                </div>
              </div>
              
              <div className={styles.cartItemPrice}>
                {getItemOriginalTotal(item) !== getItemTotalPrice(item) && (
                  <p className={styles.originalPrice}>
                    S/ {getItemOriginalTotal(item).toFixed(2)}
                  </p>
                )}
                <p className={styles.itemPrice}>
                  S/ {getItemTotalPrice(item).toFixed(2)}
                </p>
              </div>

              <div className={styles.cartItemActions}>
                <div className={styles.qtyControls}>
                  <button 
                    onClick={() =>
                      updateQuantity(item.variantId, Math.max(1, item.quantity - 1))
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>

                  <span>{item.quantity}</span>

                  <button 
                    onClick={() =>
                      updateQuantity(item.variantId, item.quantity + 1)
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.variantId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderSummary}>
          <OrderSummary
            cartItems={cartItems}
            totalItems={totalItems}
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            totalPrice={totalPrice}
            showGeneralButton
            generalButtonText="Continuar con la entrega →"
            buttonDisabled={cartItems.length === 0}
            onButtonClick={() => navigate("/checkout/shipping")}
          />
        </div>
        
      </div>
    </div>
  )
}
