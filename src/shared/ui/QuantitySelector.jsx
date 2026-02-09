import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './QuantitySelector.module.css'

export default function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 10,
    size = 'lg',
}) {
    const decrement = () => {
        if (value > min) onChange(value - 1)
    }

    const increment = () => {
        if (value < max) onChange(value + 1)
    }
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
        <button
            onClick={decrement}
            disabled={value <= min}
            aria-label="Disminuir cantidad"
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className={styles.value}>{value}</span>
        <button
            onClick={increment}
            disabled={value >= max}
            aria-label="Aumentar cantidad"
        >
            <FontAwesomeIcon icon={faPlus} />
        </button>
    </div>
  )
}
