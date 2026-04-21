import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'
import styles from './SocialButton.module.css'

const ICONS = {
  facebook: faFacebookF,
  google: faGoogle,
  apple: faApple,
}

const COLORS = {
  facebook: "#1877f2",
  google: "#db4437",
  apple: "#000000",
}

export default function SocialButton({ socialType, onClick, loading = false }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={loading}
      aria-label={`Login with ${socialType}`}
    >
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <FontAwesomeIcon icon={ICONS[socialType]} style={{ color: COLORS[socialType] }} />
      )}
    </button>
  )
}
