import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCartContext } from '@/core/context/CartContext'
import OrderItemsList from '../ui/OrderItemsList'
import OrderSummary from '../ui/OrderSummary'
import api from '@/core/api/api'
import styles from './PaymentPage.module.css'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const { clearCart, setHasPendingOrder } = useCartContext()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`)
        setOrder(data)
      } catch (error) {
        console.error(error)
        navigate("/")
      } finally {
        setLoading(false)
      }
    }
    if (orderId) fetchOrder()
  }, [orderId, navigate])

  // 🟢 PAGAR (luego conectamos pasarela)
  const handlePay = async () => {
  try {
    const { data } = await api.post("/payments/mercadopago", {
      orderId
    })

    if (!data.paymentUrl) {
      throw new Error("No se recibió paymentUrl")
    }

    // ⭐ GUARDAR orderId para success
    localStorage.setItem("lastOrderId", orderId)
    
    // Redirigir a Mercado Pago
    window.location.href = data.paymentUrl

  } catch (error) {
    console.error("❌ Error iniciando pago:", error)
    alert("No se pudo iniciar el pago")
  }
}

  // 🔴 CANCELAR ORDEN
  const handleCancelOrder = async () => {
    try {
      await api.put(`/orders/${orderId}/cancel`)
      // 🧹 limpiar carrito
      clearCart()
      // 🔓 desbloquear carrito
      setHasPendingOrder(false)
      // 🚀 volver al inicio
      navigate("/")
    } catch (error) {
      console.error("Error al cancelar la orden:", error)
      alert("No se pudo cancelar la compra")
    }
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>
  if (!order) return null

  return (
    <div className="container">
      <h2 className={styles.title}>Confirmar y pagar</h2>

      <div className={styles.layout}>
        {/* 🟢 IZQUIERDA */}
        <div className={styles.left}>
          <OrderItemsList items={order.items} />
        </div>

        {/* 🟡 DERECHA */}
        <aside className={styles.right}>
          <OrderSummary
            cartItems={order.items}
            totalItems={order.totalItems}
            subtotal={order.subtotal}
            totalDiscount={order.discount}
            totalPrice={order.total}
            showDelivery={order.deliveryMethod === 'home'}
            deliveryCost={order.deliveryCost}
            showGeneralButton={true}
            generalButtonText="Pagar ahora"
            onButtonClick={handlePay}
            showCancelButton={true}
            cancelButtonText="Cancelar compra"
            onCancelClick={handleCancelOrder}
          />
          {/* DIRECCIÓN */}
          {order.deliveryMethod === "home" ? (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Dirección de Entrega</h3>
              <div className={styles.divider} />
              <p className={styles.userName}>{order.shipping?.name} {order.shipping?.lastname}</p>
              <p className={styles.userAddress}>Dirección: {order.shipping?.address}</p>
              <p className={styles.userReference}>Referencia: {order.shipping?.reference}</p>
              <p className={styles.userPhone}><FontAwesomeIcon icon={faPhone} />{order.shipping?.phone}</p>
            </section>
          ):(
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Retiro en tienda</h3>
              <div className={styles.divider} />
              <p className={styles.userAddress}>Dirección: Av. Francisco Bolognesi 302, Barranco.</p>
              <p className={styles.userReference}>Horario de atención: Lun a Vie 08:00 - 18:00hrs</p>
            </section>
          )}
          
        </aside>
      </div>
    </div>
  )
}
