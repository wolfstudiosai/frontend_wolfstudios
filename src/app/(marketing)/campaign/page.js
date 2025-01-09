import { publicApi } from '@/utils/api';
import { Container } from '@mui/material';

import { config } from '@/config';

import { CampaignView } from './campaign-view';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page() {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign`);
  const data = res.data?.data || [];

  return (
    <Container maxWidth="xl">
      <CampaignView data={data || []} />
    </Container>
  );
}
