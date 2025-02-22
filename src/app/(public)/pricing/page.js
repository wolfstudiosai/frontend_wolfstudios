import * as React from 'react';
import Divider from '@mui/material/Divider';

import { config } from '/src/config';
import { Faqs } from '/src/components/marketing/pricing/faqs';
import { PlansTable } from '/src/components/marketing/pricing/plans-table';

export const metadata = { title: `Pricing | ${config.site.name}` };

export default function Page() {
  return (
    <div>
      <PlansTable />
      <Divider />
      <Faqs />
    </div>
  );
}
