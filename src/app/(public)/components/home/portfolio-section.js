'use client';

import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { getFancyColor, isVideoContent } from '/src/utils/helper';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';
import { ManagePortfolioRightPanel } from '../../portfolio/_components/manage-portfolio-right-panel';

export const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState([]);

  const router = useRouter();

  const dummyPortfolios = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A cutting-edge project showcasing innovation.',
      image: 'https://picsum.photos/300/200?random=1',
      category: 'Technology',
      date: '2023-10-01',
    },
    {
      id: 2,
      title: 'Project Beta',
      description: 'Revolutionizing the way we think about design.',
      image: 'https://picsum.photos/300/200?random=2',
      category: 'Design',
      date: '2023-09-15',
    },
    {
      id: 3,
      title: 'Project Gamma',
      description: 'Transforming ideas into reality.',
      image: 'https://picsum.photos/300/200?random=3',
      category: 'Innovation',
      date: '2023-08-20',
    },
    {
      id: 4,
      title: 'Project Delta',
      description: 'Pushing the boundaries of creativity.',
      image: 'https://picsum.photos/300/200?random=4',
      category: 'Art',
      date: '2023-07-10',
    },
    {
      id: 5,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=5',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 6,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=6',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 7,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=7',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 8,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=8',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 9,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=9',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 10,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=10',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 11,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=11',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 12,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=12',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 13,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=13',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 14,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=14',
      category: 'Technology',
      date: '2023-06-05',
    },
    {
      id: 15,
      title: 'Project Epsilon',
      description: 'A journey into the future of technology.',
      image: 'https://picsum.photos/300/200?random=15',
      category: 'Technology',
      date: '2023-06-05',
    },
    // Add more dummy data as needed
  ];

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
      }}
    >
      <Grid container spacing={2}>
        <Grid
          size={{
            md: 4,
            xs: 12,
          }}
        >
          <FadeIn>
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
              Portfolio Drop
            </Typography>
            <Typography fontSize={18} sx={{ mt: 1, mb: 4 }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
          <Stack direction="row">
            <Button
              variant="text"
              onClick={() => router.push('/portfolio')}
              endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
              sx={{ margin: 0, padding: 0 }}
            >
              See all portfolios
            </Button>
          </Stack>
        </Grid>
        {dummyPortfolios?.length > 0 && (
          <Grid
            size={{
              md: 8,
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
              {dummyPortfolios.slice(0, dummyPortfolios.length / 2).map((portfolio, index) => (
                <SwiperSlide key={index}>
                  <FadeIn>
                    <PortfolioCard
                      item={portfolio}
                      fetchList={fetchPortfolios}
                      sx={{ borderRadius: 0, height: { xs: '300px' } }}
                      infoSx={{ width: '86%', '& .category-chip': { backgroundColor: 'transparent', border: '1px solid #fff' } }}
                    />
                  </FadeIn>
                </SwiperSlide>
              ))}
            </SliderWrapper>
          </Grid>
        )}
        {portfolios?.length > 0 && (
          <Grid
            size={{
              xs: 12,
            }}
          >
            <SliderWrapper
              modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 6 },
              }}
              spaceBetween={2}
            >
              {portfolios.slice(26).map((portfolio, index) => (
                <SwiperSlide key={index}>
                  <FadeIn>
                    <PortfolioCard
                      item={portfolio}
                      fetchList={fetchPortfolios}
                      sx={{ borderRadius: 0, height: { xs: '300px' } }}
                      infoSx={{ width: '86%', '& .category-chip': { backgroundColor: 'transparent', border: '1px solid #fff' } }}
                    />
                  </FadeIn>
                </SwiperSlide>
              ))}
            </SliderWrapper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export const PortfolioCard = ({ item, fetchList, sx, infoSx }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = useState(null);
  
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
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
          '&:hover .portfolio-card-overlay': {
            opacity: 1,
          },
          ...sx
        }}
        onClick={() => setOpenPortfolioRightPanel(item)}
      >
        {isVideoContent(item.thumbnail || '') ? (
          <Box
            component="video"
            src={item.thumbnail}
            // controls
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
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
          <Image
            // src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
            src = {item.image || 'https://picsum.photos/300/200?random=2'}
            alt={item.title || 'Portfolio Image'}
            draggable={false}
            style={{
              objectFit: 'cover',
              filter: 'blur(20px)',
              transition: 'filter 0.2s ease-out',
            }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust based on screen size
            fill={true}
            onLoad={(e) => {
              e.target.style.filter = 'blur(0px)';
            }}
          />
          </Box>
        )}
        <Stack
          direction="column"
          px={2}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            py: 1,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            ...infoSx
          }}
        >
          <Typography fontWeight={600} color="var(--mui-palette-common-white)" fontSize={{ xs: 12, md: 14 }}>
            {item.project_title}
          </Typography>
          <Stack direction={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'} mt={1}>
            <Typography variant="body" color="var(--mui-palette-common-white)" sx={{ fontSize: '12px' }}>
              {item.state}
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                // mt: 1,
              }}
            >
              {item?.category &&
                item?.category
                  ?.split(',')
                  .map((category, index) => (
                    <Chip
                      key={index}
                      label={category.trim()}
                      
                      size="small"
                      sx={{ backgroundColor: getFancyColor(index), fontSize: '10px', color: 'var(--mui-palette-common-white)' }}
                      className='category-chip'
                    />
                  ))}
            </Box>
          </Stack>
        </Stack>
        <ManagePortfolioRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openPortfolioRightPanel ? true : false}
          data={openPortfolioRightPanel}
          onClose={() => setOpenPortfolioRightPanel(false)}
        />
      </Card>
    </>
  );
};