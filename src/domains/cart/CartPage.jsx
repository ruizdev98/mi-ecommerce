import { useCartContext } from "@/core/context/CartContext"
import "./CartPage.css"

export default function CartPage() {
    const {
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        totalPrice,
        getItemTotalPrice 
    } = useCartContext()

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
          <div key={item.productId} className="cartItemRow">
            
            <img src={item.image} alt={item.name} className="cartItemImage" />

            <div className="cartItemInfo">
              <h3>{item.name}</h3>
              <p className="brand">{item.brandName}</p>

              <div className="qtyControls">
                <button 
                  onClick={() =>
                    updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                  }
                >-</button>

                <span>{item.quantity}</span>

                <button 
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                >+</button>
              </div>
            </div>

            <div className="cartItemActions">
              <p className="itemPrice">
                S/ {getItemTotalPrice(item).toFixed(2)}
              </p>

              <button 
                className="removeBtn"
                onClick={() => removeFromCart(item.productId)}
              >
                🗑
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
