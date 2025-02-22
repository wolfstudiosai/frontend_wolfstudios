import { config } from '/src/config';

import { PartnerView } from './partner-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page({ params }) {
  return (
    <>
      <PartnerView />
    </>
  );
}
