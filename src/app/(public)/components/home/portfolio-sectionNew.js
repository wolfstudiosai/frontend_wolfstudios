'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { isVideoContent } from '../../../../utils/helper';
import { ManageSpaceRightPanel } from '../../spaces/_components/manage-space-right-panel';
import { SpaceCard } from '../../spaces/_components/space-card';
import { getSpaceListAsync } from '../../spaces/_lib/space.actions';

export const PortfolioSectionNew = () => {
  const [spaces, setSpaces] = useState([]);
  const router = useRouter();

  const fetchSpaces = async () => {
    const filters = [{ key: 'isFeatured', type: 'boolean', operator: 'is', value: true }];
    const response = await getSpaceListAsync(
      {
        page: 1,
        rowsPerPage: 20,
      },
      filters,
      'and'
    );

    if (response?.success) {
      setSpaces(response.data);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <Box>
      <Grid container alignItems="flex-start">
        <Grid
          item
          size={{
            md: 3,
            xs: 12,
          }}
        >
          <FadeIn>
            <Box sx={{ px: { xs: 0, md: 0 }, py: { xs: 1, md: 2 } }}>
              <Stack direction="row">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: 'text.primary', mb: { xs: 0, md: 1 } }}
                  textTransform="uppercase"
                  fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.2rem' }}
                >
                  Spaces
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push('/spaces')}
                  endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                  sx={{
                    margin: 0,
                    padding: 0,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                ></Button>
              </Stack>
              <Typography fontSize={18}>
                Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft
                compelling visuals that captivate audiences, evoke emotion, and leave a lasting impact.
              </Typography>
            </Box>
          </FadeIn>
        </Grid>

        <Grid
          size={{
            md: 9,
            xs: 12,
          }}
        >
          <Stack spacing={2}>
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
              {spaces.map((space) => (
                <SwiperSlide key={space.id}>
                  <FadeIn>
                    <Box sx={{ height: '400px', width: '300px' }}>
                      <SpaceCard content={space} fetchList={fetchSpaces} />
                    </Box>
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