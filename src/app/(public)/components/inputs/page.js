import * as React from 'react';

import { config } from '/src/config';
import { Inputs1 } from '/src/components/widgets/inputs/inputs-1';
import { Inputs2 } from '/src/components/widgets/inputs/inputs-2';
import { Inputs3 } from '/src/components/widgets/inputs/inputs-3';
import { Inputs4 } from '/src/components/widgets/inputs/inputs-4';
import { Layout } from '/src/components/widgets/layout';

export const metadata = { title: `Inputs | Components | ${config.site.name}` };

const components = [
  { title: 'Inputs 1', element: <Inputs1 /> },
  { title: 'Inputs 2', element: <Inputs2 /> },
  { title: 'Inputs 3', element: <Inputs3 /> },
  { title: 'Inputs 4', element: <Inputs4 /> },
];

export default function Page() {
  return <Layout components={components} title="Inputs" />;
}
