import { useContext, useEffect } from 'react';
import { Stack } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';

import { Content } from './components/content';
import { LeftSidebar } from './components/left-sidebar';
import { RepliesSection } from './components/replies-section';
import { RightSidebar } from './components/right-sidebar';
import { ContentSkeleton } from './components/skeleton';

export const ChatView = ({ slug }) => {
  const { getWorkspace, activeTab, activeChannelThread, activeDirectThread } = useContext(ChatContext);

  useEffect(() => {
    if (slug) {
      getWorkspace(slug);
    }
  }, [slug]);

  return (
    <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%' }}>
      <LeftSidebar />
      {activeTab ? <Content /> : <ContentSkeleton />}
      {activeChannelThread || activeDirectThread ? <RepliesSection /> : <RightSidebar />}
    </Stack>
  );
};
