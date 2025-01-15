import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';

import { config } from '/src/config';

import { ManageCampaignForm } from '../_component/manage-partner-form';

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page({ params: { slug } }) {
  return (
    <PageContainer>
      <CardTitle title="Edit partner" />
      <ManageCampaignForm slug={slug} />
    </PageContainer>
  );
}