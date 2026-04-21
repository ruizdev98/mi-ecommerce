import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import GeneralButton from "@/shared/ui/GeneralButton"
import styles from "../ShippingPage.module.css"

export default function StorePickupInfo({ onContinue }) {

  return (
    <div>
        <div>
            <p><FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} /> <strong>Dirección:</strong></p>
            <p>Av. Francisco Bolognesi 302, Barranco</p><br />
            <p><FontAwesomeIcon icon={faClock} className={styles.clockIcon} /> <strong>Horario de atención:</strong></p>
            <p>Lunes a Viernes de 08:00am a 18:00pm.</p><br />
        </div>
        <div className={styles.storeMap}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.4771387153073!2d-77.02249922473541!3d-12.147884888096932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7f2388aa439%3A0x906c625bbeb8e1a6!2sAv.%20Francisco%20Bolognesi%20302%2C%20Barranco%2015047!5e0!3m2!1ses-419!2spe!4v1773613069183!5m2!1ses-419!2spe"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
        <GeneralButton
            size="large"
            className={styles.continueBtn}
            onClick={onContinue}
        >
            Continuar al pago →
        </GeneralButton>
    </div>
  )
}
