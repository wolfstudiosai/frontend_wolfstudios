import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';
import { config } from '/src/config';
import { ManageCampaignForm } from '../_component/manage-campaign-form';


export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <CardTitle title="Add campaign" />
      <ManageCampaignForm />
    </PageContainer>
  );
}
