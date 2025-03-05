import { Box, Card, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { isVideoContent } from '/src/utils/helper';

export const PortfolioSection = () => {
  return (
    //apply the gray gradient bg here
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        // background: 'linear-gradient(to bottom, rgb(230, 235, 240), rgb(200, 205, 210))',
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Portfolios{' '}
      </Typography>
      <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        spaceBetween={5}
      >
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioCard />
        </SwiperSlide>
      </SliderWrapper>
    </Box>
  );
};

const PortfolioCard = () => {
  return (
    <>
      <Card
        sx={{
          width: '100%',
          aspectRatio: '9 / 12',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#333',
          borderRadius: 'calc(0* var(--mui-shape-borderRadius))',
          // border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
          '&:hover .portfolio-card-overlay': {
            opacity: 1,
          },
        }}
        // onClick={() => setOpenPortfolioRightPanel(item)}
      >
        {isVideoContent('') ? (
          <Box
            component="video"
            src={''}
            // controls
            muted
            autoPlay
            loop
            draggable={false}
            playsInline
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        ) : (
          <Image
            // src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
            src={`https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57d588f4b57625814b04_67014a7ff7209b375680d65a_41199266_2086471245001489_187941219047833600_n.jpeg`}
            alt={'alt-image'}
            draggable={false}
            style={{
              objectFit: 'cover',
              filter: 'blur(20px)',
              transition: 'filter 0.2s ease-out',
            }}
            loading="lazy"
            sizes="100vw"
            fill={true}
            onLoad={(e) => {
              e.target.style.filter = 'blur(0px)';
            }}
          />
        )}
        <Stack
          direction="column"
          px={2}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            py: 1,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
          }}
        >
          <Typography fontWeight={600} color="var(--mui-palette-common-white)" fontSize={{ xs: 12, md: 14 }}>
            Project Title
          </Typography>
          <Stack direction={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'} mt={1}>
            <Typography variant="body" color="var(--mui-palette-common-white)" sx={{ fontSize: '12px' }}>
              Title
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
