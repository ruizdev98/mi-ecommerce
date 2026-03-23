import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from "react-router-dom"
import { useCartContext } from "@/core/context/CartContext"
import useIsMobile from "@/core/hooks/useIsMobile"
import styles from "./FloatingCartButton.module.css"

export default function FloatingCartButton() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { totalItems } = useCartContext()
    const isMobile = useIsMobile()

    // 🔥 NO renderiza en desktop
    if (!isMobile || pathname.includes("/checkout")) return null

  return (
    <button
      className={styles.floatingCart}
      onClick={() => navigate("/checkout/cart")}
    >
        <FontAwesomeIcon icon={faBagShopping} />
        {totalItems > 0 && (<span className={styles.badge}>{totalItems}</span>)}
    </button>
  )
}
