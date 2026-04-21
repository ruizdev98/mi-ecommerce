import GeneralButton from '@/shared/ui/GeneralButton'
import styles from './ParallaxBanner.module.css'

export default function ParallaxBanner({ title, buttonText, logoSrc, backgroundUrl}) {
  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <div className={styles.content}>
            <img src={logoSrc} alt="Logo" className={styles.logo}/>
            <h2 className={styles.title}>{title}</h2>
            <GeneralButton 
              variant="secondary"
              className={styles.btn}
            >
              {buttonText}
            </GeneralButton>
        </div>
    </section>
  )
}
