import { CampaignDetailsView } from '/src/app/(public)/campaign/[slug]/campaign-details-view';
import { config } from '/src/config';
import { publicApi } from '/src/utils/api';
import { Container } from '@mui/material';

export const metadata = { title: config.site.name, description: 'Campaigns list page' };

export default async function Page({ params: { slug } }) {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign?slug=${slug}`);
  const data = res.data?.data[0] || [];

  return <CampaignDetailsView data={data} />;
}
