import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import InputField from "@/shared/ui/InputField";
import GeneralButton from '@/shared/ui/GeneralButton'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='container footer__container'>
            <div className='footer__top'>
                <img src="/logo.png" alt="Antonella Logo" className='footer__logo'/>
                <div className='footer__socials'>
                    <a href="#" className='footer__social-link'>
                        <FontAwesomeIcon icon={faTiktok} className='footer__social-icon' />
                    </a>
                    <a href="#" className='footer__social-link'>
                        <FontAwesomeIcon icon={faYoutube} className='footer__social-icon' />
                    </a>
                    <a href="#" className='footer__social-link'>
                        <FontAwesomeIcon icon={faInstagram} className='footer__social-icon' />
                    </a>
                    <a href="#" className='footer__social-link'>
                        <FontAwesomeIcon icon={faFacebook} className='footer__social-icon' />
                    </a>
                    <a href="#" className='footer__social-link'>
                        <FontAwesomeIcon icon={faXTwitter} className='footer__social-icon' />
                    </a>
                </div>
            </div>
            <div className='footer__section'>
                <h5 className='footer__section-title'>Información</h5>
                <ul className='footer__list'>
                    <li><a href="#" className='footer__link'>Quiénes somos</a></li>
                    <li><a href="#" className='footer__link'>Contacto</a></li>
                    <li><a href="#" className='footer__link'>Términos y Condiciones</a></li>
                </ul>
            </div>
            <div className='footer__section'>
                <h5 className='footer__section-title'>Contacto</h5>
                <ul className='footer__list'>
                    <li>
                        <a href="#" className='footer__link'>
                            <FontAwesomeIcon icon={faLocationDot} className='footer__icon'/>
                            Av. Francisco Bolognesi 302, Barranco
                        </a>
                    </li>
                    <li>
                        <a href="#" className='footer__link'>
                            <FontAwesomeIcon icon={faPhone} className='footer__icon'/>
                            +51 966428394
                        </a>
                    </li>
                    <li>
                        <a href="#" className='footer__link'>
                            <FontAwesomeIcon icon={faEnvelope} className='footer__icon'/>
                            developer.ruiz@gmail.com
                        </a>
                    </li>
                    <li>
                        <a href="#" className='footer__link'>
                            <FontAwesomeIcon icon={faClock} className='footer__icon'/>
                            Lun a Vie 08:00 a 18:00hrs
                        </a>
                    </li>
                </ul>
            </div>
            <div className='footer__section'>
                <h5 className='footer__section-title'>Newsletter</h5>
                <p className='footer__text'>
                    Sé el primero en enterarte de nuestras nuevas colecciones, 
                    ventas especiales y beneficios exclusivos.
                </p>
                <div className='footer__newsletter'>
                    <InputField
                        type="email"
                        placeholder="Correo"
                        className="footer__newsletter-input"
                    />
                    <GeneralButton Button className="footer__newsletter-button">
                        Enviar
                    </GeneralButton>
                </div>
            </div>
            <div className='footer__payment'>
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/paypal_ntrcbn.png' 
                    alt='Paypal' 
                    className='footer__payment-icon' 
                />
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/yape_jvpktf.png' 
                    alt='Yape' 
                    className='footer__payment-icon' 
                />
                <img 
                    src='https://res.cloudinary.com/dmvsu33ya/image/upload/v1754767046/plin_jvwf5n.png' 
                    alt='Plin' 
                    className='footer__payment-icon' 
                />
            </div>
            <div className='footer__bottom'>
                <p className='footer__copy'>© 2025 ANTONELLA. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  )
}
