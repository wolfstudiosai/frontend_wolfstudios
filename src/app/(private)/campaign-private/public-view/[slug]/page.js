import { CampaignDetailsView } from '@/app/(marketing)/campaign/[slug]/campaign-details-view';
import { config } from '@/config';
import { publicApi } from '@/utils/api';
import { Container } from '@mui/material';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page({ params: { slug } }) {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign?slug=${slug}`);
  const data = res.data?.data[0] || [];

  return <CampaignDetailsView data={data} />;
}
