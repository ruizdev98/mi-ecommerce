import React from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageCarousel.css'

export default function ImageCarousel({images}) {
  return (
    <div className="image-carousel">
      <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className='image-carousel__swiper'
      >
      {images.map((img, index) => (
        <SwiperSlide key={index} className='image-carousel__slide'>
            <img 
              src={img.src} 
              alt={img.alt} 
              className='image-carousel__image' />
          </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}
