'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { ManagePortfolioRightPanel } from '../../portfolio/_components/manage-portfolio-right-panel';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';
import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';


export const PortfolioSectionNew = () => {
  const [portfolios, setPortfolios] = useState([]);

  const router = useRouter();

  const fetchPortfolios = async () => {
    const response = await getPortfolioListAsync({
      page: 1,
      rowsPerPage: 20,
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
        mb: '10px'
      }}
    >
      <Grid container spacing={2} alignItems="flex-start">
        <Grid
          item
          size={{
            md: 3,
            xs: 12,
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
          }}
        >
          <FadeIn>
            <Stack direction="row" alignItems="center">
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
              <Button
                variant="text"
                onClick={() => router.push('/portfolio')}
                endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                sx={{ margin: 0, padding: 0 }}
              >
              </Button>
            </Stack>
            <Typography fontSize={18} sx={{ mt: 1, mb: 4 }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
        </Grid>

        <Grid size={{
          md: 9,
          xs: 12,
        }}>
          <Stack spacing={2} sx={{ px: 3, pt: 1 }}>
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

                  gap: '1.8px'

                },
                '& .swiper-slide': {
                  width: 'auto !important',
                  marginRight: '0 !important',
                  height: 'auto',
                },
                // Add negative margin to compensate for container padding
                mx: { xs: -1.5, md: -2 },
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
    </Box>
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
              backgroundImage: `url(${card.ThumbnailImage[0]})`,
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

const HorizontalScrollCarousel = ({ direction, fetchList }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalWidth = useMemo(() => 12 * 350, []);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [0, -totalWidth + window.innerWidth] : [-totalWidth + window.innerWidth, 0]
  );

  return (
    <Box
      ref={targetRef}
      sx={{
        position: 'relative',
        height: '450px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div style={{ x, display: 'flex', gap: 2 }}>
          {fetchList.map((card) => (
            <Card card={card} key={card.id} fetchList={fetchList} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};
