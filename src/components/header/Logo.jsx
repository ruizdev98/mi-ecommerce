import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src="/logo.png" alt="Antonella Logo" />
      </Link>
    </div>
  )
}
