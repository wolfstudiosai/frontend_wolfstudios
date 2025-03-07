'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
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
        py: 1,
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
              gutterBottom
              sx={{
                fontSize: '2.2rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              Portfolios
            </Typography>
            <Typography fontSize={18} sx={{ color: 'text.secondary' }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
          <Stack direction="row" sx={{ mt: 4 }}>
            <Button variant="outlined" onClick={() => router.push('/portfolio')}>
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

// const PortfolioCard = ({ variant }) => {
//   return (
//     <>
//       <Card
//         sx={{
//           width: '100%',
//           aspectRatio: '9 / 12',
//           overflow: 'hidden',
//           position: 'relative',
//           backgroundColor: '#333',
//           borderRadius: 'calc(0* var(--mui-shape-borderRadius))',
//           // border: 'solid .1px var(--mui-palette-divider)',
//           cursor: 'pointer',
//           '&:hover .portfolio-card-overlay': {
//             opacity: 1,
//           },
//         }}
//       // onClick={() => setOpenPortfolioRightPanel(item)}
//       >
//         {isVideoContent('') ? (
//           <Box
//             component="video"
//             src={''}
//             // controls
//             muted
//             autoPlay
//             loop
//             draggable={false}
//             playsInline
//             sx={{
//               height: '100%',
//               width: '100%',
//               objectFit: 'cover',
//               borderRadius: 1,
//             }}
//           />
//         ) : (
//           <Image
//             // src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
//             src={
//               variant === 2
//                 ? 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57cef550fb1eff420953_6704c33770670bf02efed363_DSC02976.jpeg'
//                 : `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672a68398a0546bb263ef24a_IMG_2156-p-800.jpg`
//             }
//             alt={'alt-image'}
//             draggable={false}
//             style={{
//               objectFit: 'cover',
//               filter: 'blur(20px)',
//               transition: 'filter 0.2s ease-out',
//             }}
//             loading="lazy"
//             sizes="100vw"
//             fill={true}
//             onLoad={(e) => {
//               e.target.style.filter = 'blur(0px)';
//             }}
//           />
//         )}
//         <Stack
//           direction="column"
//           px={2}
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             left: 0,
//             width: '100%',
//             py: 1,
//             background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
//           }}
//         >
//           <Typography fontWeight={600} color="var(--mui-palette-common-white)" fontSize={{ xs: 12, md: 14 }}>
//             Portfolio title
//           </Typography>
//           <Typography variant="body" color="var(--mui-palette-common-white)" sx={{ fontSize: '12px' }}>
//             Short description goes here
//           </Typography>
//         </Stack>
//       </Card>
//     </>
//   );
// };
