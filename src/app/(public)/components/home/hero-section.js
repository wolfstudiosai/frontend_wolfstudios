'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const HeroSection = () => {
  return (
    <>
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
            height: '100%',
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
          <Typography variant="p" fontSize={21}>
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </Box>
      </Box>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          {' '}
          <Typography variant="p" fontSize={21}>
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>hello</Grid>
      </Grid>
    </>
  );
};
