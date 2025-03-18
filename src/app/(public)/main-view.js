'use client';

import { Box } from '@mui/material';

import { ContentSection } from './components/home/content-section';
import { HeroSection } from './components/home/hero-section';
import { PortfolioSectionNew } from './components/home/portfolio-sectionNew';
import { OurApproachSection } from './components/home/our-approach-section';
import { PortfolioSection } from './components/home/portfolio-section';
import { JobSection } from './components/home/job-section';
import { PartnerSection } from './components/home/partner-section';
// import { CampaignSection } from './components/home/campaign-section';
// import { CampaignSectionOld } from './components/home/campaign-section-old';

export const MainView = () => {
  return (
    <Box sx={{ border: '3px solid red)' }}>
      <HeroSection />
      <OurApproachSection isSecondHorizontal={false}/>
      <ContentSection />
      <PortfolioSectionNew />
      {/* <PortfolioSection /> */}
      {/* <JobSection /> */}
      {/* <PartnerSection /> */}
      {/* <CampaignSection /> */}
      {/* <CampaignSectionOld /> */}
      <OurApproachSection isSecondHorizontal={true}/>
    </Box>
  );
};
