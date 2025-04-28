import { useContext, useEffect } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import { Iconify } from '/src/components/iconify/iconify';

import { MessageReplyForm } from '../../../dms/_components/message-reply-form';
import { ScrollableContent } from './custom-component';
import { Message } from './message';

export const RepliesSection = () => {
  const { setActiveChannelThread, setActiveDirectThread, channelThreadMessages, directThreadMessages, activeTab } =
    useContext(ChatContext);

  useEffect(() => {
    if (channelThreadMessages?.length > 0 || directThreadMessages?.length > 0) {
      const scrollableContent = document.getElementById('scrollable-reply-content');
      if (scrollableContent) {
        //smooth scroll to bottom
        scrollableContent.scrollTo({
          top: scrollableContent.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [channelThreadMessages, directThreadMessages]);


  return (
    <Stack direction="column" sx={{ width: '25%', height: 'calc(100vh - 94px)', overfolow: 'hidden' }}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>Replies</Typography>
        <IconButton
          onClick={() => (activeTab?.type === 'channel' ? setActiveChannelThread(null) : setActiveDirectThread(null))}
        >
          <Iconify icon="mingcute:close-fill" />
        </IconButton>
      </Stack>
      <ScrollableContent style={{ padding: '1rem' }} id='scrollable-reply-content'>
        {activeTab?.type === 'channel'
          ? channelThreadMessages?.map((message) => <Message key={message.id} message={message} threadTab />)
          : directThreadMessages?.map((message) => <Message key={message.id} message={message} threadTab />)}
      </ScrollableContent>
      <MessageReplyForm sx={{ p: 2 }} />
    </Stack>
  );
};
