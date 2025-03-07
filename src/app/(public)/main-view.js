'use client';

import { Box } from '@mui/material';

import { CampaignSection } from './components/home/campaign-section';
// import { CampaignSectionOld } from './components/home/campaign-section-old';
import { HeroSection } from './components/home/hero-section';
import { JobSection } from './components/home/job-section';
import { PartnerSection } from './components/home/partner-section';
import { PortfolioSection } from './components/home/portfolio-section';

export const MainView = () => {
  return (
    <Box sx={{ border: '3px solid red)' }}>
      <HeroSection />
      <PortfolioSection />
      <PartnerSection />
      <CampaignSection />
      {/* <CampaignSectionOld /> */}
      <JobSection />
    </Box>
  );
};
