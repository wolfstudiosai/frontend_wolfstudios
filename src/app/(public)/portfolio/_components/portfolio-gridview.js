'use client';

import React from 'react';
import Image from 'next/image';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { SliderWrapper } from '@/components/slider/slider-wrapper';
import { extractFilenameAndType } from '@/utils/utils';
import { Box, Button, Card, Popover, Rating, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
  const { fileName, fileType } = extractFilenameAndType(item.thumbnail);
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const [showPopover, setShowPopover] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [popoverValues, setPopoverValues] = React.useState({
    comment: '',
    rating: 0,
    emoji: '',
  });

  const handleClosePopover = () => {
    setShowPopover('');
    setAnchorEl(null);
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
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
          '&:hover .portfolio-card-overlay': {
            opacity: 1,
          },
        }}
        onClick={(e) => {
          if (e.target.closest('.rating') || e.target.closest('.popover')) {
            return;
          }
          setOpenPortfolioRightPanel(item);
        }}
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
            {popoverValues.rating > 0 ? <Rating value={popoverValues.rating} size="small" readOnly /> : <Box></Box>}
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
                {popoverValues.emoji ? (
                  <Typography>{popoverValues.emoji}</Typography>
                ) : (
                  <Iconify icon="material-symbols-light:add-reaction-outline" width={20} />
                )}
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Box>
              <Typography sx={{ fontSize: '1.1rem', color: 'var(--mui-palette-common-white)' }}>{fileName}</Typography>
              <Stack direction="row" alignItems="center" gap="2px">
                <Typography sx={{ fontSize: '0.7rem', color: 'var(--mui-palette-common-white)' }}>
                  {fileType}
                </Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} color="var(--mui-palette-common-white)" />
                <Typography sx={{ fontSize: '0.7rem', color: 'var(--mui-palette-common-white)' }}>1100x1233</Typography>
                <Iconify icon="radix-icons:dot-filled" width={12} color="var(--mui-palette-common-white)" />
                <Typography sx={{ fontSize: '0.7rem', color: 'var(--mui-palette-common-white)' }}>2.1MB</Typography>
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
            onClick={(e) => e.stopPropagation()}
          >
            {openCommentBox ? (
              <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                <TextField
                  value={popoverValues.comment}
                  onChange={(e) => setPopoverValues((prev) => ({ ...prev, comment: e.target.value }))}
                  size="small"
                />
                <Iconify
                  onClick={handleClosePopover}
                  icon="subway:tick"
                  sx={{ cursor: 'pointer' }}
                  width={10}
                  height={10}
                />
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1 }}>
                <Typography sx={{ fontSize: '0.8rem' }}>
                  {popoverValues.comment ? popoverValues.comment : 'Add a comment...'}
                </Typography>
                <Iconify
                  onClick={() => setOpenCommentBox(true)}
                  icon="material-symbols:edit-outline-rounded"
                  sx={{ cursor: 'pointer' }}
                  width={15}
                  height={15}
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
            onClick={(e) => e.stopPropagation()}
          >
            <Stack direction="row" alignItems="center">
              {['❤️', '👍', '👎', '✅'].map((emoji) => (
                <Button
                  key={emoji}
                  variant="text"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopoverValues((prev) => ({ ...prev, emoji: emoji }));
                    handleClosePopover();
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </Stack>
            <Rating
              value={popoverValues.rating}
              size="small"
              onChange={(e, value) => {
                e.stopPropagation();
                setPopoverValues((prev) => ({ ...prev, rating: value }));
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
