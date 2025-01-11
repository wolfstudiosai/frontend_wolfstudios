
import { PageContainer } from '/src/components/container/PageContainer';
import { config } from '/src/config';
import { ContentPerformance } from './_components/content-performance';
import { Facilities } from './_components/facilities';
import { PartnerMatrix } from './_components/partner-matrix';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

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
