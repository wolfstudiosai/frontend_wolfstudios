import { useContext, useEffect } from 'react';
import { Box, Stack } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import { TypingAnimation } from '/src/components/widgets/typing-animation.js';

import { MessageForm } from '../../../dms/_components/message-form';
import { ScrollableContent } from './custom-component';
import { Message } from './message';
import { MessageSkeleton } from './skeleton';
import { Topbar } from './topbar';

export const Content = ({ isMobile }) => {
  const { channelMessages, directMessages, typingUsers, activeTabInfo, activeTab } = useContext(ChatContext);

  useEffect(() => {
    if (channelMessages?.length > 0 || directMessages?.length > 0) {
      const scrollableContent = document.getElementById('scrollable-content');
      if (scrollableContent) {
        //smooth scroll to bottom
        scrollableContent.scrollTo({
          top: scrollableContent.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [channelMessages, directMessages]);

  let usersTyping =
    Array.from(typingUsers)?.map((userId) => {
      const firstName =
        activeTab?.type === 'channel'
          ? activeTabInfo?.members?.find(({ User }) => User.id === userId)?.User.firstName
          : activeTabInfo?.sender?.firstName;
      return firstName;
    }) || [];

  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        width: isMobile ? '100vw' : '50%',
        height: isMobile ? '100vh' : 'calc(100vh - 94px)',
        borderRight: isMobile ? 'none' : '1px solid',
        borderColor: 'divider',
        pt: isMobile ? 5 : 0,
      }}
    >
      <Topbar isMobile={isMobile} />
      <ScrollableContent id="scrollable-content" sx={{ p: 2 }}>
        {activeTab?.type === 'channel'
          ? channelMessages?.map((message) => <Message key={message.id} message={message} />)
          : directMessages?.map((message) => <Message key={message.id} message={message} />)}
      </ScrollableContent>

      {usersTyping.length > 0 && (
        <Box sx={{ pl: 3, display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <TypingAnimation />
          <p
            style={{
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            {usersTyping.join(',')} is typing
          </p>
        </Box>
      )}
      <MessageForm sx={{ p: 2 }} />
    </Stack>
  );
};
