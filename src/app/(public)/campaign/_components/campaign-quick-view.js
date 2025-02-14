'use client';

import Link from 'next/link';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { isVideoContent, pxToRem } from '@/utils/helper';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

export const CampaignQuickView = ({ data }) => {
  const theme = useTheme();
  const mediaArr = [...data.image_gallery, ...data.video_gallery];

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header Image with Overlay */}
      <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pauseOnHover
        spaceBetween={10}
      >
        {mediaArr.map((item, index) => (
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
                  objectFit: 'contain',
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                  border: '1px solid var(--mui-palette-divider)',
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
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: theme.palette.background.default, zIndex: 2 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data.title || 'Untitled'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {data.description || 'No description available.'}
            </Typography>
          </Box>
          <Button variant="contained">Join</Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <Typography variant="subtitle1" color="text.secondary">
          Category: {data.category || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Date: {data.date || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Location: {data.location || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Client: {data.client || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Photographer: {data.dp || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Model: {data.model || 'N/A'}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {data.full_description || 'No additional details available.'}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Team
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" component={Link} href={data.team?.stylist || ''}>
        Stylist: {data.team?.stylist || 'N/A'}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Makeup Artist: {data.team?.makeupArtist || 'N/A'}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Creative Director: {data.team?.creativeDirector || 'N/A'}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Social Engagement
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Views: {data.engagementStats?.views || 0}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Likes: {data.engagementStats?.likes || 0}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Shares: {data.engagementStats?.shares || 0}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Testimonial
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {data.testimonial || 'No testimonial available.'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={1} sx={{ mt: 2 }} columns={{ xs: 10 }}>
        {data?.gallery?.map((item, index) => (
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
                sx={{ height: pxToRem(300), width: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Box component="img" src={item} sx={{ height: pxToRem(300), width: '100%', objectFit: 'cover' }} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
