import { config } from '/src/config';

import { ContentOverView } from './content-overview';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <ContentOverView />
    </>
  );
}
