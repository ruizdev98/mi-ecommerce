import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../header/Logo"
import styles from "./CheckoutHeader.module.css"

export default function CheckoutHeader() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const steps = [
      { id: 1, label: "Carrito", path: "/carrito" },
      { id: 2, label: "Entrega", path: "/shipping" },
      { id: 3, label: "Pago", path: "/payment" },
  ]

  const currentStep = steps.find(step => pathname.includes(step.path))?.id || 1

  const canGoBack = (stepId) => {
    return currentStep === 2 && stepId < currentStep
  }

  const handleClick = (step) => {
    if (canGoBack(step.id)) {
      navigate(step.path)
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.top}`}>
        {/* LOGO */}
        <Logo />

        {/* PASOS */}
        <div className={styles.steps}>
          {steps.map((step, index) => {
            const isActive = step.id <= currentStep
            const isClickable = canGoBack(step.id)

            return (
              <div key={step.id} className={styles.stepWrapper}>
                <div className={styles.step}>
                  {/* 🔥 CÍRCULO */}
                  <div
                    onClick={() => handleClick(step)}
                    className={`
                      ${styles.circle}
                      ${isActive ? styles.active : ""}
                      ${isClickable ? styles.clickable : ""}
                    `}
                  />
                  {/* 🔥 TEXTO */}
                  <span
                    className={`
                      ${styles.label}
                      ${isActive ? styles.activeText : ""}
                      ${isClickable ? styles.clickableText : ""}
                    `}
                    onClick={() => handleClick(step)}
                  >
                    {step.label}
                  </span>
                </div>

                {/* 🔥 LÍNEA PUNTEADA */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      ${styles.dottedLine}
                      ${index < currentStep - 1 ? styles.activeLine : ""}
                    `}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
