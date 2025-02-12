import { config } from '/src/config';

import { CampaignView } from './campaign-view';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page() {

  return (
    <>
      <CampaignView />
    </>
  );
}
