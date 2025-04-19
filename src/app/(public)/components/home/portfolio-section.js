'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { ManagePortfolioRightPanel } from '../../portfolio/_components/manage-portfolio-right-panel';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';

export const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState([]);

  const router = useRouter();

  const fetchPortfolios = async () => {
    try {
      const response = await getPortfolioListAsync({
        page: 1,
        rowsPerPage: 20,
      });
      if (response?.success) {
        setPortfolios(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Stack direction="column" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          <FadeIn>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start',
                gap: { xs: 2, md: 4, lg: 8 },
              }}
            >
              <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                <Stack direction="row">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' },
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      color: 'text.primary',
                      flexGrow: 1,
                    }}
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
              </Stack>
              <Typography
                fontWeight="semibold"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '40px' },
                  width: '100%',
                }}
              >
                
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 4,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                fontWeight="semibold"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '40px' },
                  width: '100%',
                }}
              >
                {"By developing from the idea up, we transform concepts into strong creative execution that's driven by both form and function."}
              </Typography>
            </Box>
          </FadeIn>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ px: 3, pt: 1 }}>
          <SliderWrapper
            modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 28
              }
            }}
            sx={{
              '& .swiper-wrapper': {
                gap: '1.8px'
              },
              '& .swiper-slide': {
                width: 'auto !important',
                marginRight: '0 !important',
                height: 'auto'
              },
              mx: { xs: -1.5, md: -2 }
            }}
          >
            {portfolios.map((portfolio) => (
              <SwiperSlide key={portfolio.id}>
                <FadeIn>
                  <Card card={portfolio} fetchList={portfolios} />
                </FadeIn>
              </SwiperSlide>
            ))}
          </SliderWrapper>
        </Stack>
      </Grid>
    </Grid>
  );
};

const Card = ({ card, fetchList }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = useState(null);
  return (
    <>
      <Box
        key={card.id}
        sx={{
          position: 'relative',
          height: '400px',
          width: { xs: '300px', sm: '280px', md: '260px' },
          overflow: 'hidden',
          transition: 'transform 300ms ease',
          border: '1px solid var(--mui-palette-divider)',
        }}
        onClick={() => setOpenPortfolioRightPanel(card)}
      >
        {/* Background Image or Video */}
        {card.VideoLink ? (
          <Box
            component="video"
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            autoPlay
            loop
            muted
          >
            <source src={card.VideoLink[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        ) : (
          <Box
            className="image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              backgroundImage: `url(${card.ThumbnailImage?.[0] || '/assets/image-placeholder.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 300ms ease',
            }}
          />
        )}

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '40%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
            zIndex: 5,
          }}
        />

        {/* Title & Description */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 10,
            width: '100%',
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontFamily: 'Crimson Text, serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              marginBottom: '7px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {card.ProjectTitle}
          </Typography>

          <Box
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: '#ffff',
              marginBottom: '7px',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1.2}
            sx={{ width: '100%' }}
          >
            {[card.designation, card.designation].map((text, index) => (
              <Typography
                key={index}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  flex: index === 0 ? 1 : 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: index === 0 ? '40%' : '30%',
                }}
              >
                {card.ByCountryPortfolios?.map((country) => country?.ByCountry?.Name).join(', ')}
              </Typography>
            ))}
          </Stack>

          <Stack
            spacing={0.5}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            {[card.designation, card.designation].map((text, index) => (
              <Typography
                key={index}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  flex: index === 0 ? 1 : 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: index === 0 ? '40%' : '30%',
                }}
              >
                {card.ByStatesPortfolios?.map((state) => state?.ByStates?.Name).join(', ')}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
      <ManagePortfolioRightPanel
        view="QUICK"
        fetchList={fetchList}
        width="70%"
        open={!!openPortfolioRightPanel}
        data={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </>
  );
};
