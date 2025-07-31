"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import styles from "./Slider.module.scss";

interface SliderProps {
  items: {
    id: string | number;
    imageUrl: string;
    title?: string;
    description?: string;
  }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  slidesToShow?: number;
}

export default function Slider({
  items,
  autoPlay = true,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className = "",
  slidesToShow = 5
}: SliderProps) {
  const swiperRef = useRef<any>(null);

  return (
    <div className={`${styles.slider} ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={16}
        slidesPerView={slidesToShow}
        loop={true}
        autoplay={autoPlay ? {
          delay: autoPlayInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false}
        navigation={showArrows}
        pagination={showDots ? {
          clickable: true,
          dynamicBullets: true
        } : false}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          1440: {
            slidesPerView: slidesToShow,
            spaceBetween: 16
          }
        }}
        className={styles.swiperContainer}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <div className={styles.slideImage}>
                <img src={item.imageUrl} alt={item.title || `Slide ${index + 1}`} />
              </div>
              {(item.title || item.description) && (
                <div className={styles.slideContent}>
                  {item.title && <h3>{item.title}</h3>}
                  {item.description && <p>{item.description}</p>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 