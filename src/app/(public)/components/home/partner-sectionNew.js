'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { useFeaturedPartnerList } from '../../../../services/partner/useFeaturedPartner';
import { PartnerRightPanel } from '../../partner/_components/partner-right-panel';

export const PartnerSectionNew = () => {
  const { data: partnersData, isLoading } = useFeaturedPartnerList();
  const count = 12;
  const shouldDisplaySecondRow = partnersData?.data?.length > count;
  const firstRowData = partnersData?.data?.slice(0, count);
  const secondRowData = partnersData?.data?.slice(count);
  const router = useRouter();

  if (isLoading) return;

  return (
    <Grid container alignItems="center">
      <Grid xs={12}>
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
                  Partners
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push('/partner')}
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

      <Grid size={12}>
        <Stack>
          <SliderWrapper
            loop={false}
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
            }}
          >
            {firstRowData?.length > 0 &&
              firstRowData?.map((partner) => (
                <SwiperSlide key={partner.id}>
                  <FadeIn>
                    <Box sx={{ height: { xs: '300px', md: '400px' }, width: '100%' }}>
                      <Card card={partner} />
                    </Box>
                  </FadeIn>
                </SwiperSlide>
              ))}
          </SliderWrapper>
        </Stack>
      </Grid>
      {shouldDisplaySecondRow && (
        <Grid size={12} sx={{ mt: 0.5 }}>
          <Stack>
            <SliderWrapper
              loop={false}
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
              }}
            >
              {secondRowData.length > 0 &&
                secondRowData.map((partner) => (
                  <SwiperSlide key={partner.id}>
                    <FadeIn>
                      <Box sx={{ height: { xs: '300px', md: '400px' }, width: '100%' }}>
                        <Card card={partner} />
                      </Box>
                    </FadeIn>
                  </SwiperSlide>
                ))}
            </SliderWrapper>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

const Card = ({ card }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = useState(false);

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
        onClick={() => setOpenPartnerRightPanel(true)}
      >
        {/* Background Image */}
        <Box
          className="image"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            backgroundImage: `url("${encodeURI(card?.thumbnailImage)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 300ms ease',
          }}
        />

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
          }}
        >
          {/* Add new text elements here */}
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontFamily: 'Crimson Text, serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              marginBottom: '7px',
            }}
          >
            {card?.name?.split(' ').length > 4 ? card?.name?.split(' ').slice(0, 4).join(' ') + '...' : card?.name}
          </Typography>

          {/* Thin Line */}
          <Box
            sx={{
              width: '100%',
              height: '0.8px',
              backgroundColor: '#ffff',
              marginBottom: '7px',
            }}
          />
          <Stack
            spacing={0.5}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={1.2}
          >
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.675rem', md: '0.9rem' },
                fontFamily: 'Crimson Text, serif',
                lineHeight: 1.2,
                marginRight: 'auto',
              }}
            >
              {card.states?.map((state) => state?.name).join(', ')}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.675rem', md: '0.9rem' },
                fontFamily: 'Crimson Text, serif',
                lineHeight: 1.2,
                marginRight: 'auto',
              }}
            >
              {card.countries?.map((country) => country?.name).join(', ')}
            </Typography>
          </Stack>
          {/* Add new text elements here */}
        </Box>
      </Box>

      {openPartnerRightPanel && (
        <PartnerRightPanel
          view="QUICK"
          open={openPartnerRightPanel}
          id={card?.id}
          onClose={() => setOpenPartnerRightPanel(false)}
        />
      )}
    </>
  );
};
