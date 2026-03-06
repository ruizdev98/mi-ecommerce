import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from "@/core/context/CartContext"
import { useNavigate } from 'react-router-dom'
import OrderItemsList from './OrderItemsList'
import OrderSummary from './OrderSummary'
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
    <div className='container'>
      <h2>Carrito de Compras</h2>

      <div className={styles.cartPage}>
        
        <div className={styles.cartListSection}>
          <OrderItemsList
            items={cartItems}
            showQuantityControls
            getOriginalPrice={getItemOriginalTotal}
            getFinalPrice={getItemTotalPrice}
            onIncrease={(item) =>
              updateQuantity(item.variantId, item.quantity + 1)
            }
            onDecrease={(item) =>
              updateQuantity(item.variantId, Math.max(1, item.quantity - 1))
            }
            onRemove={(item) =>
              removeFromCart(item.variantId)
            }
          />
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
