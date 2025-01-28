'use client';

import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { QuickToolbar } from '@/components/toolbar/quick-toolbar';
import { Box, IconButton, Pagination, Stack } from '@mui/material';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import useAuth from '@/hooks/useAuth';

import { ManagePortfolioRightPanel } from './_components/manage-portfolio-right-panel';
import { PortfolioGridView } from './_components/portfolio-gridview';
import { PortfolioListView } from './_components/portfolio-listview';
import { PortfolioSliderItem } from './_components/portfolio-slider-item';
import { getPortfolioListAsync } from './_lib/portfolio.actions';
import { defaultPortfolio } from './_lib/portfolio.types';

const slider_data = [
  {
    id: 1,
    title: 'Elegent Magazine',
    slug: 'elegent-magazine',
    model: 'Elina',
    publication: 'Vogue',
    dp: 'Combina Key',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57db937c24dab0b8b82f_66e4700589276eed14241799_MTViYQ.jpeg',
  },
  {
    id: 2,
    title: 'Fashion Trends',
    slug: 'fashion-trends',
    model: 'Alexis',
    publication: 'Elle',
    dp: 'Style Studio',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672c8f645c58c34ae738d9a6_Photo%20Feb%2019%2C%202%2022%2052%20PM%20(1)-p-500.jpg',
  },
  {
    id: 3,
    title: 'Luxury Lifestyle',
    slug: 'luxury-lifestyle',
    model: 'Jordan',
    publication: 'GQ',
    dp: 'Chic Agency',
    url: 'https://download-video-ak.vimeocdn.com/v3-1/playback/e0d3e959-d1f4-4355-9f02-1d354b52f410/f53a3ff8-f46f8e3d?__token__=st=1738058980~exp=1738073380~acl=%2Fv3-1%2Fplayback%2Fe0d3e959-d1f4-4355-9f02-1d354b52f410%2Ff53a3ff8-f46f8e3d%2A~hmac=af40ec6332035386e16ee9acaa946f98bafec5db0962c210e076ddc8e0acce80&r=dXMtd2VzdDE%3D',
  },
  {
    id: 4,
    title: 'Street Style',
    slug: 'street-style',
    model: 'Samantha',
    publication: 'Hypebae',
    dp: 'Urban Icons',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671b6a961ff3baf4d743d7a1_sharee3-p-500.jpg',
  },
  {
    id: 5,
    title: 'Wedding Couture',
    slug: 'wedding-couture',
    model: 'Olivia',
    publication: 'Bridal Magazine',
    dp: 'Romance Creations',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671236ee22391f7f18795637_T641-p-500.png',
  },
  {
    id: 6,
    title: 'Travel Diaries',
    slug: 'travel-diaries',
    model: 'Noah',
    publication: 'National Geographic',
    dp: 'Adventure Lens',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671b5ebbdc1d4ae848fa87c7_381%20(5)qwss-p-500.jpg',
  },
  {
    id: 7,
    title: 'Tech Innovations',
    slug: 'tech-innovations',
    model: 'Sophia',
    publication: 'TechCrunch',
    dp: 'InnoHub',
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6717489818419bdb3551c791_DSC06216-p-500.jpg',
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

export const PortfolioView = () => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const { isLogin } = useAuth();

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleOpenPortfolioRightPanel = () => {
    setOpenPortfolioRightPanel(true);
  };

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getPortfolioListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const handlePagination = (event, value) => {
    setPagination({ ...pagination, pageNo: value });
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination]);

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{px: 2}}>
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
      >
        {slider_data.map((item, index) => (
          <SwiperSlide key={index}>
            <PortfolioSliderItem item={item} index={index}  />
          </SwiperSlide>
        ))}
      </SliderWrapper>
      </Box>
      {isLogin && (
        <QuickToolbar closePopover={openPortfolioRightPanel}>
          <Stack direction="column" spacing={3} justifyContent={'center'} alignItems={'center'} p={1}>
            <IconButton variant="text" size="small" title="Add " onClick={handleOpenPortfolioRightPanel}>
              <Iconify icon="iconoir:plus" title="Add Portfolio" />
            </IconButton>
            <IconButton
              variant="text"
              size="small"
              title="Card View"
              onClick={() => handleToggleViewMode('grid')}
              sx={{
                backgroundColor: viewMode === 'grid' ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: viewMode === 'grid' ? 'action.selected' : 'action.hover',
                },
              }}
            >
              <Iconify icon="fluent:grid-16-filled" />
            </IconButton>
            <IconButton
              variant="text"
              size="small"
              title="List View"
              onClick={() => handleToggleViewMode('list')}
              sx={{
                backgroundColor: viewMode === 'list' ? 'action.selected' : 'transparent',
                ':hover': { backgroundColor: viewMode === 'list' ? 'action.selected' : 'action.hover' },
              }}
            >
              <Iconify icon="fluent:list-16-regular" />
            </IconButton>
          </Stack>
        </QuickToolbar>
      )}
      {viewMode === 'list' ? (
        <PortfolioListView totalRecords={totalRecords} fetchList={fetchList} data={data} loading={loading} />
      ) : (
        <Box>
          <PortfolioGridView
            data={data || [defaultPortfolio]}
            fetchList={fetchList}
            loading={loading}
            handlePagination={handlePagination}
          />
          <Stack mt={2} justifyContent="center" alignItems="center">
            <Pagination
              count={Math.ceil(totalRecords / pagination.limit)}
              page={pagination.pageNo}
              variant="outlined"
              shape="rounded"
              onChange={handlePagination}
            />
          </Stack>
        </Box>
      )}

      <ManagePortfolioRightPanel
        id={''}
        data={null}
        open={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </Box>
  );
};
