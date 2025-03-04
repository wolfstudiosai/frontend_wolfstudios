'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

export const HeroSection = () => {
  const [boxSize, setBoxSize] = useState(60); // Initial width percentage
  const [boxHeight, setBoxHeight] = useState(60); // Initial height percentage

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500; // Scroll range for expansion

      // Calculate new size between 50% and 100%
      const newWidth = Math.min(100, Math.max(50, 50 + (scrollPosition / maxScroll) * 50));
      const newHeight = Math.min(100, Math.max(60, 60 + (scrollPosition / maxScroll) * 40)); // Expands height too

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
          height: '40rem',
          overflow: 'hidden',
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '50vh',
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
            background: 'linear-gradient(to bottom, rgba(45, 45, 45, 0.7), rgba(78, 64, 57, 0.9))',
          }}
        />

        {/* Text Content */}
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
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Wolf Studios® – Every Shoot Tells a Story.
          </Typography>
          <Typography fontSize={21}>
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </Box>
      </Box>

      {/* Content Below */}
      <Box sx={{ position: 'relative', py: 4, width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" sx={{ alignItems: 'center', position: 'relative', width: '100%' }}>
          {/* Fixed Text Section (Will Not Shrink) */}
          <Typography fontSize={21} sx={{ width: '40%', minWidth: '40%', pr: 2, position: 'relative' }}>
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>

          {/* Expanding Box (Will Overflow Over Text) */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              width: `${boxSize}%`, // Expands from 50% to 100%
              height: `90vh`, // Expands from 60vh to 100vh
              border: '2px solid red',
              bgcolor: '#333',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'width 0.3s ease, height 0.3s ease', // Smooth transition
            }}
          >
            <Box sx={{ border: '2px solid red', bgcolor: 'red', paddingY: '10px', color: 'white', zIndex: 1 }}>
              Text to Gain
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
