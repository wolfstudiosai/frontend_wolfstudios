'use client';

import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';
import { FadeIn } from '/src/components/animation/fade-in';

import { VideoUploadModal } from '../modals/VideoUploadModal';

export const HeroSection = () => {
  const theme = useTheme();
  const { isFeaturedCardVisible } = useSettings();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userInfo } = useAuth();

  const isAdmin = userInfo?.role === 'SUPER_ADMIN';

  const [boxSize, setBoxSize] = useState(isMobile ? 100 : 50);
  const [boxHeight, setBoxHeight] = useState(isMobile ? 100 : 60);

  const [activeVideo, setActiveVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleEditVideo = (type) => {
    setActiveVideo(type);
    setModalOpen(true);
  };

  return (
    <>
      {/* Top Video Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          overflow: 'hidden',
        }}
      >
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
          <source src="https://cdn.wolfstudios.ai/homepage/hero_bg_v2.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(45, 45, 45, 0.1), rgba(78, 64, 57, 0.6))',
          }}
        />

        {/* Admin Edit Icon for Top Video */}
        {isAdmin && (
          <IconButton
            onClick={() => handleEditVideo('hero')}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <EditIcon />
          </IconButton>
        )}

        {/* Text Overlay */}
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
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
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
              fontWeight="semibold"
              sx={{ color: 'text.primary', width: { xs: '100%', md: '50%' } }}
            >
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </FadeIn>

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
            <source src="https://cdn.wolfstudios.ai/homepage/Sexy+Hair+Reel.mp4" type="video/mp4" />
          </video>

          {/* Admin Edit Icon for Second Video */}
          {isAdmin && (
            <IconButton
              onClick={() => handleEditVideo('product')}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Stack>

      {/* Video Modal Implementation */}
      <VideoUploadModal
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={`Upload ${activeVideo === 'hero' ? 'Hero' : 'Product'} Video`}
        onSave={(file) => {
          console.log('Uploaded video file:', file);
          // Save to backend or update video preview state
        }}
        existingVideoUrl={
          activeVideo === 'hero'
            ? 'https://cdn.wolfstudios.ai/homepage/hero_bg_v2.mp4'
            : 'https://cdn.wolfstudios.ai/homepage/Sexy+Hair+Reel.mp4'
        }
      />
    </>
  );
};
