import * as React from 'react';

import { config } from '/src/config';
import { ThreadView } from '/src/components/dashboard/mail/thread-view';

export const metadata = { title: `Thread | Mail | Dashboard | ${config.site.name}` };

export default function Page({ params }) {
  const { threadId } = params;

  return <ThreadView threadId={threadId} />;
}
