'use client';

import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { IconText } from '@/components/utils/icon-text';
import { isVideoContent, pxToRem } from '@/utils/helper';
import { Avatar, Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

export const ContentQuickView = ({ data }) => {
  const theme = useTheme();
  const mediaArr = [...(data?.image_gallery || []), ...(data?.video_gallery || [])];

  return (
    <Box sx={{ position: 'relative' }}>
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
      <Stack direction="column" justifyContent="space-between" gap={2} sx={{ p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">{data.title}</Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar />
            <Box>
              <Typography variant="subtitle2">{data.stakeholder}</Typography>
              <Stack>
                <IconText icon="solar:calendar-linear" text={dayjs(data?.created_at).format('MMM D, YYYY')} />
              </Stack>
            </Box>
          </Stack>
          <Typography variant="body2">{data.posting_quality}</Typography>
          <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
            {data?.product &&
              data?.product.split(',').map((tag) => <Chip key={tag} size="small" variant="soft" label={tag} />)}
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <IconText icon="hugeicons:instagram" text={data.IG_view} />
          <IconText icon="hugeicons:youtube" text={data.partner_YT_view} />
          <IconText icon="basil:pinterest-outline" text={data.pinterest_view} />
        </Stack>
      </Stack>
    </Box>
  );
};
