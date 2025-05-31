

import { PageContainer } from '/src/components/container/PageContainer';

import { ContentPerformance } from './_components/content-performance';
import { Facilities } from './_components/facilities';
import { PartnerMatrix } from './_components/partner-matrix';
import { OnboardingByRegion } from './_components/bar-chart/onboarding-by-region';
import { OnboardingByCreator } from './_components/bar-chart/onboarding-by-creator';
import { TopInfluencers } from './_components/bar-chart/top-influencers';
import { ConversionByContent } from './_components/bar-chart/conversion-by-content';
import { CampaignAssetsDelivered } from './_components/bar-chart/campaign-assets-deliverd';
import Grid from '@mui/material/Grid2';
import AnalyticsBarCharts from './_components/bar-chart/AnalyticsBarCharts';
import { UserDistribution } from './_components/bar-chart/user-distribution';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <ContentPerformance />
      <PartnerMatrix />
      <Facilities />
      <AnalyticsBarCharts />
      <Grid container spacing={1}>
        <OnboardingByRegion />
        <CampaignAssetsDelivered />
        <OnboardingByCreator />
        <TopInfluencers />
        <ConversionByContent />
        <UserDistribution />
      </Grid>
    </PageContainer>
  );
}