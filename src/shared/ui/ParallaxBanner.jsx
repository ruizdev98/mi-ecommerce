import Button from '@/shared/ui/Button'
import './ParallaxBanner.css'

export default function ParallaxBanner({ title, buttonText, logoSrc, backgroundUrl}) {
  return (
    <section className='parallax-banner' style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <div className='parallax-banner__content'>
            <img src={logoSrc} alt="Logo" className='parallax-banner__logo'/>
            <h2 className='parallax-banner__title'>{title}</h2>
            <Button 
              variant="secondary"
              className="parallax-banner__btn"
            >
              {buttonText}
            </Button>
        </div>
    </section>
  )
}
