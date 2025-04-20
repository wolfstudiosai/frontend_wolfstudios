'use client';

import Image from 'next/image';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { isVideoContent, pxToRem } from '/src/utils/helper';

export const CampaignQuickView = ({ data }) => {
  const theme = useTheme();
  const mediaArr = [...(data?.ImageInspirationGallery || []), ...(data?.VideoInspirationGallery || [])];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        my={1}
        p={2}
        width="100%"
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: 'var(--mui-palette-background-paper)', zIndex: 2 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data?.Name || 'Untitled'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {data?.CampaignDescription || 'No description available.'}
            </Typography>
          </Box>
          <Button variant="contained">Join</Button>
        </Stack>
      </Box>

      <Box p={2} backgroundColor="var(--mui-palette-background-paper)">
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
        </SliderWrapper>
      </Box>

      {/* add further design from here */}
      <Grid container spacing={2} mt={1} sx={{ bgcolor: 'var(--mui-palette-background-paper)', p: 2 }}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ bgcolor: 'var(--mui-palette-background-default)', border: '1px solid var(--mui-palette-divider)', p: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              CAMPAIGN INFO
            </Typography>
            <Stack spacing={2}>
              {trendingNews.map((item, index) => (
                <Box key={index}>
                  <Typography variant="caption" color="text.secondary">
                    {item.category} • <strong>{item.tag}</strong>
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* RIGHT: Campaign Tips */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ bgcolor: 'var(--mui-palette-background-default)', border: '1px solid var(--mui-palette-divider)', p: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              CAMPAIGN TIPS
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              This Is A Section For Campaign Tips And Trips. Partners Will Refer Here To Ensure
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={2}>
              {campaignTips.map((tip, index) => (
                <Box key={index} sx={{ width: { xs: '100%', md: '30%' }, flex: '1 1 auto' }}>
                  <Box sx={{ position: 'relative', width: '100%', height: 140, mb: 1 }}>
                    <Image
                      src={tip.image || '/assets/image-placeholder.jpg'}
                      alt={tip.title}
                      fill
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {tip.category}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {tip.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tip.author} • {tip.time}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const trendingNews = [
  {
    category: 'Category 1',
    tag: 'TIPS',
    title: 'Tiger Woods, in a Stirring Return to the Top, Captures the Masters at 43',
    image: '',
  },
  { category: 'Category', tag: 'DELIVERABLES', title: '10 Years After an Exercise Study, Benefits Persist', image: '' },
  {
    category: 'Category 2',
    tag: 'COMPENSATION',
    title: 'Buying a Tesla Seems Easy. But There Are a Few Things to Know.',
    image: '',
  },
  { category: 'Category 3', tag: 'GUIDELINES', title: 'What to cook this week, Top 15 Breakfasts', image: '' },
  { category: 'Category', tag: 'CONTENT SUBMISSION', title: "Roger Federer's 101 Titles: By the Numbers", image: '' },
  {
    category: 'Category',
    tag: 'CONTRACT',
    title: 'Gene-Edited Babies: What a Chinese Scientist Told an American Mentor',
    image: '',
  },
];

const campaignTips = [
  {
    category: 'Category 1',
    title: 'Campaign title one',
    author: 'Marcie Stephens',
    time: '1 min ago',
    image: '',
  },
  {
    category: 'Category 2',
    title: 'Campaign title two',
    author: 'Zain Dorwart',
    time: '5 min ago',
    image: '',
  },
  {
    category: 'Category 3',
    title: 'Campaign title three',
    author: 'Marcie Stephens',
    time: '1 min ago',
    image: '',
  },
];
