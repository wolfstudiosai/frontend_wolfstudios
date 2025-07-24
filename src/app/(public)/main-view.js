'use client';

import { Box } from '@mui/material';

import { ContentSection } from './components/home/content-section';
import { HeroSection } from './components/home/hero-section';
import { PartnerSectionNew } from './components/home/partner-sectionNew';
import { PortfolioSection } from './components/home/portfolio-section';
import { SpacesSection } from './components/home/spaces-section';
import { FooterAnimation } from './components/home/footer-animation';
import { CampaignSection } from './components/home/campaign-section';

export const MainView = () => {
  return (
    <Box>
      <HeroSection />
      <PortfolioSection />
      <ContentSection />
      <CampaignSection />
      <SpacesSection />
      <PartnerSectionNew />
      <FooterAnimation />
    </Box>
  );
};
