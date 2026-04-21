import SectionTitle from '@/shared/ui/SectionTitle'
import GeneralButton from '@/shared/ui/GeneralButton'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './BlogSection.module.css'

export default function BlogSection({ title, blogs }) {
    const [mounted, setMounted] = useState(false)
    const [showNav, setShowNav] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])

    const swiperParams = {
        modules: [Navigation],
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
        slidesPerView: 1,
        loop: true,
        breakpoints: {
            384:  { slidesPerView: 2 }, // >= 384px -> 2
            768:  { slidesPerView: 3 }, // >= 768px -> 3
            996:  { slidesPerView: 4 }  // >= 995px -> 4
        },
        onSwiper: (swiper) => {
            const currentSlidesPerView = swiper.params.slidesPerView
            setShowNav(blogs.length > currentSlidesPerView)
        },
        onResize: (swiper) => {
            const currentSlidesPerView = swiper.params.slidesPerView
            setShowNav(blogs.length > currentSlidesPerView)
        }
    }

    if (!mounted) return (
        <section className={`container ${styles.blogSection}`}>
            <SectionTitle title={title} />
        </section>
    );

  return (
    <section className={`container ${styles.blogSection}`}>
        <SectionTitle title={title} />

        <div className={styles.sliderWrapper}>
            <Swiper {...swiperParams} className={styles.slider}>
            {blogs.map(post => (
                <SwiperSlide key={post.id}>
                <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                    <a href="#">
                        <img src={post.image} alt={post.title} className={styles.image} />
                    </a>
                    </div>

                    <div className={styles.details}>
                    <div className={styles.content}>
                        <a href="#">
                        <h4 className={styles.title}>{post.title}</h4>
                        <p className={styles.text}>{post.text}</p>
                        </a>
                    </div>

                    <GeneralButton
                        size="small"
                        className={styles.btn}
                    >
                        Ver más
                    </GeneralButton>
                    </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>

            <div
                className="swiper-button-prev-custom"
                style={{ display: showNav ? 'flex' : 'none' }}
            >
                &#8249;
            </div>

            <div
                className="swiper-button-next-custom"
                style={{ display: showNav ? 'flex' : 'none' }}
            >
                &#8250;
            </div>
        </div>
    </section>
  )
}
