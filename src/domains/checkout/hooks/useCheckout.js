import { useNavigate } from "react-router-dom"
import { useCartContext } from "@/core/context/CartContext"
import { useCreateOrder } from "@/core/hooks/useCreateOrder"
import { getFinalUnitPrice } from "@/core/utils/pricing"

export function useCheckout() {
  const navigate = useNavigate()

  const {
    cartItems,
    subtotal,
    totalDiscount,
    totalPrice
  } = useCartContext()

  const { createOrder } = useCreateOrder()

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0)

  /* ================= BUILDER ================= */
  const buildOrderPayload = ({ deliveryMethod, shipping = null }) => ({
    deliveryMethod,
    totalItems,
    shipping,

    items: cartItems.map(item => {
      const unitPrice = Number(getFinalUnitPrice(item)) || 0
      const quantity = Number(item.quantity) || 1

      return {
        productId: Number(item.productId) ?? null,
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

  /* ================= EXECUTOR ================= */
  const createAndGoToPayment = async (payload) => {
    try {
      const order = await createOrder(payload)
      navigate(`/checkout/payment/${order.orderId}`)
    } catch (error) {
      console.error("❌ Error creando orden:", error)
      alert("No se pudo crear la orden")
    }
  }

  /* ================= METHODS ================= */

  const createDeliveryOrder = async ({ formData, documentType, ubigeo }) => {
    if (!cartItems.length) {
      throw new Error("El carrito está vacío")
    }

    const payload = buildOrderPayload({
      deliveryMethod: "home",
      shipping: {
        name: formData.name,
        lastname: formData.lastname,
        documentType,
        documentNumber: formData.documentNumber,
        phone: formData.phone,
        ubigeo,
        address: formData.address,
        reference: formData.reference
      }
    })

    return createAndGoToPayment(payload)
  }

  const createStoreOrder = async () => {
    if (!cartItems.length) {
      throw new Error("El carrito está vacío")
    }

    const payload = buildOrderPayload({
      deliveryMethod: "store"
    })

    return createAndGoToPayment(payload)
  }

  return {
    totalItems,
    createDeliveryOrder,
    createStoreOrder
  }
}