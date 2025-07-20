'use client';

import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { isSupabaseUrl, isVideoContent, pxToRem } from '/src/utils/helper';

export const PortfolioQuickView = ({ data, isEdit }) => {
  const theme = useTheme();
  const mediaArr = [data?.thumbnailImage];
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header Image with Overlay */}
      <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.secondary">
        Vertical Gallery
      </Typography>
      <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pauseOnHover
        spaceBetween={4}
      >
        <SwiperSlide>
          {mediaArr.length > 0 ? (
            mediaArr?.map((item, index) => (
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
                    src={item || '/assets/image-placeholder.jpg'}
                    sx={{
                      height: pxToRem(500),
                      width: '100%',
                      objectFit: 'contain',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <Typography>No media available!</Typography>
          )}
        </SwiperSlide>
      </SliderWrapper>

      {/* Project Details */}

      <Box
        mt={3}
        width="100%"
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: theme.palette.background.default, zIndex: 2 }}
      >
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" color="text.secondary" fontWeight={'bold'}>
          {data?.projectTitle}
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Typography variant="subtitle1" color="text.secondary">
            Category: {data?.portfolioCategories?.map((item) => item?.name)?.join(', ') || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            State: {data?.states?.map((item) => item?.name)?.join(', ') || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Partner HQ: {data?.partnerHQ?.map((item) => item?.name)?.join(', ') || 'N/A'}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">{data?.projectSinglePageFullDescription || 'No description available.'}</Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      {/* Gallery Images */}
      <>
        <Typography variant="subtitle1" fontWeight="bold" mt={3} color="text.secondary" sx={{ display: 'none' }}>
          Vertical Gallery
        </Typography>
        <Grid container spacing={1} sx={{ mt: 2, display: 'none' }} columns={{ xs: 10 }}>
          {data.verticalImageGallery?.map((item, index) => (
            <Grid size={{ xs: 2 }} key={index}>
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
                    height: pxToRem(300),
                    width: '100%',
                    objectFit: 'contain',
                    // borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={isSupabaseUrl(item) ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item}` : item}
                  sx={{
                    height: pxToRem(300),
                    width: '100%',
                    objectFit: 'contain',
                    // borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </>

      <>
        <Typography variant="subtitle1" fontWeight="bold" mt={3} color="text.secondary">
          Horizontal Gallery
        </Typography>
        <Grid container spacing={0} sx={{ mt: 2 }} columns={{ xs: 10 }}>
          {data.horizontalImageGallery?.map((item, index) => (
            <Grid size={{ xs: 2 }} key={index}>
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
                    // borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
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
                    // borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </>
    </Box>
  );
};
