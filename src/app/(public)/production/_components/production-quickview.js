'use client';

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { isVideoContent, pxToRem } from '/src/utils/helper';
import { isSupabaseUrl } from '../../../../utils/helper';

export const ProductionQuickView = ({ data }) => {
  console.log(data)
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          height: 'calc(100vh - 148px)',
          overflow: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          pb: 2,
        }}
      >
        <Box sx={{ backgroundColor: 'var(--mui-palette-background-paper)', mb: 1, p: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Image Inspiration
          </Typography>
          <Box sx={{ px: 2 }}>
            <SliderWrapper
              modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pauseOnHover
              spaceBetween={1.8}
              sx={{
                '& .swiper-wrapper': {
                  gap: '1.8px',
                },
                '& .swiper-slide': {
                  width: 'auto !important',
                  marginRight: '0 !important',
                  height: 'auto',
                },
                mx: { xs: -1.5, md: -2 },
              }}
            >
              {data?.imageInspiration?.map((item, index) => (
                <SwiperSlide key={index}>
                  {isVideoContent(item) ? (
                    <Box
                      component="video"
                      src={item}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      sx={{
                        height: pxToRem(500),
                        width: '100%',
                        objectFit: 'contain',
                        border: '1px solid var(--mui-palette-divider)',
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={item}
                      sx={{
                        height: pxToRem(500),
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </SwiperSlide>
              ))}
            </SliderWrapper>
          </Box>
        </Box>

        <Box
          width="100%"
          sx={{
            position: 'sticky',
            top: 0,
            left: 0,
            backgroundColor: 'var(--mui-palette-background-paper)',
            zIndex: 2,
            p: 2,
          }}
        >
          <Typography variant="subtitle1" color="text.secondary" fontWeight={'bold'}>
            {data?.name}
          </Typography>
          {/* <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Category:{' '}
              {data?.PortfolioCategoriesPortfolios?.map((item) => item?.PortfolioCategories?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              State: {data?.ByStatesPortfolios?.map((item) => item?.ByStates?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Partner HQ: {data?.PartnerHQPortfolios?.map((item) => item?.PartnerHQ?.Name)?.join(', ') || 'N/A'}
            </Typography>
          </Stack> */}

          <Typography variant="body1">
            {data?.internalNotes || 'No internal notes available.'}
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: 'var(--mui-palette-background-paper)', my: 1, p: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Video Inspiration
          </Typography>
          <Grid container spacing={0} sx={{ mt: 1 }}>
            {data?.videoInspiration?.map((item, index) => (
              <Grid item size={{ xs: 2 }} key={index}>
                {isVideoContent(item) ? (
                  <Box
                    component="video"
                    src={item}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                      height: pxToRem(200),
                      width: '100%',
                      objectFit: 'contain',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={isSupabaseUrl(item) ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item}` : item}
                    sx={{
                      height: '100%',
                      width: pxToRem(200),
                      objectFit: 'contain',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
