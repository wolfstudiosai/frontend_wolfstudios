'use client';

import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { FadeIn } from '/src/components/animation/fade-in';
import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';

import { Iconify } from '../../../../components/iconify/iconify';
import { MediaUploader } from '../../../../components/uploaders/media-uploader';
import { updateHomepageContentAsync } from '../../../../lib/common.actions';
import { useHomepageContent } from '../../../../services/home/useHomepageContent';
import { getMediaTypeFromUrl } from '../../../../utils/get-media-type';

export const HeroSection = () => {
  const theme = useTheme();
  const { isFeaturedCardVisible } = useSettings();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLogin, userInfo } = useAuth();
  const { data, error, isLoading, mutate } = useHomepageContent();

  // const isImageEditable = isLogin && userInfo?.role.toLowerCase() === 'super_admin';
  const isImageEditable = isLogin;

  const [boxSize, setBoxSize] = useState(isMobile ? 100 : 50);
  const [boxHeight, setBoxHeight] = useState(isMobile ? 100 : 60);
  const [uploadImage, setUploadImage] = useState({
    open: false,
    order: 0,
  });

  const order1 = data?.data?.find((item) => item.order === 1);
  const order2 = data?.data?.find((item) => item.order === 2);

  const handleImageChange = async (url) => {
    const id = uploadImage.order === 1 ? order1?.id : order2?.id;
    try {
      const mediaUrl = url[0];
      const mediaType = await getMediaTypeFromUrl(mediaUrl);
      const res = await updateHomepageContentAsync(id, {
        id,
        type: mediaType,
        order: uploadImage.order,
        url: url[0],
      });

      if (res.success) {
        toast.success('Media uploaded successfully');
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const scrollableContainer = document.getElementById('scrollable_container');
    const handleScroll = () => {
      if (isMobile) return;
      if (!scrollableContainer) return;

      const scrollPosition = scrollableContainer.scrollTop;
      const maxScroll = 500;

      const newWidth = Math.min(100, Math.max(50, 50 + (scrollPosition / maxScroll) * 50));
      const newHeight = Math.min(100, Math.max(60, 60 + (scrollPosition / maxScroll) * 40));

      setBoxSize(newWidth);
      setBoxHeight(newHeight);
    };

    if (scrollableContainer) {
      scrollableContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    setBoxSize(isMobile ? 100 : 50);
    setBoxHeight(isMobile ? 100 : 60);
  }, [isMobile]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      {/* first part */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          overflow: 'hidden',
        }}
      >
        {isImageEditable && (
          <IconButton
            onClick={() => setUploadImage({ open: true, order: 1 })}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <Iconify icon="iconamoon:edit-thin" sx={{ color: 'var(--mui-palette-neutral-900)' }} />
          </IconButton>
        )}
        {order1?.type === 'IMAGE' ? (
          // Image background
          <Box
            component="img"
            src={order1?.url}
            sx={{
              position: 'absolute',
              top: '-50%',
              width: '100%',
              height: '200%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        ) : (
          // Video background
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: '-50%',
              width: '100%',
              height: '200%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          >
            <source src={order1?.url || 'https://cdn.wolfstudios.ai/homepage/hero_bg_v2.mp4'} type="video/mp4" />
          </video>
        )}

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(45, 45, 45, 0.1), rgba(78, 64, 57, 0.6))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '10%', md: '5%' },
            left: { xs: '1%', md: '1%' },
            color: '#fff',
            width: { xs: '90%', md: '90%' },
            maxWidth: '1020px',
            textAlign: 'left',
          }}
        >
          <FadeIn>
            <Typography fontSize={{ xs: '1.5rem', sm: '2rem', md: '3.2rem' }} fontWeight={600} gutterBottom>
              Wolf Studios® – Every Shoot Tells a Story.
            </Typography>

            <Typography fontSize={{ xs: '1rem', sm: '1.2rem', md: '1.3rem' }}>
              Driven by the art of storytelling gg, we collaborate with brands, creators, and agencies to craft
              compelling visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
        </Box>
      </Box>

      {/* second part */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 'auto', md: `${boxHeight}vh` },
          overflow: 'hidden',
          zIndex: 2,
          backgroundColor: 'var(--mui-palette-background-paper)',
        }}
      >
        {/* Text Content */}
        <FadeIn>
          <Box sx={{ p: { xs: 0.5, md: 2 } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: 'text.primary', mb: { xs: 0, md: 2 } }}
              textTransform="uppercase"
              fontSize={{ xs: '1.5rem', sm: '2rem' }}
            >
              Product Drop
            </Typography>
            <Typography
              fontSize={{ xs: '1rem', md: '1.3rem' }}
              fontWeight={'semibold'}
              sx={{ color: 'text.primary', width: { xs: '100%', md: '50%' } }}
            >
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </FadeIn>

        {/* Video/Image Container */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            right: 0,
            top: 0,
            width: { xs: '100%', md: `${boxSize}%` },
            height: { xs: '300px', sm: '400px', md: `${boxHeight}vh` },
            minHeight: { xs: '300px', sm: '400px', md: `${boxHeight}vh` },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s ease, min-height 0.3s ease',
            order: { xs: 1, md: 2 },
          }}
        >
          {isImageEditable && (
            <IconButton
              onClick={() => setUploadImage({ open: true, order: 2 })}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <Iconify icon="iconamoon:edit-thin" sx={{ color: 'var(--mui-palette-neutral-900)' }} />
            </IconButton>
          )}
          {order2?.type === 'IMAGE' ? (
            // Image background
            <Box
              component="img"
              src={order2?.url}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          ) : (
            // Video background
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            >
              <source src={order2?.url || 'https://cdn.wolfstudios.ai/homepage/Sexy+Hair+Reel.mp4'} type="video/mp4" />
            </video>
          )}
        </Box>
      </Stack>

      <MediaUploader
        open={uploadImage?.open}
        onClose={() => setUploadImage((prev) => ({ ...prev, open: false }))}
        onSave={(paths) => handleImageChange(paths)}
        multiple={false}
      />
    </>
  );
};
