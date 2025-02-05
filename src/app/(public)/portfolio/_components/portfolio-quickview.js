'use client';

import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { isVideoContent, pxToRem } from '@/utils/helper';
import { Box, Button, Divider, FormControlLabel, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

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

export const PortfolioQuickView = ({ data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header Image with Overlay */}
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
        spaceBetween={10}
      >
        {mediaArr.map((item, index) => (
          <SwiperSlide key={index}>
            {isVideoContent(item) ? (
              <Box
                component="video"
                src={item}
                controls
                autoPlay
                loop
                muted
                playsInline
                sx={{
                  height: pxToRem(500),
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                }}
              />
            ) : (
              <Box
                component="img"
                src={item}
                sx={{
                  height: pxToRem(500),
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </SliderWrapper>

      {/* Project Details */}

      <Box
        mt={3}
        width="100%"
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: theme.palette.background.default, zIndex: 2 }}
      >
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" color="text.secondary" fontWeight={'bold'}>
          {data?.project_title}
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Typography variant="subtitle1" color="text.secondary">
            Category: {data.category || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            State: {data.state || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Partner HQ: {data.partner_hq || 'N/A'}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">{data.full_description || 'No description available.'}</Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      {/* Gallery Images */}
      {data.vertical_gallery_images.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            Vertical Gallery
          </Typography>
          <Box display="flex" gap={1} overflow="auto" sx={{ mt: 1, pb: 1, whiteSpace: 'nowrap' }}>
            {data.vertical_gallery_images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Vertical ${idx}`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '5px',
                  boxShadow: `0px 4px 8px ${theme.palette.grey[400]}`,
                }}
              />
            ))}
          </Box>
        </>
      )}

      {data.horizontal_gallery_images.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" mt={3}>
            Horizontal Gallery
          </Typography>
          <Box display="flex" gap={1} overflow="auto" sx={{ mt: 1, pb: 1, whiteSpace: 'nowrap' }}>
            {data.horizontal_gallery_images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Horizontal ${idx}`}
                style={{
                  width: '100px',
                  height: '60px',
                  borderRadius: '5px',
                  boxShadow: `0px 4px 8px ${theme.palette.grey[400]}`,
                }}
              />
            ))}
          </Box>
        </>
      )}

      <Grid container spacing={1} sx={{ mt: 2 }} columns={{ xs: 10 }}>
        {mediaArr.map((item, index) => (
          <Grid item size={{ xs: 2 }} key={index}>
            {isVideoContent(item) ? (
              <Box
                component="video"
                src={item}
                controls
                autoPlay
                loop
                muted
                playsInline
                sx={{ height: pxToRem(300), width: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Box component="img" src={item} sx={{ height: pxToRem(300), width: '100%', objectFit: 'cover' }} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
