import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from "@/core/context/CartContext"
import "./CartPage.css"

export default function CartPage() {
  const {
      cartItems,
      loading,
      updateQuantity, 
      removeFromCart, 
      totalPrice,
      getItemTotalPrice 
  } = useCartContext()

    // 🟡 1. Estado de carga (MUY IMPORTANTE)
  if (loading) {
    return <div className="cartPageEmpty"><h2>Cargando carrito...</h2></div>
  }

  if (cartItems.length === 0) {
      return (
      <div className="cartPageEmpty">
          <h2>Tu carrito está vacío</h2>
          <a href="/" className="cartReturn">Volver a comprar</a>
      </div>
      )
  }

  return (
    <div className="cartPage">
      {/* Parte izquierda: Lista */}
      <div className="cartListSection">
        <h2>Carrito de Compras</h2>

        {cartItems.map(item => (
          <div key={item.variantId} className="cartItemRow">
            <img src={item.image} alt={item.name} className="cartItemImage" />

            <div className="cartItemInfo">
              <h3>{item.name}</h3>
              <p className="brand">{item.brandName}</p>
              <p className="sku">{item.sku}</p>

              {/* Color y Talla */}
              <div className="variantInfo">
                <span>
                  Color: <strong>{item.color}</strong>
                </span>
                <div className="verticalLine"></div>
                <span>
                  Talla: <strong>{item.size}</strong>
                </span>
              </div>
            </div>
            
            <div className="cartItemPrice">
              <p className="itemPrice">
                S/ {getItemTotalPrice(item).toFixed(2)}
              </p>
            </div>

            {/* Precio */}
            <div className="cartItemActions">
              {/* Cantidad */}
              <div className="qtyControls">
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
                className="removeBtn"
                onClick={() => removeFromCart(item.variantId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Parte derecha: Resumen */}
      <div className="cartSummary">
        <h3>Resumen del Pedido</h3>
        <p>{cartItems.length} Productos</p>

        <div className="summaryRow">
          <span>Subtotal</span>
          <span>S/ {totalPrice.toFixed(2)}</span>
        </div>

        <button 
          className="goToShippingBtn"
          onClick={() => (window.location.href = "/shipping")}
        >
          Continuar con la entrega →
        </button>
      </div>

    </div>
  )
}
