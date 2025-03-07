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

import { PortfolioCard } from '../../portfolio/_components/portfolio-gridview';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';

export const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState([]);

  const router = useRouter();

  const fetchPortfolios = async () => {
    const response = await getPortfolioListAsync({
      rowsPerPage: 50,
    });
    if (response?.success) {
      setPortfolios((prev) => [...prev, ...response.data]);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <Box
      sx={{
        pt: 1,
        px: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          size={{
            md: 3,
            xs: 12,
          }}
        >
          <FadeIn>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: '2.2rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              Portfolios
            </Typography>
            <Typography fontSize={18} sx={{ color: 'text.secondary', mt: 1, mb: 4 }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
          <Stack direction="row">
            <Button
              variant="text"
              onClick={() => router.push('/portfolio')}
              endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
              sx={{ margin: 0, padding: 0 }}
            >
              See all portfolios
            </Button>
          </Stack>
        </Grid>
        {portfolios?.length > 0 && (
          <Grid
            size={{
              md: 9,
              xs: 12,
            }}
          >
            <SliderWrapper
              modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
              spaceBetween={2}
              sx={{ mb: 0.1 }}
            >
              {portfolios.slice(0, portfolios.length / 2).map((portfolio, index) => (
                <SwiperSlide key={index}>
                  <PortfolioCard
                    item={portfolio}
                    fetchList={fetchPortfolios}
                    sx={{ borderRadius: 0 }}
                    infoSx={{ width: '86%' }}
                  />
                </SwiperSlide>
              ))}
            </SliderWrapper>
            <SliderWrapper
              modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
              spaceBetween={2}
            >
              {portfolios.slice(26).map((portfolio, index) => (
                <SwiperSlide key={index}>
                  <PortfolioCard
                    item={portfolio}
                    fetchList={fetchPortfolios}
                    sx={{ borderRadius: 0 }}
                    infoSx={{ width: '86%' }}
                  />
                </SwiperSlide>
              ))}
            </SliderWrapper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

