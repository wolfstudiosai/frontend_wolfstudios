
import { PageContainer } from '/src/components/container/PageContainer';
import AnalyticsBarCharts from './_components/bar-chart/AnalyticsBarCharts';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <AnalyticsBarCharts />
    </PageContainer>
  );
}
