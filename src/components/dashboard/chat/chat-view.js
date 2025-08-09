'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { paths } from '/src/paths';
import { useMediaQuery } from '/src/hooks/use-media-query';

import { ChatContext } from './chat-context';
import { Sidebar } from './sidebar';
import {ChatFooter} from './footer'
export function ChatView({ children }) {
  const {
    contacts,
    threads,
    messages,
    createThread,
    openDesktopSidebar,
    setOpenDesktopSidebar,
    openMobileSidebar,
    setOpenMobileSidebar,
  } = React.useContext(ChatContext);

  const router = useRouter();

  const pathname = usePathname();

  // The layout does not have a direct access to the current thread id param, we need to extract it from the pathname.
  const segments = pathname.split('/').filter(Boolean);
  const currentThreadId = segments.length === 4 ? segments[segments.length - 1] : undefined;

  const mdDown = useMediaQuery('down', 'md');


  const handleThreadSelect = React.useCallback(
    async (threadType, threadId) => {
      try {
       
        // Redirect to the selected thread
        router.push(`${paths.dashboard.chat}/${threadType.toLowerCase()}/${threadId}`);
      } catch (error) {
        console.error('Failed to select thread:', error);
      }
    },
    [ router]
  );

  
  const handleContactSelect = React.useCallback(
    async (contactId) => {
      try {
        const threadId = await createThread({ type: 'direct', recipientId: contactId });
        console.log("Created thread ID:", threadId);

  
        // Redirect to the newly created thread
        router.push(`${paths.dashboard.chat}/direct/${threadId}`);

      } catch (error) {
        console.error("Failed to create thread:", error);
      }
    },
    [router, createThread]
  );
  

  return (
    // <Box sx={{ height:'auto' }}>
    <Box sx={{ display: 'flex', flex: '1 1 0', minHeight: '80vh', maxHeight: '85vh', overflow: 'hidden' }}>
      <Sidebar
        contacts={contacts}
        currentThreadId={currentThreadId}
        messages={messages}
        onCloseMobile={() => {
          setOpenMobileSidebar(false);
        }}
        onSelectContact={handleContactSelect}
        onSelectThread={handleThreadSelect}
        openDesktop={openDesktopSidebar}
        openMobile={openMobileSidebar}
        threads={threads}
      />
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ borderBottom: '1px solid var(--mui-palette-divider)', display: 'flex', flex: '0 0 auto', p: 2 }}>
          <IconButton
            onClick={() => {
              if (mdDown) {
                setOpenMobileSidebar((prev) => !prev);
              } else {
                setOpenDesktopSidebar((prev) => !prev);
              }
            }}
          >
            <ListIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    {/* </Box> */}
    {/* <ChatFooter /> */}
    </Box>
  );
}
