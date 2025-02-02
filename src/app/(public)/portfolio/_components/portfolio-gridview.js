'use client';

import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { Box, Button, Card, Popover, Rating, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import React from 'react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioSliderItem } from './portfolio-slider-item';

export const PortfolioGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
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
              <PortfolioSliderItem item={item} index={index} fetchList={fetchList} />
            </SwiperSlide>
          ))}
        </SliderWrapper>
      </Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={1} columns={{ xs: 28 }} sx={{ mt: 2 }}>
          {data.map((portfolio, index) => (
            <Grid item size={{ xs: 12, md: colums }} key={index}>
              <PortfolioCard item={portfolio} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

const PortfolioCard = ({ item, fetchList }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const [showPopover, setShowPopover] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [emoji, setEmoji] = React.useState('');

  const handleClosePopover = () => {
    setShowPopover('');
    setAnchorEl(null);
  };

  // const handleCloseCommentField = () => {
  //   setIsShowCommentField(null);
  // };

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
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: 'solid .1px var(--mui-palette-divider)',
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
        <Stack
          direction="column"
          justifyContent="space-between"
          className="portfolio-card-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            p: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: showPopover ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {rating > 0 ? <Rating value={rating} size="small" readOnly /> : <Box></Box>}
            <Stack direction="row" alignItems="center" sx={{ zIndex: 100 }}>
              <Button
                variant="text"
                size="small"
                sx={{ color: '#fff' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget);
                  setShowPopover('comment');
                }}
              >
                <Iconify icon="ant-design:message-outlined" width={20} />
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ color: '#fff' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget);
                  // handleReactPopoverOpen(e);
                  setShowPopover('emoji');
                }}
              >
                {showPopover === 'emoji' ? (
                  <Typography>{emoji}</Typography>
                ) : (
                  <Iconify icon="material-symbols-light:add-reaction-outline" width={20} />
                )}
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Box>
              <Typography sx={{ fontSize: '1.1rem' }}>Image title</Typography>
              <Stack direction="row" alignItems="center" gap="2px">
                <Typography sx={{ fontSize: '0.7rem' }}>PNG</Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} />
                <Typography sx={{ fontSize: '0.7rem' }}>1100x1233</Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} />
                <Typography sx={{ fontSize: '0.7rem' }}>2.1MB</Typography>
              </Stack>
            </Box>
          </Stack>
          <Popover
            id={Boolean(showPopover === 'comment') ? 'comment-popover' : undefined}
            open={Boolean(showPopover === 'comment')}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            // onClick={(e) => e.stopPropagation()}
          >
            {showPopover === 'comment' ? (
              <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                <TextField value={comment} onChange={(e) => setComment(e.target.value)} size="small" />
                <Iconify onClick={handleClosePopover} icon="subway:tick" sx={{ cursor: 'pointer' }} />
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                <Typography sx={{ fontSize: '0.8rem' }}>The comment of the image</Typography>
                <Iconify
                  onClick={() => setAnchorEl(e.currentTarget)}
                  icon="material-symbols:edit-outline-rounded"
                  sx={{ cursor: 'pointer' }}
                />
              </Stack>
            )}
          </Popover>
          <Popover
            id={showPopover === 'emoji' ? 'react-popover' : undefined}
            open={showPopover === 'emoji'}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Stack direction="row" alignItems="center">
              {['❤️', '👍', '👎', '✅'].map((emoji) => (
                <Button
                  key={emoji}
                  variant="text"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEmoji(emoji);
                    handleClosePopover();
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </Stack>
            <Rating
              value={rating}
              size="small"
              onChange={(e, value) => {
                e.stopPropagation();
                setRating(value);
                handleClosePopover();
              }}
            />
          </Popover>
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
