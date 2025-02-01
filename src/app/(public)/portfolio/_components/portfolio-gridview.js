'use client';

import { PageHeader } from '@/components/core/page-header';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { Box, Button, Card, Popover, Rating, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import React from 'react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import useAuth from '@/hooks/useAuth';

import { portfolioFilters, portfolioSorting, portfolioTags } from '../_lib/constants';
import { deletePortfolioAsync } from '../_lib/portfolio.actions';
import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioSliderItem } from './portfolio-slider-item';

export const PortfolioGridView = ({ data, fetchList, loading, handlePagination }) => {
  const handleFilterChange = (type, value) => {
    console.log(type, value);
  };

  const slider_data = data.filter((item) => item.featured);
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
              <PortfolioSliderItem item={item} index={index} fetchList={fetchList} />
            </SwiperSlide>
          ))}
        </SliderWrapper>
      </Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={2} columns={{ xs: 14 }} sx={{ mt: 2 }}>
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
  const { isLogin } = useAuth();
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const [isShowCommentField, setIsShowCommentField] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [editComment, setEditComment] = React.useState(false);
  const [isShowReactPopover, setIsShowReactPopover] = React.useState(null);
  const [emoji, setEmoji] = React.useState(null);

  const handleShowCommentField = (event) => {
    setIsShowCommentField(event.currentTarget);
  };

  const handleReactPopoverOpen = (event) => {
    setIsShowReactPopover(event.currentTarget);
  };

  const handleReactPopoverClose = () => {
    setIsShowReactPopover(null);
  };

  const handleCloseCommentField = () => {
    setIsShowCommentField(null);
  };

  console.log("comment field", isShowCommentField);
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
    <>
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
          '&:hover .portfolio-card-overlay': {
            opacity: 1,
          },
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
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
            alt={item.title}
            draggable={false}
            style={{
              objectFit: 'cover',
              filter: 'blur(20px)',
              transition: 'filter 0.2s ease-out',
            }}
            loading="lazy"
            sizes="100vw"
            fill={true}
            onLoad={(e) => {
              e.target.style.filter = 'blur(0px)';
            }}
          />
        )}
        <Stack direction='column' justifyContent='space-between' className='portfolio-card-overlay' sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, p: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', opacity: (!!isShowCommentField || !!isShowReactPopover) ? 1 : 0, transition: 'all 0.3s ease-in-out' }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Rating value={3} size='small' />
            <Stack direction='row' alignItems='center' sx={{ zIndex: 100 }}>
              <Button variant="text" size='small' sx={{ color: '#fff' }} onClick={(e) => {
                e.stopPropagation()
                handleShowCommentField(e)
              }}>
                <Iconify icon="ant-design:message-outlined" width={20} />
              </Button>
              <Button variant="text" size='small' sx={{ color: '#fff' }} onClick={(e) => {
                e.stopPropagation()
                handleReactPopoverOpen(e)
              }}>
                {
                  emoji ? (
                    <Typography>{emoji}</Typography>
                  ) : (
                    <Iconify icon="material-symbols-light:add-reaction-outline" width={20} />
                  )
                }
              </Button>
            </Stack>
          </Stack>
          <Stack direction='row'>
            <Box>
              <Typography sx={{ fontSize: '1.1rem' }}>Image title</Typography>
              <Stack direction='row' alignItems='center' gap='2px'>
                <Typography sx={{ fontSize: '0.7rem' }}>PNG</Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} />
                <Typography sx={{ fontSize: '0.7rem' }}>1100x1233</Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} />
                <Typography sx={{ fontSize: '0.7rem' }}>2.1MB</Typography>
              </Stack>
            </Box>
          </Stack>
          <Popover
            id={Boolean(isShowCommentField) ? 'comment-popover' : undefined}
            open={Boolean(isShowCommentField)}
            anchorEl={isShowCommentField}
            onClose={handleCloseCommentField}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {
              editComment ? (
                <Stack direction='row' alignItems='center' gap={1} sx={{ p: 1 }}>
                  <TextField value={comment} onChange={(e) => setComment(e.target.value)} size='small' />
                  <Iconify
                    onClick={() => {
                      handleCloseCommentField();
                      setEditComment(false)
                    }}
                    icon='subway:tick'
                    sx={{ cursor: 'pointer' }}
                  />
                </Stack>
              ) : (
                <Stack direction='row' alignItems='center' gap={1} sx={{ p: 1 }}>
                  <Typography sx={{ fontSize: '0.8rem' }}>The comment of the image</Typography>
                  <Iconify onClick={() => setEditComment(true)} icon='material-symbols:edit-outline-rounded' sx={{ cursor: 'pointer' }} />
                </Stack>
              )
            }

          </Popover>
          <Popover
            id={Boolean(isShowReactPopover) ? 'react-popover' : undefined}
            open={Boolean(isShowReactPopover)}
            anchorEl={isShowReactPopover}
            onClose={handleReactPopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Stack direction='row' alignItems='center'>
              <Button variant='text' size='small' onClick={() => {
                setEmoji('❤️')
                handleReactPopoverClose()
              }}>❤️</Button>
              <Button variant='text' size='small' onClick={() => {
                setEmoji('👍')
                handleReactPopoverClose()
              }}>👍</Button>
              <Button variant='text' size='small' onClick={() => {
                setEmoji('👎')
                handleReactPopoverClose()
              }}>👎</Button>
              <Button variant='text' size='small' onClick={() => {
                setEmoji('✅')
                handleReactPopoverClose()
              }}>✅</Button>
            </Stack>
          </Popover>
        </Stack>
        {/* {item.featured && (
        <Stack
          direction="row"
          justifyContent={'flex-end'}
          sx={{ position: 'absolute', top: 20, right: 10, width: '100%' }}
        >
          <Iconify icon="fluent-color:star-16" width={25} height={25} />
        </Stack>
      )} */}

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













{/* <Stack
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
          {item.category &&
            item.category
              .split(',')
              .map((category, index) => (
                <Chip key={index} label={category.trim()} size="small" sx={{ backgroundColor: getRandomColor() }} />
              ))}
        </Box>
      </Stack> */}