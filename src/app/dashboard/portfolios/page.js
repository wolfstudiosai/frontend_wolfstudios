import { config } from '/src/config';

import Portfolios from './_components/portfolios';

export const metadata = { title: `Dashboard | Portfolio | ${config.site.name}` };

export default function Page() {
  return <Portfolios />;
}
