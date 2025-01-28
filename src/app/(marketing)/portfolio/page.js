import { config } from '/src/config';

import { PortfolioView } from './portfolio-view';
import { ContentFilter } from '../content/_components/content-filter';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
    {/* <ContentFilter /> */}
      <PortfolioView />
    </>
  );
}
