import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "@/core/context/CartContext"
import { useCreateOrder } from "@/core/hooks/useCreateOrder"
import { getFinalUnitPrice } from "@/core/utils/pricing"
import DeliveryMethod from "./DeliveryMethod"
import ShippingForm from "./ShippingForm"
import OrderSummary from "../ui/OrderSummary"
import styles from "./ShippingPage.module.css"

export default function ShippingPage() {

  const navigate = useNavigate()

  const {
    cartItems,
    subtotal,
    totalDiscount,
    totalPrice
  } = useCartContext()

  const { createOrder } = useCreateOrder()

  const [deliveryMethod, setDeliveryMethod] = useState("home")
 
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  )

  const handleCreateOrder = async ({ formData, documentType, ubigeo }) => {
    if (!cartItems.length) {
      alert("El carrito está vacío")
      return
    }
    try {
      const order = await createOrder({
        deliveryMethod,
        totalItems,
        shipping: deliveryMethod === "home" 
          ? {
              name: formData.name,
              lastname: formData.lastname,
              documentType,
              documentNumber: formData.documentNumber,
              phone: formData.phone,
              ubigeo,
              address: formData.address,
              reference: formData.reference
            } 
          : null,
        items: cartItems.map(item => {
          const unitPrice = Number(getFinalUnitPrice(item)) || 0
          const quantity = Number(item.quantity) || 1
          return {
            productId: Number(item.productId ?? item.id) || 0,
            variantId: Number(item.variantId) || 0,
            productName: item.name || '',
            unitPrice,                   
            quantity,
            total: unitPrice * quantity
          }
        }),
        totals: {
          subtotal: Number(subtotal) || 0,
          discount: Number(totalDiscount) || 0,
          total: Number(totalPrice) || 0
        }
      })
      // 🔍 inspeccionamos qué valores vamos a enviar
      console.log("✅ Orden creada:", order)
      navigate(`/checkout/payment/${order.orderId}`)

    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div className={`container`}>
      <h2 className={styles.title}>Elige tu método de entrega</h2>
      
      <div className={styles.checkout}>
        <div className={styles.left}>
          <DeliveryMethod
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />
          {deliveryMethod === "home" && (
            <ShippingForm onSubmit={handleCreateOrder} />
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
