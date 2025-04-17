'use client';

import { Box } from '@mui/material';

import { ContentSection } from './components/home/content-section';
import { FooterAnimation } from './components/home/footer-animation';
import { HeroSection } from './components/home/hero-section';
import { PartnerSectionNew } from './components/home/partner-sectionNew';
import { PortfolioSection } from './components/home/portfolio-section';
import { PortfolioSectionNew } from './components/home/portfolio-sectionNew';
// import { OurApproachSection } from './components/home/our-approach-section';
// import { CampaignSection } from './components/home/campaign-section';
// import { CampaignSectionOld } from './components/home/campaign-section-old';

export const MainView = () => {
  return (
    <Box>
      <HeroSection />
      <PortfolioSection/>
      <ContentSection />
      <PortfolioSectionNew />
      <PartnerSectionNew isSecondHorizontal={true} />
      <FooterAnimation />
      {/* <OurApproachSection isSecondHorizontal={false} /> */}
      {/* <PortfolioSection /> */}
      {/* <JobSection /> */}
      {/* <CampaignSection /> */}
      {/* <CampaignSectionOld /> */}
      {/* <OurApproachSection isSecondHorizontal={true}/> */}
    </Box>
  );
};
