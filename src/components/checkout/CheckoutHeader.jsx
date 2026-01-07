import { useLocation } from "react-router-dom"
import Logo from "../header/Logo"
import styles from "./CheckoutHeader.module.css"

export default function CheckoutHeader() {

    const { pathname } = useLocation()

    const steps = [
        { id: 1, label: "Carrito", path: "/carrito" },
        { id: 2, label: "Entrega", path: "/shipping" },
        { id: 3, label: "Pago", path: "/payment" },
    ]

    const currentStep = steps.find(step => pathname.includes(step.path))?.id || 1

  return (
    <header className={styles.header}>
      <div className={`container ${styles.top}`}>
        {/* LOGO */}
        <Logo />

        {/* PASOS */}
        <div className={styles.steps}>
          {steps.map(step => (
            <div key={step.id} className={styles.step}>
              <div
                className={`${styles.circle} ${
                  step.id <= currentStep ? styles.active : ""
                }`}
              ></div>

              <span
                className={`${styles.label} ${
                  step.id <= currentStep ? styles.activeText : ""
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
