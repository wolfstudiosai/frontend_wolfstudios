'use client';

import { Box } from '@mui/material';

// import { CampaignSection } from './components/home/campaign-section';
// import { CampaignSectionOld } from './components/home/campaign-section-old';
import { ContentSection } from './components/home/content-section';
import { HeroSection } from './components/home/hero-section';
import { JobSection } from './components/home/job-section';
import { PartnerSection } from './components/home/partner-section';
import { PortfolioSection } from './components/home/portfolio-section';
import { PartnerSectionNew } from './components/home/partner-sectionNew';

export const MainView = () => {
  return (
    <Box sx={{ border: '3px solid red)' }}>
      <HeroSection />
      <ContentSection />
      <PortfolioSection />
      <JobSection />
      {/* <PartnerSectionNew/> */}
      <PartnerSection />
      {/* <CampaignSection /> */}
      {/* <CampaignSectionOld /> */}
    </Box>
  );
};
