import styles from './Header.module.css'

export default function Overlay({ closeMobileMenu }) {
  return <div className={styles.overlay} onClick={closeMobileMenu}></div>
}
