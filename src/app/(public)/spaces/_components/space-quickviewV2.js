import React from 'react';

import { Box, Divider, Stack, Typography, useTheme, Card } from '@mui/material';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { isSupabaseUrl, isVideoContent, pxToRem } from '/src/utils/helper';
import { CustomChip } from '/src/components/core/custom-chip';
import Image from "next/image";
import useAuth from '/src/hooks/useAuth';

export const SpaceQuickViewV2 = ({ data }) => {
  const theme = useTheme();
  const { isLogin } = useAuth();

  return (
    <Box sx={{ position: 'relative' }}>
        {/* Project Details */}
        <Box
            width="100%"
            sx={{ 
            position: 'sticky', 
            top: 0, 
            left: 0, 
            backgroundColor: theme.palette.background.default, 
            zIndex: 2 
            }}
        >
        {/* <Divider sx={{ my: 2 }} /> */}

        <Typography variant="subtitle1" color="text.secondary" fontWeight={'bold'} mb={1} >
          {data?.Name || 'No title available.'}
        </Typography>

        <Stack direction="column" spacing={1} mb={2}>
          {/* Category */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              Category:
            </Typography>
            <Stack direction={'row'} spacing={0.8} mt={0.5}>
                {data?.ByTagsSpaces?.length > 0 ? (
                    data.ByTagsSpaces.map((item, index) => (
                    <CustomChip
                        key={index}
                        label={item?.ByTags?.Name || 'Unknown'}
                        color="primary"
                    />
                    ))
                ) : (
                    <Typography variant="subtitle1" color="text.secondary">
                    N/A
                    </Typography>
                )}
            </Stack>
            {/* <Typography variant="subtitle1" color="text.secondary">
              {data?.ByTagsSpaces?.map((item) => item?.ByTags?.Name)?.join(', ') || 'N/A'}
            </Typography> */}
          </Stack>

          {/* State */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              State:
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data?.ByStatesSpaces?.map((item) => item?.ByStates?.Name)?.join(', ') || 'N/A'}
            </Typography>
          </Stack>

          {/* Features */}
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              Features:
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data?.Features?.map((item) => item)?.join(', ') || 'N/A'}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />
        </Box>

      {/* Featured Image */}
        <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.secondary">
          Featured Gallery
        </Typography>
        <SliderWrapper
            modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            pauseOnHover
            // speed={2000}
            spaceBetween={1.2}
        >
            {data?.FeaturedGallery?.map((item, index) => (
            <SwiperSlide key={index}>
                <SpaceSliderCard item={{
                    thumbnail: item,
                    ThumbnailImage: [item],
                }}/>
            </SwiperSlide>
            ))}
        </SliderWrapper>

      {/* Main Gallery Images */}
        <Typography variant="subtitle1" fontWeight="bold" my={2} color="text.secondary">
          Main Gallery
        </Typography>
            <SliderWrapper
                modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: true }}
                breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                }}
                pauseOnHover
                // speed={2000}
                spaceBetween={1.2}
            >
            {data?.MainGallery?.map((item, index) => (
                <SwiperSlide key={index}>
                    <SpaceSliderCard item={{
                        thumbnail: item,
                        ThumbnailImage: [item],
                    }}/>
                </SwiperSlide>
            ))}
            </SliderWrapper>
    </Box>
  );
}

export const SpaceSliderCard = ({ item, sx = {} }) => {
    return (
      <Card
        sx={{
          width: "100%",
          aspectRatio: "9 / 16",
          border: "unset",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#333",
          borderRadius: "0",
          border: "solid .1px var(--mui-palette-divider)",
          display: "flex",
          flexDirection: "column",
          "&:hover .image-container": {
            opacity: 0.8,
          },
          ...sx,
        }}
      >
        <Box className="image-container" sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {isVideoContent(item.thumbnail || "") ? (
            <Box
              component="video"
              src={item.thumbnail}
              muted
              autoPlay
              loop
              draggable={false}
              playsInline
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          ) : (
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || "/"}
                alt={item.title || "Space Image"}
                draggable={false}
                style={{
                  objectFit: "cover",
                  filter: "blur(20px)",
                  transition: "filter 0.2s ease-out",
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                onLoad={(e) => {
                  e.target.style.filter = "blur(0px)"
                }}
              />
            </Box>
          )}
  
          {/* Title Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
          >
            {/* Thin Line */}
            <Box
              sx={{
                width: "100%",
                height: "0.8px",
                margin: "4px 0",
                background: "var(--mui-palette-divider)",
              }}
            />
          </Box>
        </Box>
      </Card>
    )
}