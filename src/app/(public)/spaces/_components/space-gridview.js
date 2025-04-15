'use client';

import React from 'react';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { PageLoader } from '/src/components/loaders/PageLoader';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ManageSpaceRightPanel } from './manage-space-right-panel';
import { SpaceSliderItem } from './space-slider-item';
import { getFancyColor, isVideoContent } from '/src/utils/helper';

export const SpaceGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
    const slider_data = data.filter((item) => item.featured);
    return (
        <Box>
            <Box sx={{ mt: 2 }}>
                <SliderWrapper
                    modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: true }}
                    breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    }}
                    pauseOnHover
                    speed={2000}
                    spaceBetween={10}
                    >
                    {slider_data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SpaceSliderItem item={item} index={index} fetchList={fetchList} />
                    </SwiperSlide>
                          ))}
                </SliderWrapper>
                <PageLoader loading={loading} error={null}>
                    <Grid container spacing={0.1} columns={{ xs: 36 }} sx={{ mt: 2 }}>
                          {data.map((space, index) => (
                            <Grid item size={{ xs: 12, md: colums }} key={index}>
                              <SpaceCard item={space} fetchList={fetchList} />
                            </Grid>
                          ))}
                        </Grid>
                </PageLoader>
            </Box>
        </Box>
    )
};

export const SpaceCard = ({ item, fetchList, sx, infoSx }) => {
  const [openSpaceRightPanel, setOpenSpaceRightPanel] = React.useState(null);

  const handleMenuOpen= () => {}
  return (
    <>
      <Card
        sx={{
          width: '100%',
          aspectRatio: '9 / 16',
          border: 'unset',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#333',
          borderRadius: '0',
          border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
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
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ color: 'white' }}
          >
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
                src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/'}
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
                  background: 'var(--mui-palette-divider)'
                  }}
              />
          </Stack>
        </Box>

        <ManageSpaceRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openSpaceRightPanel ? true : false}
          data={openSpaceRightPanel}
          onClose={() => setOpenSpaceRightPanel(false)}
        />
      </Card>
      <Box sx={{ 
          flex: 0.1, 
          p: 1,
          backgroundColor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" >
            <Typography variant="body" color="white" sx={{ 
              fontSize: '13px',
              maxWidth: '60%',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--mui-palette-text-primary)',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}>
              {item.ByStatesSpaces?.map((state) => state?.ByStates?.Name).join(', ')}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 0.5, 
              alignItems: 'center',
              maxWidth: '40%',
              justifyContent: 'flex-end'
            }}>
              {/* {item?.PortfolioCategoriesPortfolios?.map((portfolio, index) => (
                portfolio?.PortfolioCategories && (
                  <Chip
                    key={index}
                    label={portfolio.PortfolioCategories.Name}
                    size="small"
                    sx={{
                      backgroundColor: getFancyColor(index),
                      fontSize: '10px',
                      fontWeight: 400,
                      color: 'var(--mui-palette-common-white)',
                      maxWidth: 80,
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }
                    }}
                  />
                )
              ))} */}
              <Typography variant="body" color="white" sx={{ 
              fontSize: '12px',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              color: 'var(--mui-palette-text-primary)',
              '&:hover': {
                textDecoration: 'underline',
                fontWeight: 500,
              }
            }}>{item.ByCountrySpaces?.map((country) => country?.ByCountry?.Name).join(', ')}</Typography>
            </Box>
          </Stack>
      </Box>
    </>
  );
};
