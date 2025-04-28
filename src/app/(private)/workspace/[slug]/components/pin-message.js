import React, { useContext } from 'react';
import { Box, Stack } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';

import { Message } from './message';
import { MessageSkeleton } from './skeleton';

const PinMessage = () => {
  const { channelPinnedMessages, directPinnedMessages, activeTab } = useContext(ChatContext);
  const loading = false;

  if (loading) {
    return (
      <Stack direction="column" gap={2} sx={{ py: 2 }}>
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={2} sx={{ py: 2 }}>
      {activeTab?.type === 'channel'
        ? channelPinnedMessages?.map((message) => (
            <Message key={message.id} message={message} sidebar={true} pinnedTab />
          ))
        : directPinnedMessages?.map((message) => (
            <Message key={message.id} message={message} sidebar={true} pinnedTab />
          ))}
    </Stack>
  );
};

export default PinMessage;
