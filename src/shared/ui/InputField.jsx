import './InputField.css';

export default function InputField({
  label,
  type = "text",
  name = "",
  placeholder = "",
  value,
  size = "medium",
  onChange,
  required = false,
  className = "",
}) {

  return (
    <div className={`input-group ${size}`}>
      {label && <label className='input-label'>{label}</label>}
      <input
        className={`input-field input-${size} ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}
