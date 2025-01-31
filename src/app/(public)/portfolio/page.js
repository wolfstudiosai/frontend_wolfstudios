import { config } from '/src/config';

import { PortfolioView } from './portfolio-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <PortfolioView />
    </>
  );
}
