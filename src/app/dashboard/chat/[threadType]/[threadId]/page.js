import * as React from 'react';

import { config } from '/src/config';
import { ThreadView } from '/src/components/dashboard/chat/thread-view';

export const metadata = { title: `Thread | Chat | Dashboard | ${config.site.name}` };

export default function Page({ params }) {
  const { threadId, threadType } = params;

  return <ThreadView threadId={threadId} threadType={threadType} />;
}
