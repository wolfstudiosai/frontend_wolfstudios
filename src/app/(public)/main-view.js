'use client';

import { Box } from '@mui/material';

import { ContentSection } from './components/home/content-section';
import { HeroSection } from './components/home/hero-section';
import { PartnerSectionNew } from './components/home/partner-sectionNew';
import { PortfolioSection } from './components/home/portfolio-section';
import { PortfolioSectionNew } from './components/home/portfolio-sectionNew';

export const MainView = () => {
  return (
    <Box>
      <HeroSection />
      <PortfolioSection />
      <ContentSection />
      <PortfolioSectionNew />
      <PartnerSectionNew isSecondHorizontal={true} />
    </Box>
  );
};
