'use client';

import { Box, Typography } from '@mui/material';

import { HeroSection } from './components/home/hero-section';
import { PortfolioSection } from './components/home/portfolio-section';

export const MainView = () => {
  return (
    <Box sx={{ border: '3px solid red)' }}>
      <HeroSection />
      <PortfolioSection />
    </Box>
  );
};
