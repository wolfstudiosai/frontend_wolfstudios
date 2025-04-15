'use client';

import { ChatView } from './chat-view';

export default function page({ params }) {
  return <ChatView slug={params.slug} />;
}
