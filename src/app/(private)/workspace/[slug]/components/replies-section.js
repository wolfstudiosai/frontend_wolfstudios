import { useContext } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import { Iconify } from '/src/components/iconify/iconify';

import { MessageForm } from '../../../dms/_components/message-form';
import { ScrollableContent } from './custom-component';
import { Message } from './message';

export const RepliesSection = () => {
  const { setActiveChannelThread, setActiveDirectThread, channelThreadMessages, directThreadMessages, activeTab } =
    useContext(ChatContext);
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
      <ScrollableContent>
        {activeTab?.type === 'channel'
          ? channelThreadMessages?.map((message) => <Message key={message.id} message={message} />)
          : directThreadMessages?.map((message) => <Message key={message.id} message={message} />)}
      </ScrollableContent>
      <MessageForm sx={{ p: 2 }} />
    </Stack>
  );
};
