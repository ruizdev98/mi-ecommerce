import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "@/core/context/CartContext"
import { useCreateOrder } from "@/core/hooks/useCreateOrder"
import { getFinalUnitPrice } from "@/core/utils/pricing"
import DeliveryMethod from "./DeliveryMethod"
import ShippingForm from "./ShippingForm"
import OrderSummary from "../ui/OrderSummary"
import GeneralButton from "@/shared/ui/GeneralButton"
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
          {deliveryMethod === "home" ?  (
            <ShippingForm onSubmit={handleCreateOrder} />
          ) : (
            <div>
              <div>
                <p><FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} /> <strong>Dirección:</strong></p>
                <p>Av. Francisco Bolognesi 302, Barranco</p><br />
                <p><FontAwesomeIcon icon={faClock} className={styles.clockIcon} /> <strong>Horario de atención:</strong></p>
                <p>Lunes a Viernes de 08:00am a 18:00pm.</p><br />
              </div>
              <div className={styles.storeMap}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.4771387153073!2d-77.02249922473541!3d-12.147884888096932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7f2388aa439%3A0x906c625bbeb8e1a6!2sAv.%20Francisco%20Bolognesi%20302%2C%20Barranco%2015047!5e0!3m2!1ses-419!2spe!4v1773613069183!5m2!1ses-419!2spe"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <GeneralButton
                type="submit"
                size="large"
                className={styles.continueBtn}
              >
                Continuar al pago →
              </GeneralButton>
            </div>
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
