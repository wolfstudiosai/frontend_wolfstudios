'use client';

import { Box, Typography } from '@mui/material';

import { HeroSection } from './components/home/hero-section';
import { PartnerSection } from './components/home/partner-section';
import { PortfolioSection } from './components/home/portfolio-section';
import { CampaignSection } from './components/home/campaign-section';

export const MainView = () => {
  return (
    <Box sx={{ border: '3px solid red)' }}>
      <HeroSection />
      <PortfolioSection />
      <PartnerSection />
      <CampaignSection />
      <PartnerSection />
    </Box>
  );
};
