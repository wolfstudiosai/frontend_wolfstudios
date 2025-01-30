'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { paths } from '@/paths';
import { useMediaQuery } from '@/hooks/use-media-query';

import { DirectSearch } from './direct-search';
import { ThreadItem } from './thread-item';
import { api } from '@/utils/api';

export function Sidebar({
  currentThreadId,
  messages,
  onCloseMobile,
  onSelectContact,
  onSelectThread,
  openDesktop,
  openMobile,
  threads,
}) {
  const mdUp = useMediaQuery('up', 'md');

  // React.useEffect(() => {
  //   async function fetchContacts() {
  //     try {
  //       const contactsRes = await getUsers({ page: 1, rowsPerPage: 100 });
  //       const transformedContacts = (contactsRes.data || []).map((user) => ({
  //         id: user.email,
  //         name: `${user.first_name} ${user.last_name}`,
  //         avatar: user.profile_pic || '',
  //         isActive: user.status === 'ACTIVE',
  //         lastActivity: dayjs().toDate(),
  //       }));
  //       setContacts(transformedContacts);
  //     } catch (error) {
  //       console.error('Failed to fetch contacts:', error);
  //     }
  //   }
  //   fetchContacts();
  // }, []);
  // console.log("contactssssss",contacts)


  const content = (
    <SidebarContent
      closeOnGroupClick={!mdUp}
      closeOnThreadSelect={!mdUp}
      currentThreadId={currentThreadId}
      messages={messages}
      onClose={onCloseMobile}
      onSelectContact={onSelectContact}
      onSelectThread={onSelectThread}
      threads={threads}
    />
  );

  if (mdUp) {
    return (
      <Box
        sx={{
          borderRight: '1px solid var(--mui-palette-divider)',
          flex: '0 0 auto',
          ml: openDesktop ? 0 : '-320px',
          position: 'relative',
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          width: '320px',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer PaperProps={{ sx: { maxWidth: '100%', width: '320px' } }} onClose={onCloseMobile} open={openMobile}>
      {content}
    </Drawer>
  );
}

function SidebarContent({
  closeOnGroupClick,
  closeOnThreadSelect,
  currentThreadId,
  messages,
  onClose,
  onSelectContact,
  onSelectThread,
  threads,
}) {
  // If you want to persist the search states, you can move it to the Sidebar component or a context.
  // Otherwise, the search states will be reset when the window size changes between mobile and desktop.
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  

const handleSearchChange = React.useCallback(
  async (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`threads/contacts?query=${encodeURIComponent(value)}`);
      const result = response.data;

      if (result.success) {
        setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setLoading(false); // Stop loading
    }
  },
  []
);


  const handleSearchClickAway = React.useCallback(() => {
    if (searchFocused) {
      setSearchFocused(false);
      setSearchQuery('');
    }
  }, [searchFocused]);

  const handleSearchFocus = React.useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = React.useCallback(
    (contact) => {
      console.log("selected", contact)
      onSelectContact?.(contact.id);

      setSearchFocused(false);
      setSearchQuery('');
    },
    [onSelectContact]
  );

  const handleThreadSelect = React.useCallback(
    (threadType, threadId) => {
      onSelectThread?.(threadType, threadId);

      if (closeOnThreadSelect) {
        onClose?.();
      }
    },
    [onSelectThread, onClose, closeOnThreadSelect]
  );

  const sortedThreads = threads.slice().sort((a, b) => {
    const lastMessageA = messages?.get(a.id)?.at(-1);
    const lastMessageB = messages?.get(b.id)?.at(-1);

    const dateA = lastMessageA ? new Date(lastMessageA.createdAt) : new Date(a.createdAt);
    const dateB = lastMessageB ? new Date(lastMessageB.createdAt) : new Date(b.createdAt);

    return dateB - dateA ;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', p: 2 }}>
        <Typography sx={{ flex: '1 1 auto' }} variant="h5">
          Messages
        </Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.chat_compose}
          onClick={() => {
            if (closeOnGroupClick) {
              onClose?.();
            }
          }}
          startIcon={<PlusIcon />}
          variant="contained"
        >
          Group
        </Button>
        <IconButton onClick={onClose} sx={{ display: { md: 'none' } }}>
          <XIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 2 }}>
        <DirectSearch
          isFocused={searchFocused}
          onChange={handleSearchChange}
          onClickAway={handleSearchClickAway}
          onFocus={handleSearchFocus}
          onSelect={handleSearchSelect}
          query={searchQuery}
          results={searchResults}
          loading={loading}
        />
        <Stack
          component="ul"
          spacing={1}
          sx={{ display: searchFocused ? 'none' : 'flex', listStyle: 'none', m: 0, p: 0 }}
        >
          {sortedThreads.map((thread) => (
            <ThreadItem
              loading={false}
              active={currentThreadId === thread.id}
              key={thread.id}
              messages={messages ?? []}
              onSelect={() => {
                handleThreadSelect(thread.type, thread.id);
              }}
              thread={thread}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
