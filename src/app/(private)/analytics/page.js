

import { PageContainer } from '/src/components/container/PageContainer';

import { ContentPerformance } from './_components/content-performance';
import { Facilities } from './_components/facilities';
import { PartnerMatrix } from './_components/partner-matrix';
import { OnboardingByRegion } from './_components/bar-chart/onboarding-by-region';
import { OnboardingByCreator } from './_components/bar-chart/onboarding-by-creator';
import { TopInfluencers } from './_components/bar-chart/top-influencers';
import Grid from '@mui/material/Grid2';
import AnalyticsBarCharts from './_components/bar-chart/AnalyticsBarCharts';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      {/* <ContentPerformance />
      <PartnerMatrix />
      <Facilities /> */}
      <AnalyticsBarCharts />
      <Grid container spacing={1}>
        <OnboardingByRegion />
        <OnboardingByCreator />
        <TopInfluencers />
      </Grid>
    </PageContainer>
  );
}