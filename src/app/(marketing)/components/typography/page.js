import * as React from 'react';

import { config } from '/src/config';
import { Layout } from '/src/components/widgets/layout';
import { Typography1 } from '/src/components/widgets/typography/typography-1';

export const metadata = { title: `Typography | Components | ${config.site.name}` };

const components = [{ title: 'Typography 1', element: <Typography1 /> }];

export default function Page() {
  return <Layout components={components} title="Typography" />;
}
