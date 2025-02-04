'use client';

import React from 'react';
import Image from 'next/image';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { getRandomColor } from '@/utils/utils';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioSliderItem } from './portfolio-slider-item';
import { isVideoContent } from '@/helper/common';

export const PortfolioGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
  const slider_data = data.filter((item) => item.featured);
  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <SliderWrapper
          modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pauseOnHover
          speed={2000}
          spaceBetween={10}
        >
          {slider_data.map((item, index) => (
            <SwiperSlide key={index}>
              <PortfolioSliderItem item={item} index={index} fetchList={fetchList} />
            </SwiperSlide>
          ))}
        </SliderWrapper>
      </Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={1} columns={{ xs: 28 }} sx={{ mt: 2 }}>
          {data.map((portfolio, index) => (
            <Grid item size={{ xs: 12, md: colums }} key={index}>
              <PortfolioCard item={portfolio} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

const PortfolioCard = ({ item, fetchList }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          aspectRatio: '9 / 12',
          borderRadius: 2,
          border: 'unset',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#333',
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
          '&:hover .portfolio-card-overlay': {
            opacity: 1,
          },
        }}
        onClick={(e) => {
          setOpenPortfolioRightPanel(item);
        }}
      >
        {isVideoContent(item.thumbnail || '') ? (
          <Box
            component="video"
            src={item.thumbnail}
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
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
            alt={item.title}
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
            {item.project_title}
          </Typography>
          <Typography variant="body" color="var(--mui-palette-common-white)" sx={{ fontSize: '12px' }}>
            {item.state}
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              mt: 1,
            }}
          >
            {item?.category &&
              item?.category
                ?.split(',')
                .map((category, index) => (
                  <Chip
                    key={index}
                    label={category.trim()}
                    size="small"
                    sx={{ backgroundColor: getRandomColor(), fontSize: '10px', py: '2px' }}
                  />
                ))}
          </Box>
        </Stack>
        {/* <Stack
          direction="row"
          justifyContent={'flex-end'}
          sx={{ position: 'absolute', top: 20, right: 10, width: '100%' }}
        >
          <AvatarGroup
            spacing={'small'}
            total={42}
            sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, mb: 0.5 } }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </AvatarGroup>
        </Stack> */}
        <ManagePortfolioRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openPortfolioRightPanel ? true : false}
          data={openPortfolioRightPanel}
          onClose={() => setOpenPortfolioRightPanel(false)}
        />
      </Card>
    </>
  );
};
