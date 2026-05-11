import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/shared/ui/InputField'
import GeneralButton from '@/shared/ui/GeneralButton'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
            <div className={styles.footerTop}>
                <img src="/logo.png" alt="Antonella Logo" className={styles.footerLogo}/>
                <div className={styles.footerSocials}>
                    <a href="#" className={styles.footerSocialLink}>
                        <FontAwesomeIcon icon={faTiktok} className={styles.footerSocialIcon} />
                    </a>
                    <a href="#" className={styles.footerSocialLink}>
                        <FontAwesomeIcon icon={faYoutube} className={styles.footerSocialIcon} />
                    </a>
                    <a href="#" className={styles.footerSocialLink}>
                        <FontAwesomeIcon icon={faInstagram} className={styles.footerSocialIcon} />
                    </a>
                    <a href="#" className={styles.footerSocialLink}>
                        <FontAwesomeIcon icon={faFacebook} className={styles.footerSocialIcon} />
                    </a>
                    <a href="#" className={styles.footerSocialLink}>
                        <FontAwesomeIcon icon={faXTwitter} className={styles.footerSocialIcon} />
                    </a>
                </div>
            </div>
            <div className={styles.footerSection}>
                <h5 className={styles.footerSectionTitle}>Información</h5>
                <ul className={styles.footerList}>
                    <li><a href="#" className={styles.footerLink}>Quiénes somos</a></li>
                    <li><a href="#" className={styles.footerLink}>Contacto</a></li>
                    <li><a href="#" className={styles.footerLink}>Términos y Condiciones</a></li>
                </ul>
            </div>
            <div className={styles.footerSection}>
                <h5 className={styles.footerSectionTitle}>Contacto</h5>
                <ul className={styles.footerList}>
                    <li>
                        <a href="#" className={styles.footerLink}>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.footerIcon} />
                            Av. Francisco Bolognesi 302, Barranco
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.footerLink}>
                            <FontAwesomeIcon icon={faPhone} className={styles.footerIcon}/>
                            +51 966428394
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.footerLink}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.footerIcon}/>
                            developer.ruiz@gmail.com
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.footerLink}>
                            <FontAwesomeIcon icon={faClock} className={styles.footerIcon}/>
                            Lun a Vie 08:00 a 18:00hrs
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.footerSection}>
                <h5 className={styles.footerSectionTitle}>Newsletter</h5>
                <p className={styles.footerText}>
                    Sé el primero en enterarte de nuestras nuevas colecciones, 
                    ventas especiales y beneficios exclusivos.
                </p>
                <div className={styles.footerNewsletter}>
                    <InputField
                        type="email"
                        placeholder="Correo"
                        className={styles.footerNewsletterInput}
                    />
                    <GeneralButton className={styles.footerNewsletterButton}>
                        Enviar
                    </GeneralButton>
                </div>
            </div>
            <div className={styles.footerPayment}>
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/paypal_ntrcbn.png' 
                    alt='Paypal' 
                    className={styles.footerPaymentIcon} 
                />
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/yape_jvpktf.png' 
                    alt='Yape' 
                    className={styles.footerPaymentIcon}
                />
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/plin_jvwf5n.png' 
                    alt='Plin' 
                    className={styles.footerPaymentIcon}
                />
            </div>
            <div className={styles.footerBottom}>
                <p className={styles.footerCopy}>© 2025 ANTONELLA. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  )
}
