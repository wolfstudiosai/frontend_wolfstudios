import { config } from '@/config';
import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';

import { ManageCampaignForm } from '../_component/manage-campaign-form';

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page({ params }) {
  const { id } = params;

  return (
    <PageContainer>
      <CardTitle title="Edit campaign" />
      <ManageCampaignForm />
    </PageContainer>
  );
}
