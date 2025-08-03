import { PageContainer } from '/src/components/container/PageContainer';

import { PartnerAnalyticsView } from './partner-analytics-view';
// import PartnerAnalyticsViewV2 from './partner-analytics-view-v2';

export default function Page() {
  return (
    <PageContainer>
      <PartnerAnalyticsView />
      {/* <PartnerAnalyticsViewV2 /> */}
    </PageContainer>
  );
}
