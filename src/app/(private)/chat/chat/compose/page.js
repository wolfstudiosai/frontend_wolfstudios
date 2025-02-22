import * as React from 'react';

import { config } from '/src/config';
import { ComposeView } from '/src/components/dashboard/chat/compose-view';

export const metadata = { title: `Compose | Chat | Dashboard | ${config.site.name}` };

export default function Page() {
  return <ComposeView />;
}
