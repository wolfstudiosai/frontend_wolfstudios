'use client'

import { PageContainer } from '/src/components/container/PageContainer';
import { OnboardingByRegion } from './_components/bar-chart/onboarding-by-region';
import { OnboardingByCreator } from './_components/bar-chart/onboarding-by-creator';
import { TopInfluencers } from './_components/bar-chart/top-influencers';
import { ConversionByContent } from './_components/bar-chart/conversion-by-content';
import { CampaignAssetsDelivered } from './_components/bar-chart/campaign-assets-deliverd';
import Grid from '@mui/material/Grid2';
import { UserDistribution } from './_components/bar-chart/user-distribution';
import SparklineMetricsGrid from './_components/sparkline-matrics';
import { ContentFormatCampaign } from './_components/donut-chart/content-format-campaign';
import { FunnelDropOff } from './_components/donut-chart/funnel-drop-off';
import { UsersEngagement } from './_components/donut-chart/users-engagement';
import { AssetsStatusOverview } from './_components/donut-chart/assets-status-overview';
import { AudienceDemographics } from './_components/donut-chart/audience-demographics';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <SparklineMetricsGrid />
      <Grid container spacing={1} rowSpacing={1}>
        {/* Bar charts */}
        <OnboardingByRegion />
        <CampaignAssetsDelivered />
        <OnboardingByCreator />
        <TopInfluencers />
        <ConversionByContent />
        <UserDistribution />

        {/* Donut charts */}
        <FunnelDropOff />
        <ContentFormatCampaign />
        <UsersEngagement />
        <AssetsStatusOverview />
        <AudienceDemographics />
      </Grid>
    </PageContainer>
  );
}