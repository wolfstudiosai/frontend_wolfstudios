import React from 'react';

import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { isSupabaseUrl, isVideoContent, pxToRem } from '/src/utils/helper';

export const SpaceQuickView = ({ data }) => {
    const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header Image with Overlay */}
      <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.secondary">
          Gallery
        </Typography>
      <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pauseOnHover
        // speed={2000}
        spaceBetween={10}
      >
        {data?.Gallery?.map((item, index) => (
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
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
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
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </SliderWrapper>

      {/* Project Details */}

      <Box
        mt={3}
        width="100%"
        sx={{ 
          position: 'sticky', 
          top: 0, 
          left: 0, 
          backgroundColor: theme.palette.background.default, 
          zIndex: 2 
        }}
      >
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" color="text.secondary" fontWeight={'bold'} mb={1} >
          {data?.Name || 'No title available.'}
        </Typography>

        <Stack direction="column" spacing={1} mb={2}>
          {/* Category */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              Category:
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data?.ByTagsSpaces?.map((item) => item?.ByTags?.Name)?.join(', ') || 'N/A'}
            </Typography>
          </Stack>

          {/* State */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              State:
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data?.ByStatesSpaces?.map((item) => item?.ByStates?.Name)?.join(', ') || 'N/A'}
            </Typography>
          </Stack>

          {/* Features */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              Features:
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data?.Features?.map((item) => item)?.join(', ') || 'N/A'}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          {data?.Projectsinglepagefulldescription || 'No description available.'}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      {/* Gallery Images */}
      <>
        <Typography variant="subtitle1" fontWeight="bold" mt={3} color="text.secondary" sx={{ display:'none' }}>
          Vertical Gallery
        </Typography>
        <Grid container spacing={1} sx={{ mt: 2 , display:'none' }} columns={{ xs: 10 }}>
          {data.VerticalImageGallery?.map((item, index) => (
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
                    height: pxToRem(300),
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
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
                    borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </>

      <>
        <Typography variant="subtitle1" fontWeight="bold" mt={3} color="text.secondary" sx={{ display:'none' }}>
          Horizontal Gallery
        </Typography>
        <Grid container spacing={1} sx={{ mt: 2 }} columns={{ xs: 10 }}>
          {data.HorizontalImageGallery?.map((item, index) => (
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
                    borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
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
                    borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
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
}