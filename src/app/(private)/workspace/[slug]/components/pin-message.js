import React, { useContext } from 'react';
import { Box, Stack } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';

import { Message } from './message';
import { MessageSkeleton } from './skeleton';

const PinMessage = () => {
  const { channelMessages } = useContext(ChatContext);
  //   Set actual loading logic
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
      {/* Map the pinned messages */}
      {channelMessages?.map((message) => (
        <Message key={message.id} message={message} sidebar={true} />
      ))}
    </Stack>
  );
};

export default PinMessage;
