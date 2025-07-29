'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { PortfolioCard } from '../../portfolio/_components/portfolio-card';
import { useFeaturedPortfolioList } from '../../../../services/portfolio/useFeaturedPortfolio';

export const PortfolioSection = () => {
  const { data: portfoliosData, isLoading } = useFeaturedPortfolioList();
  const router = useRouter();

  if (isLoading) return;

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Stack direction="column">
          <FadeIn>
            <Box sx={{ py: { xs: 1, md: 2 } }}>
              <Stack direction="row">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: 'text.primary', mb: { xs: 0, md: 1 } }}
                  textTransform="uppercase"
                  fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.2rem' }}
                >
                  Portfolios
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push('/portfolio')}
                  endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                  sx={{
                    margin: 0,
                    padding: 0,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                ></Button>
              </Stack>
              <Typography
                fontWeight="semibold"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1,
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  width: '100%',
                }}
              >
                {
                  "By developing from the idea up, we transform concepts into strong creative execution that's driven by both form and function."
                }
              </Typography>
            </Box>
          </FadeIn>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ px: { xs: 1.5, md: 2 } }}>
          <SliderWrapper
            modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            sx={{
              '& .swiper-wrapper': {
                gap: '5px',
              },
              '& .swiper-slide': {
                width: 'auto !important',
                marginRight: '0 !important',
                height: 'auto',
              },
              mx: { xs: -1.5, md: -2 },
            }}
          >
            {portfoliosData?.data?.length > 0 && portfoliosData?.data?.map((portfolio) => (
              <SwiperSlide key={portfolio?.id}>
                <FadeIn>
                  <Box sx={{ height: { xs: '300px', md: '400px' }, maxWidth: '300px', width: '100%' }}>
                    <PortfolioCard content={portfolio} />
                  </Box>
                  {/* <Card card={portfolio} fetchList={fetchPortfolios} /> */}
                </FadeIn>
              </SwiperSlide>
            ))}
          </SliderWrapper>
        </Stack>
      </Grid>
    </Grid>
  );
};
