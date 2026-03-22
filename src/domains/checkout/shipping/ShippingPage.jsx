import { useState } from "react"
import { useCheckout } from "../hooks/useCheckout"
import { useCartContext } from "@/core/context/CartContext"
import DeliveryMethod from "./DeliveryMethod"
import ShippingForm from "./ShippingForm"
import OrderSummary from "../ui/OrderSummary"
import styles from "./ShippingPage.module.css"
import StorePickupInfo from "./StorePickupInfo"

export default function ShippingPage() {

  const [deliveryMethod, setDeliveryMethod] = useState("home")

  const {
    totalItems,
    createDeliveryOrder,
    createStoreOrder
  } = useCheckout()

  const {
    cartItems,
    subtotal,
    totalDiscount,
    totalPrice
  } = useCartContext()

  return (
    <div className={`container`}>
      <h2 className={styles.title}>Elige tu método de entrega</h2>
      
      <div className={styles.checkout}>
        <div className={styles.left}>
          <DeliveryMethod
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />
          {deliveryMethod === "home" ?  (
            <ShippingForm onSubmit={createDeliveryOrder} />
          ) : (
            <StorePickupInfo onContinue={createStoreOrder} />
          )}
        </div>

        <aside className={styles.right}>
          <OrderSummary
            cartItems={cartItems}
            totalItems={totalItems}
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            totalPrice={totalPrice}
            showItems
          />
        </aside>
      </div>
    </div>
  )
}
