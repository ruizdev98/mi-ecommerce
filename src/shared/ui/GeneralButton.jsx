import styles from './GeneralButton.module.css'

export default function GeneralButton({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
        type={type}
        className={`
          ${styles.btn}
          ${styles[variant]}
          ${styles[size]}
          ${className}
        `}
        onClick={onClick}
        disabled={disabled}
    >
      {children}
    </button>
  )
}
