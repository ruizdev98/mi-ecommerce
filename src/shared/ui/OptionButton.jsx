import styles from "./OptionButton.module.css"

export default function OptionButton({
    variant = "size",        // "color" | "size"
    value,                // hex color o texto
    isActive = false,
    onClick,
    disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        ${styles.base}
        ${styles[variant]}
        ${isActive ? styles.active : ""}
      `}
      style={variant === "color" ? { backgroundColor: value } : {}}
    >
      {variant === "size" && value}
    </button>
  )
}
