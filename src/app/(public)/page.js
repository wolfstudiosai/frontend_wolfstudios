import { PageContainer } from '/src/components/container/PageContainer';

import { config } from '/src/config';

import { MainView } from './main-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <PageContainer>
      <MainView />
      {/* <PortfolioView /> */}
    </PageContainer>
  );
}
