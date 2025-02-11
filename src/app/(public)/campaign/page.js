import { config } from '/src/config';

import { CampaignView } from './campaign-view';
import { publicApi } from '/src/utils/api';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page() {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign-group`);
  const data = res.data?.data || [];

  return (
    <>
      <CampaignView groupData={data} />
    </>
  );
}
