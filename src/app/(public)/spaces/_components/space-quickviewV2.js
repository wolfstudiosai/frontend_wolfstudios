import React from 'react';

import { Box, Divider, Stack, Typography, useTheme, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { isSupabaseUrl, isVideoContent, pxToRem } from '/src/utils/helper';
import { CustomChip } from '/src/components/core/custom-chip';
import Image from "next/image";
import useAuth from '/src/hooks/useAuth';

// will replace actual main gallery
const mediaArr = [
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670d11d77dff7fcc24e16f1c_2_DSC03975.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6712275879e29b61d2c2dc79_DSC05709%20(1).jpg',
    'https://player.vimeo.com/progressive_redirect/playback/1008919226/rendition/1080p/file.mp4?loc=external&signature=bf4233dc5593395173302057f4757f83ccb3c307dd4c49f373ecf1e8f5d31ffb',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67023b95692662e57485fae7_1ACCCEF7-605C-4365-B7D4-5084FDC835C6_1_105_c.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6715276ce15620dc4dd4440f_12957620_1589024814746137_4884333050968345441_o.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57cef550fb1eff420953_6704c33770670bf02efed363_DSC02976.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6700cebb14edd020aabfc239_66e46ffa64b6346acab2aff8_MjlmMg.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6714acdd01014c6861e52708_DSC09507.jpg',
    'https://player.vimeo.com/progressive_redirect/playback/1008947433/rendition/1080p/file.mp4?loc=external&signature=395c363decf2b9c5efa59010005a9ccc97b2524fab8fcba75bd44be7e72e16f7',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d1a7375ebfdf94f49c3c_H4GHJcXPb_zOb6Lw8Kx-4jALSl7doDJy2V30K63_o2g.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67170dd5c7259b4b76267d1f_DSC00747.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2d4f4cbbc6d3e7c13aa5_DSC02474s.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a0ffb65f22701e5420fe0_DSC05443.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8e5f0d68063b6f16d6d55_z8pS_CpmIatuha7Fa9oHmwtlWlJy5F3v9blibpSrOkQ-p-800.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57d47703bf6e5069bcb3_6704c1ab0db136d6b6183dab_DSC09888.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671c9306a2d018d04d75a44c_00000.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671f73189e8433871403c301_6700ce647b1bae09a801a438_101F0090-2A4F-4A34-8EA5-5A160A35AC3A_1_105_c.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2467ecc2b689879d3288_DSC01190-p-800.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672a68398a0546bb263ef24a_IMG_2156-p-800.jpg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fcecf5793a3e5d867d6d4b_F18F2EBD-DD3E-4D35-B35F-B16E1E6AEF5D_1_105_c.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
    'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670be14aa60fa816cf457054_19055002_1812151462433470_492009593312992502_o-p-500.jpeg',
  ];

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
            {data?.Gallery?.map((item, index) => (
            <SwiperSlide key={index}>
                <SpaceSliderCard item={{
                    thumbnail: item,
                    title: `Space Content ${index + 1}`,
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
            {mediaArr?.map((item, index) => (
                <SwiperSlide key={index}>
                    <SpaceSliderCard item={{
                        thumbnail: item,
                        title: `Space Content ${index + 1}`,
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
            <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
              {(item.title || "").split(/\s+/).slice(0, 4).join(" ") +
                (item.title?.split(/\s+/)?.length > 4 ? "..." : "")}
            </Typography>
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