import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import styles from '../Header.module.css';

export default function Socials() {
  return (
    <div className={styles.socials}>
      <a href="#"><FontAwesomeIcon icon={faTiktok} className={styles.socialIcon} /></a>
      <a href="#"><FontAwesomeIcon icon={faYoutube} className={styles.socialIcon} /></a>
      <a href="#"><FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} /></a>
      <a href="#"><FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} /></a>
      <a href="#"><FontAwesomeIcon icon={faXTwitter} className={styles.socialIcon} /></a>
    </div>
  )
}
