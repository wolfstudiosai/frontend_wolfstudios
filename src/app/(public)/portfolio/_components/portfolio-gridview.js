'use client';

import { PageHeader } from '@/components/core/page-header';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { getRandomColor } from '@/utils/utils';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import useAuth from '@/hooks/useAuth';

import { portfolioFilters, portfolioSorting, portfolioTags } from '../_lib/constants';
import { deletePortfolioAsync } from '../_lib/portfolio.actions';
import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioSliderItem } from './portfolio-slider-item';

const slider_data = [
  {
    id: 1,
    project_title: 'Elegent Magazine',
    slug: 'elegent-magazine',
    model: 'Elina',
    publication: 'Vogue',
    dp: 'Combina Key',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57db937c24dab0b8b82f_66e4700589276eed14241799_MTViYQ.jpeg',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 2,
    project_title: 'Fashion Trends',
    slug: 'fashion-trends',
    model: 'Alexis',
    publication: 'Elle',
    dp: 'Style Studio',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672c8f645c58c34ae738d9a6_Photo%20Feb%2019%2C%202%2022%2052%20PM%20(1)-p-500.jpg',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 3,
    project_title: 'Luxury Lifestyle',
    slug: 'luxury-lifestyle',
    model: 'Jordan',
    publication: 'GQ',
    dp: 'Chic Agency',
    url: 'https://player.vimeo.com/progressive_redirect/playback/1008919226/rendition/1080p/file.mp4?loc=external&signature=bf4233dc5593395173302057f4757f83ccb3c307dd4c49f373ecf1e8f5d31ffb',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 4,
    project_title: 'Street Style',
    slug: 'street-style',
    model: 'Samantha',
    publication: 'Hypebae',
    dp: 'Urban Icons',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671b6a961ff3baf4d743d7a1_sharee3-p-500.jpg',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 5,
    project_title: 'Wedding Couture',
    slug: 'wedding-couture',
    model: 'Olivia',
    publication: 'Bridal Magazine',
    dp: 'Romance Creations',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671236ee22391f7f18795637_T641-p-500.png',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 6,
    project_title: 'Travel Diaries',
    slug: 'travel-diaries',
    model: 'Noah',
    publication: 'National Geographic',
    dp: 'Adventure Lens',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671b5ebbdc1d4ae848fa87c7_381%20(5)qwss-p-500.jpg',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  {
    id: 7,
    project_title: 'Tech Innovations',
    slug: 'tech-innovations',
    model: 'Sophia',
    publication: 'TechCrunch',
    dp: 'InnoHub',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6717489818419bdb3551c791_DSC06216-p-500.jpg',
    state: 'californina',
    created_at: '2025-01-24T10:45:02.335Z',
    category: 'Lifestyle,Fashion',
  },
  // {
  //   id: 8,
  //   title: 'Fitness Journey',
  //   slug: 'fitness-journey',
  //   model: 'Ethan',
  //   publication: "Men's Health",
  //   dp: 'FitLife Studio',
  //   url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671b680b53357fcda4f00df3_0059-p-500.jpg',
  // },
];

export const PortfolioGridView = ({ data, fetchList, loading, handlePagination }) => {
  const handleFilterChange = (type, value) => {
    console.log(type, value);
  };
  return (
    <Box sx={{ p: 2 }}>
      <PageHeader
        title="Portfolio"
        tags={portfolioTags}
        filters={portfolioFilters}
        sorting={portfolioSorting}
        onFilterChange={handleFilterChange}
      />
      <Box>
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
              <PortfolioSliderItem item={item} index={index} />
            </SwiperSlide>
          ))}
        </SliderWrapper>
      </Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mt: 2 }}>
          {data.map((portfolio, index) => (
            <Grid item size={{ xs: 12, md: 2 }} key={index}>
              <PortfolioCard item={portfolio} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

const PortfolioCard = ({ item, fetchList }) => {
  console.log(item, 'item inside PortfolioCard');
  const { isLogin } = useAuth();
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const handleDelete = async () => {
    const response = await deletePortfolioAsync([item.id]);
    if (response.success) {
      fetchList();
    }
  };

  const isVideoContent = (url) => {
    const videoKeywords = ['vimeo', 'playback', 'video'];
    return videoKeywords.some((keyword) => url.includes(keyword));
  };

  return (
    <Card
      sx={{
        width: '100%',
        aspectRatio: '9 / 12',
        borderRadius: 2,
        border: 'unset',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#333',
        border: '1px solid var(--mui-palette-divider)',
        cursor: 'pointer',
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
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
          alt={item.title}
          draggable={false}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'cen',
            filter: 'brightness(100%)',
            borderRadius: 1,
          }}
        />
      )}
      <Stack
        direction="column"
        spacing={1}
        px={2}
        sx={{ position: 'absolute', bottom: 20, right: 0, left: 0, width: '100%' }}
      >
        <Typography variant="h3" fontWeight={600} color="var(--mui-palette-common-white)" fontSize={{ xs: 18, md: 22 }}>
          {item.project_title}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body" color="var(--mui-palette-common-white)">
            State: {item.state}
          </Typography>
          {item.category.split(',').map((category, index) => (
            <Chip key={index} label={category.trim()} size="small" sx={{ backgroundColor: getRandomColor() }} />
          ))}
        </Box>
      </Stack>
      {/* <Stack
        direction="row"
        justifyContent={'flex-end'}
        sx={{ position: 'absolute', top: 20, right: 10, width: '100%' }}
      >
        <AvatarGroup
          spacing={'small'}
          total={42}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, mb: 0.5 } }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </AvatarGroup>
      </Stack> */}

      <ManagePortfolioRightPanel
        fetchList={fetchList}
        width="70%"
        open={openPortfolioRightPanel ? true : false}
        data={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </Card>
  );
};
