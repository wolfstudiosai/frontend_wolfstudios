import { CampaignView } from '@/app/(public)/campaign/campaign-view';
import { publicApi } from '@/utils/api';

export default async function Page() {
  const res = await publicApi.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/campaign`);
  const data = res.data?.data || [];
  return <CampaignView data={data || []} />;
}
