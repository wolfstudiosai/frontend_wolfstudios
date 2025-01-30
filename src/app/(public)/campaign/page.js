import { publicApi } from '/src/utils/api';

import { config } from '/src/config';

import { CampaignView } from './campaign-view';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page() {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign`);
  const data = res.data?.data || [];

  return (
    <>
      <CampaignView data={data || []} />
    </>
  );
}
