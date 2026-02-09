import { useEffect } from "react"
import { useCartContext } from "@/core/context/CartContext"
import { useSearchParams } from "react-router-dom"

export default function CheckoutSuccess() {

    const { clearCart } = useCartContext()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const orderId = localStorage.getItem("lastOrderId")

        if (!orderId) {
        setError("No se encontró la orden")
        setLoading(false)
        return
        }

        const confirmPayment = async () => {
            try {
                const res = await fetch(
                `${import.meta.env.VITE_API_URL}/orders/${orderId}`
                )

                if (!res.ok) {
                throw new Error("Error consultando la orden")
                }

                const order = await res.json()

                if (order.status === "paid") {
                clearCart()
                localStorage.removeItem("lastOrderId")
                } else {
                setError("El pago aún no está confirmado")
                }
            } catch (err) {
                setError("No se pudo confirmar el pago")
            } finally {
                setLoading(false)
            }
        }

        confirmPayment()
    }, [clearCart])

    if (loading) return <h1>Confirmando pago...</h1>
    if (error) return <h1>{error}</h1>

  return (
    <h1>¡Pago exitoso! 🎉</h1>
  )
}
