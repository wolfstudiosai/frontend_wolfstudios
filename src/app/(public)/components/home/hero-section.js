'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { FadeIn } from '/src/components/animation/fade-in';

export const HeroSection = () => {
  const [boxSize, setBoxSize] = useState(50);
  const [boxHeight, setBoxHeight] = useState(60);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500;

      const newWidth = Math.min(100, Math.max(50, 50 + (scrollPosition / maxScroll) * 50));
      const newHeight = Math.min(100, Math.max(60, 60 + (scrollPosition / maxScroll) * 40));

      setBoxSize(newWidth);
      setBoxHeight(newHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Video Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '35rem',
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
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        >
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
        </video>

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
            bottom: '5%',
            left: '2%',
            color: '#fff',
            width: '90%',
            maxWidth: '1020px',
            textAlign: 'left',
          }}
        >
          <FadeIn>
            <Typography fontSize={{ xs: '1rem', md: '3.2rem' }} fontWeight={600}>
              Wolf Studios® – Every Shoot Tells a Story.
            </Typography>

            <Typography fontSize={21}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
        </Box>
      </Box>

      {/* second part */}
      <Stack
        direction="row"
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: `${boxHeight}vh`,
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ scaleX: 0, scaleY: 0, originX: 1, originY: 1 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#DFDED8',
            zIndex: -1,
          }}
        />
        <FadeIn>
          <Typography
            fontSize={{ xs: '1rem', md: '1.8rem' }}
            fontWeight={'bold'}
            sx={{ width: '40%', minWidth: '40%', p: 4, color: 'text.primary' }}
            gutterBottom
          >
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </FadeIn>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: `${boxSize}%`,
            minHeight: `${boxHeight}vh`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s ease, min-height 0.3s ease',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: `100%`,
              objectFit: 'cover',
              objectPosition: 'top center',
              // boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25), 0px 5px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <source src="/videos/hero_bg.mp4" type="video/mp4" />
          </video>
        </Box>
      </Stack>
    </>
  );
};
