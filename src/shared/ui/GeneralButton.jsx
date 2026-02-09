import './GeneralButton.css';

export default function GeneralButton({
  children,
  variant = "primary", // primary | secondary
  size = "medium",     // small | medium | large
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
        type={type}
        className={`btn btn-${variant} btn-${size} ${className}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
  )
}
