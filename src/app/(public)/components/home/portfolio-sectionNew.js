'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { getSpaceListAsync } from '../../spaces/_lib/space.actions';
import { ManageSpaceRightPanel } from '../../spaces/_components/manage-space-right-panel';
import { isVideoContent } from '../../../../utils/helper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';

export const PortfolioSectionNew = () => {
  const [spaces, setSpaces] = useState([]);
  const router = useRouter();

  const fetchSpaces = async () => {
    const filters = [{ key: "isFeatured", type: "boolean", operator: "is", value: true }];
    const response = await getSpaceListAsync({
      page: 1,
      rowsPerPage: 20,
    }, filters, 'and');
    console.log(response);
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
                    <SpaceCard item={space} fetchList={fetchSpaces} />
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

export const SpaceCard = ({ item, fetchList, sx, infoSx }) => {
  const [openSpaceRightPanel, setOpenSpaceRightPanel] = useState(null);

  return (
    <>
      <Card
        sx={{
          background: "var(--mui-palette-background-default)",
          height: '400px',
          width: { xs: '300px', sm: '280px', md: '260px' },
          border: 'unset',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '0',
          border: 'solid 1px var(--mui-palette-divider)',
          display: 'flex',
          flexDirection: 'column',
          '&:hover .menu-icon': {
            opacity: 1,
          },
          '&:hover .image-container': {
            opacity: 0.8,
          },
          ...sx,
        }}
        onClick={() => setOpenSpaceRightPanel(item)}
      >
        {/* top menu icon button */}
        <Box
          className="menu-icon"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
          }}
        >
          <IconButton size="small" sx={{ color: 'white' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className="image-container" sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {isVideoContent(item.videoLink || '') ? (
            <Box
              component="video"
              src={item?.videoLink || ''}
              muted
              autoPlay
              loop
              draggable={false}
              playsInline
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          ) : (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/assets/image-placeholder.jpg'}
                alt={item.title || 'Space Image'}
                draggable={false}
                style={{
                  objectFit: 'cover',
                  filter: 'blur(20px)',
                  transition: 'filter 0.2s ease-out',
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                onLoad={(e) => {
                  e.target.style.filter = 'blur(0px)';
                }}
              />
            </Box>
          )}

          {/* Title Overlay */}
          <Stack
            direction="column"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            }}
          >
            <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
              {(item.Name || '').split(/\s+/).slice(0, 4).join(' ') +
                (item.Name?.split(/\s+/)?.length > 4 ? '...' : '')}
            </Typography>
            {/* Thin Line */}
            <Box
              sx={{
                width: '100%',
                height: '0.8px',
                margin: '4px 0',
                background: 'var(--mui-palette-divider)',
              }}
            />
          </Stack>
        </Box>

        <ManageSpaceRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openSpaceRightPanel ? true : false}
          data={item}
          onClose={() => setOpenSpaceRightPanel(false)}
        />
      </Card>
      <Box
        sx={{
          flex: 0.1,
          p: 1,
          backgroundColor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
      </Box>
    </>
  );
};

