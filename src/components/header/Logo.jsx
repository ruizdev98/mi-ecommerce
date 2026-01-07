import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

export default function Logo({ className = "" }) {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Link to="/">
        <img src="/logo.png" alt="Antonella Logo" />
      </Link>
    </div>
  )
}
