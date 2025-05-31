

import { PageContainer } from '/src/components/container/PageContainer';

import { ContentPerformance } from './_components/content-performance';
import { Facilities } from './_components/facilities';
import { PartnerMatrix } from './_components/partner-matrix';
import { OnboardingByRegion } from './_components/bar-chart/onboarding-by-region';
import { OnboardingByCreator } from './_components/bar-chart/onboarding-by-creator';
import Grid from '@mui/material/Grid2';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <ContentPerformance />
      <PartnerMatrix />
      <Facilities />
      <Grid container spacing={1}>
        <OnboardingByRegion />
        <OnboardingByCreator />
      </Grid>
    </PageContainer>
  );
}