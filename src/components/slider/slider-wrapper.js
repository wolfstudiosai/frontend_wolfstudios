'use client';

import React from 'react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Box } from '@mui/material';
import { Swiper } from 'swiper/react';

export const SliderWrapper = ({
  children,
  loop = true,
  autoplay = { delay: 3000, disableOnInteraction: false },
  spaceBetween = 50,
  slidesPerView = 3,
  navigation = false,
  pauseOnHover = false,
  ...restProps
}) => {
  const swiperRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (pauseOnHover && swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;
  };

  return (
    <Box sx={{ overflow: 'hidden' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        loop={loop}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        onSwiper={handleSwiper}
        {...restProps}
      >
        {children}
      </Swiper>
    </Box>
  );
};
