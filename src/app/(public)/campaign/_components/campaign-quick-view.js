'use client';

import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { isVideoContent, pxToRem } from '/src/utils/helper';

export const CampaignQuickView = ({ data }) => {
  const theme = useTheme();
  const mediaArr = [...(data?.image_gallery || []), ...(data?.video_gallery || [])];

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
              {data?.name || 'Untitled'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {data?.description || 'No description available.'}
            </Typography>
          </Box>
          <Button variant="contained">Join</Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Stack direction="column" spacing={2} mb={2} flexWrap="wrap">
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Current Status
          </Typography>
          <Chip label={data?.campaign_progress} size="small" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Stakeholder
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data?.stakeholder || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign Status
          </Typography>
          <Chip label={data?.campaign_status} size="small" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Start Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data.start_date ? dayjs(data?.start_date).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            End Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data?.start_date ? dayjs(data?.end_data).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Budget
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data.budget || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Total Expense
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data.total_expense || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign ROI
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {data.campaign_ROI || '-'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
