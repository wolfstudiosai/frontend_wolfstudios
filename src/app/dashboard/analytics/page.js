import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IgViewsByPost } from '@/components/dashboard/analytics/ig-views-by-post';
import { InboundOutbound } from '@/components/dashboard/analytics/inbound-outbound';
import { Insight } from '@/components/dashboard/analytics/insight';
import { config } from '@/config';
import { NumberOfAssestsByCampaign } from './_components/number-of-assests-by-campaign';
import { PercentOfAssetsByProduct } from './_components/percent-of-assets-by-product';
import { TotalContributedEngagement } from './_components/total-contributed-engagement';
import { ContentPerformance } from './_components/content-performance';
import { PageContainer } from '@/components/container/PageContainer';
import { PartnerMatrix } from './_components/partner-matrix';
import { Facilities } from './_components/facilities';

export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export const colorPalette = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#FFC300", // Yellow
  "#DAF7A6", // Light Green
  "#FF4500", // Orange
  "#4B0082", // Indigo
  "#00FFFF", // Cyan
  "#FF1493", // Deep Pink
  "#A52A2A", // Brown
  "#4787CD", // Brown
];

export default function Page() {
  return (
    <PageContainer>
      <ContentPerformance />
      <PartnerMatrix />
      <Facilities />
    </PageContainer>
  );
}
