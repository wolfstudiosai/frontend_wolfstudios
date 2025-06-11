'use client';

import React from 'react';
import Image from 'next/image';
import { Add, Message } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, Button, Card, Chip, Divider, Popover, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { PageLoader } from '/src/components/loaders/PageLoader';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioSliderItem } from './portfolio-slider-item';
import { getFancyColor, isVideoContent } from '/src/utils/helper';

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
        <Grid container spacing={0} columns={{ xs: 36 }} sx={{ mt: 2 }}>
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

export const PortfolioCardOld = ({ item, fetchList, sx, infoSx }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);

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
          ...sx,
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
              src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/'}
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
            ...infoSx,
          }}
        >
          <Typography fontWeight={400} color="var(--mui-palette-common-white)" fontSize={{ xs: 12, md: 14 }}>
            {(item.ProjectTitle || '').split(/\s+/).slice(0, 4).join(' ') +
              (item.ProjectTitle?.split(/\s+/)?.length > 4 ? '...' : '')}
          </Typography>
          {/* Thin Line */}
          <Box
            sx={{
              width: '100%',
              height: '0.8px',
              margin: '4px 0',
            }}
          />
          <Stack direction={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'} mt={1}>
            <Typography variant="body" color="var(--mui-palette-common-white)" sx={{ fontSize: '12px' }}>
              {item.ByStatesPortfolios?.map((state) => state?.ByStates?.Name).join(', ')}
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {item?.PortfolioCategoriesPortfolios?.map(
                (portfolio, index) =>
                  portfolio?.PortfolioCategories && (
                    <Chip
                      key={index}
                      label={portfolio.PortfolioCategories.Name}
                      size="small"
                      sx={{
                        backgroundColor: getFancyColor(index),
                        fontSize: '10px',
                        fontWeight: 400,
                        color: 'var(--mui-palette-common-white)',
                      }}
                      className="category-chip"
                    />
                  )
              )}
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

export const PortfolioCard = ({ item, fetchList, sx, infoSx }) => {
  const profileData = {
    name: item?.ProjectTitle,
    location: 'Riyadh, Saudi Arabia',
    avatar: item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/',
    status: item?.PortfolioCategoriesPortfolios?.map((category) => category?.PortfolioCategories?.Name),
    stats: {
      instagram: '38.7K',
      tiktok: '725.5K',
      youtube: '625.3K',
    },
  };

  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const popoverTimeoutRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [values, setValues] = React.useState([]);

  React.useEffect(() => {
    return () => {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current);
      }
    };
  }, []);

  const handlePopoverOpen = (event) => {
    // Cancel any pending close
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current);
      popoverTimeoutRef.current = null;
    }
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    // Set a timeout to close the popover
    popoverTimeoutRef.current = setTimeout(() => {
      setIsPopoverOpen(false);
    }, 300);
  };

  const handlePopoverKeepOpen = () => {
    // Cancel any pending close when entering the popover
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current);
      popoverTimeoutRef.current = null;
    }
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsPopoverOpen(false);
    setShowModal(!showModal);
  };

  const handleMenuOpen = () => {};

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const open = isPopoverOpen && Boolean(anchorEl);

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
          borderRadius: '0',
          border: 'solid .1px var(--mui-palette-divider)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          '&:hover .menu-icon': {
            opacity: 1,
          },
          '&:hover .image-container': {
            opacity: 0.8,
          },
          ...sx,
        }}
        onClick={() => setOpenPortfolioRightPanel(item)}
      >
        {/* top menu icon button */}
        <Box
          className="menu-icon"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
          }}
        >
          <IconButton size="small" onClick={handleMenuOpen} sx={{ color: 'white' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className="image-container" sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {isVideoContent(item.thumbnail || '') ? (
            <Box
              component="video"
              src={item.thumbnail}
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
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/'}
                alt={item.title || 'Portfolio Image'}
                draggable={false}
                style={{
                  objectFit: 'cover',
                  filter: 'blur(20px)',
                  transition: 'filter 0.2s ease-out',
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                onLoad={(e) => {
                  e.target.style.filter = 'blur(0px)';
                }}
              />
            </Box>
          )}

          {/* Title Overlay */}
          <Stack
            direction="column"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            }}
          >
            <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
              {(item.ProjectTitle || '').split(/\s+/).slice(0, 4).join(' ') +
                (item.ProjectTitle?.split(/\s+/)?.length > 4 ? '...' : '')}
            </Typography>
            {/* Thin Line */}
            <Box
              sx={{
                width: '100%',
                height: '0.8px',
                margin: '4px 0',
                background: 'var(--mui-palette-divider)',
              }}
            />
          </Stack>
        </Box>

        <ManagePortfolioRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openPortfolioRightPanel ? true : false}
          data={openPortfolioRightPanel}
          onClose={() => setOpenPortfolioRightPanel(false)}
        />
      </Card>

      <Box
        sx={{
          flex: 0.1,
          p: 1,
          backgroundColor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              maxWidth: '60%',
            }}
          >
            {/* Thumbnail Circle */}
            {item.ByStatesPortfolios?.length > 0 && (
              <Box
                aria-owns={open ? 'state-popover' : undefined}
                aria-haspopup="true"
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={item?.SinglePageHeroImage}
                  // onMouseEnter={handlePopoverOpen}
                  // onMouseLeave={handlePopoverClose}
                  sx={{
                    width: 20,
                    height: 20,
                    border: '1px solid var(--mui-palette-divider)',
                    backgroundColor: 'background.paper',
                    cursor: 'pointer',
                  }}
                />
              </Box>
            )}

            <Typography
              variant="body"
              color="white"
              sx={{
                fontSize: '13px',
                maxWidth: '90%',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'var(--mui-palette-text-primary)',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.ByStatesPortfolios?.map((state) => state?.ByStates?.Name).join(', ')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              alignItems: 'center',
              maxWidth: '40%',
              justifyContent: 'flex-end',
            }}
          >
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                50
              </Typography>
            </Box>
            {/* Views */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                257
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Thumbnail hover Popover */}
      <Popover
        id="state-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => {
          if (!popoverTimeoutRef.current) {
            setIsPopoverOpen(false);
          }
        }}
        disableRestoreFocus
        disableScrollLock
        sx={{
          pointerEvents: 'auto',
          '& .MuiPopover-paper': {
            p: 0,
            maxWidth: '360px',
            width: '360px',
            borderRadius: '12px',
            boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          },
        }}
        PaperProps={{
          onMouseEnter: handlePopoverKeepOpen,
          onMouseLeave: handlePopoverClose,
        }}
      >
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            p: 3,
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <Avatar
            src={profileData.avatar}
            sx={{
              width: 80,
              height: 80,
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              mb: 2,
            }}
          />

          {/* Name */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5, textAlign: 'center' }}>
            {profileData.name}
          </Typography>

          {/* Location */}
          {/* <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
            <LocationOn fontSize="small" sx={{ color: "text.secondary", fontSize: 16 }} />
            <Typography variant="body2" color="text.secondary">
              {profileData.location}
            </Typography>
          </Stack> */}

          {/* Status Tags */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'purple',
                fontWeight: 500,
              }}
            >
              {profileData.status[0]}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'teal',
                fontWeight: 500,
              }}
            >
              {profileData.status[1]}
            </Typography>
          </Stack>

          {/* Stats */}
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{
              width: '100%',
              mb: 3,
              justifyContent: 'space-between',
              px: 1,
            }}
          >
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {profileData.stats.instagram}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Instagram
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {profileData.stats.tiktok}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                TikTok
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {profileData.stats.youtube}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Youtube
              </Typography>
            </Box>
          </Stack>

          {/* Buttons */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            sx={{
              mb: 1.5,
              bgcolor: '#1976d2',
              color: 'white',
              py: 1,
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                bgcolor: '#1565c0',
              },
            }}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Message />}
            sx={{
              bgcolor: '#f5f5f5',
              color: '#1976d2',
              border: 'none',
              py: 1,
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                bgcolor: '#e0e0e0',
                border: 'none',
              },
            }}
            onClick={toggleModal}
          >
            Message
          </Button>
        </Box>
      </Popover>

      {/* Slide-up Message Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1300,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              onClick={toggleModal}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                }}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  backgroundColor: 'white',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  overflow: 'hidden',
                  padding: 0,
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  marginRight: '16px',
                  marginBottom: '16px',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header with close button */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    {/* Avatar */}
                    <Avatar
                      src={profileData.avatar}
                      sx={{
                        width: 40,
                        height: 40,
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        mb: 0,
                      }}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      {profileData.name}
                    </Typography>
                  </Stack>
                  <IconButton onClick={toggleModal} size="small">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      ✕
                    </Box>
                  </IconButton>
                </Box>

                {/* Modal Body */}
                <Box
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    p: 3,
                    pt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Avatar */}
                  <Avatar
                    src={profileData.avatar}
                    sx={{
                      width: 80,
                      height: 80,
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      mb: 2,
                    }}
                  />

                  {/* Name */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5, textAlign: 'center' }}>
                    {profileData.name}
                  </Typography>

                  {/* Divider */}
                  <Divider sx={{ width: '100%', color: 'var(--mui-palette-divider)', mb: 2 }} />

                  {/* Buttons */}
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    gap={1}
                    alignItems={'center'}
                  >
                    <CustomTextField
                      name="message"
                      label=""
                      value={values.message}
                      placeholder="Enter your message"
                      onChange={handleChange}
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: '#f5f5f5',
                        color: '#1976d2',
                        border: 'none',
                        py: 1,
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#e0e0e0',
                          border: 'none',
                        },
                      }}
                    >
                      Send
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
