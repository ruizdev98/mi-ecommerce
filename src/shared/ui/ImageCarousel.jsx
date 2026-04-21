import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './ImageCarousel.module.css'

export default function ImageCarousel({images}) {
  return (
    <div className={styles.carousel}>
      <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className={styles.swiper}
      >
      {images.map((img, index) => (
        <SwiperSlide key={index} className={styles.slide}>
            <img 
              src={img.src} 
              alt={img.alt} 
              className={styles.image} />
          </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}
