import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import styles from "./ShippingPage.module.css"

export default function DeliveryMethod({ deliveryMethod, setDeliveryMethod }) {

    const isHomeDelivery = deliveryMethod === "home"

  return (
    <div className={styles.deliveryOptions}>
        
        <label
            className={`${styles.deliveryCard} ${isHomeDelivery ? styles.active : ""}`}
        >
            <input
                type="radio"
                checked={isHomeDelivery}
                onChange={() => setDeliveryMethod("home")}
            />
            <div className={styles.cardContent}>
                <span className={styles.icon}><FontAwesomeIcon icon={faTruckFast} /></span>
                <span>Envío a domicilio</span>
            </div>
            <span className={styles.check}></span>
        </label>

        <label
            className={`${styles.deliveryCard} ${!isHomeDelivery ? styles.active : ""}`}
        >
            <input
                type="radio"
                checked={!isHomeDelivery}
                onChange={() => setDeliveryMethod("store")}
            />
            <div className={styles.cardContent}>
                <span className={styles.icon}><FontAwesomeIcon icon={faStore} /></span>
                <span>Retiro en tienda</span>
            </div>
            <span className={styles.check}></span>
        </label>

    </div>
  )
}
