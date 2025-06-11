'use client'

import { PageContainer } from '/src/components/container/PageContainer';
import Grid from '@mui/material/Grid2';
import SparklineMetricsGrid from './_components/sparkline-matrics';
import AnalyticsBarCharts from './_components/analytics-bar-charts';
import AnalyticsDonutCharts from './_components/analytics-donut-charts';
// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <SparklineMetricsGrid />
      <Grid container spacing={1} rowSpacing={1}>
        {/* Bar charts */}
        <AnalyticsBarCharts />

        {/* Donut charts */}
        <AnalyticsDonutCharts />
      </Grid>
    </PageContainer>
  );
}