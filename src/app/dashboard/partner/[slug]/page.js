import { ManageCampaignForm } from '../../campaign/_component/manage-campaign-form';
import { CardTitle } from '/src/components/cardTitle/CardTitle';
import { PageContainer } from '/src/components/container/PageContainer';

import { config } from '/src/config';

// import { ManageCampaignForm } from '..//manage-partner-form';

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page({ params: { slug } }) {
  return (
    <PageContainer>
      <CardTitle title="Edit partner" />
      <ManageCampaignForm slug={slug} />
    </PageContainer>
  );
}
