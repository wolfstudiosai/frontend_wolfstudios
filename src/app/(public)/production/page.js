import { config } from '/src/config';

import { ProductionView } from './production-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <ProductionView />
    </>
  );
}
