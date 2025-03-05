import { PageContainer } from '/src/components/container/PageContainer';
import { Box } from '@mui/material';

import { config } from '/src/config';

import { MainView } from './main-view';
import { PortfolioView } from './portfolio/portfolio-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <PageContainer>
      <MainView />
      {/* <PortfolioView /> */}
    </PageContainer>
  );
}
