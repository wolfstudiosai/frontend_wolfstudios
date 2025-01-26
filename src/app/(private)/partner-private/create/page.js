import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';

import { config } from '/src/config';

import { ManagePartnerForm } from '../_component/manage-partner-form';

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page() {
  return (
    <PageContainer>
      <CardTitle title="Add partner" />
      <ManagePartnerForm />
    </PageContainer>
  );
}
