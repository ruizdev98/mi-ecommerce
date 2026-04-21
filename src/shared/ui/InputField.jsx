import styles from './InputField.module.css'

export default function InputField({
  label,
  type = "text",
  name = "",
  placeholder = "",
  value,
  size = "medium",
  onChange,
  required = false,
  disabled = false,
  maxLength,
  className = "",
}) {

  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`
          ${styles.input}
          ${styles[size]}
          ${className}
        `}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
      />
    </div>
  )
}
