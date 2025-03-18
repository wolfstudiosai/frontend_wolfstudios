'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { PortfolioCard } from '../../portfolio/_components/portfolio-gridview';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

export const PartnerSectionNew = () => {
  const [partners, setPartners] = useState([]);

  const router = useRouter();

  const dummyPartners = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A cutting-edge project showcasing innovation.',
      image: 'https://via.placeholder.com/300x533',
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

  const fetchPartners = async () => {
    const response = await getPartnerListAsync({
      page: 1,
      rowsPerPage: 20,
    });
    if (response?.success) {
      setPartners((prev) => [...prev, ...response.data]);
    }
  };

  useEffect(() => {
    fetchPartners();
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
            md: 3,
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
              Partners Drop
            </Typography>
            <Typography fontSize={18} sx={{ mt: 1, mb: 4 }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
          <Stack direction="row">
            <Button
              variant="text"
              onClick={() => router.push('/partners')}
              endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
              sx={{ margin: 0, padding: 0 }}
            >
              See all partners
            </Button>
          </Stack>
        </Grid>
        {dummyPartners?.length > 0 && (
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
              {dummyPartners.slice(0, dummyPartners.length / 2).map((partner, index) => (
                <SwiperSlide key={index}>
                  <FadeIn>
                    {/* We are using reusable PortfolioCard component for Partners */}
                    <PortfolioCard
                      item={partner}
                      fetchList={fetchPartners}
                      sx={{ borderRadius: 0, height: { xs: '300px' } }}
                      infoSx={{ width: '86%', '& .category-chip': { backgroundColor: 'transparent', border: '1px solid #fff' } }}
                    />
                  </FadeIn>
                </SwiperSlide>
              ))}
            </SliderWrapper>
          </Grid>
        )}
        {partners?.length > 0 && (
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
              {partners.slice(26).map((partner, index) => (
                <SwiperSlide key={index}>
                  <FadeIn>
                    {/* We are using reusable PortfolioCard component for Partners */}
                    <PortfolioCard
                      item={partner}
                      fetchList={fetchPartners}
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
