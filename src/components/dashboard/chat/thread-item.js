import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import  Badge  from '@mui/material/Badge'; 
import useAuth from '/src/hooks/useAuth';
import { dayjs } from '/src/lib/dayjs';

function getDisplayContent(lastMessage, userId) {
  const author = lastMessage.author.id === userId ? 'Me: ' : '';
  const message = lastMessage.type.toLowerCase() === 'file' ? 'Sent a file' : lastMessage.content;
  return `${author}${message}`;
}

export function ThreadItem({ active = false, thread, messages, onSelect, loading = true }) {
  const { userInfo } = useAuth();
  const recipients = (thread?.participants ?? []).filter((participant) => participant.id !== userInfo.email);
  const lastMessage = messages?.get(thread?.id)?.at(-1);
  // console.log("messages in sidebar", messages);

  if (loading) {
    return (
      <Box component="li" sx={{ userSelect: 'none' }}>
        <Box
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            flex: '0 0 auto',
            gap: 1,
            p: 1,
          }}
        >
          {/* Skeleton for Avatar */}
          <Skeleton variant="circular" width={36} height={36} />
          <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
            {/* Skeleton for Title */}
            <Skeleton variant="text" height={20} width="60%" />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {/* Skeleton for Unread Indicator */}
              <Skeleton variant="circular" width={8} height={8} />
              {/* Skeleton for Message Preview */}
              <Skeleton variant="text" height={16} width="80%" />
            </Stack>
          </Box>
          {/* Skeleton for Timestamp */}
          <Skeleton variant="text" height={16} width="30%" />
        </Box>
      </Box>
    );
  }

  return (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        onClick={onSelect}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onSelect?.();
          }
        }}
        role="button"
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: 1,
          ...(active && { bgcolor: 'var(--mui-palette-action-selected)' , borderLeft: '4px solid var(--mui-palette-primary-main)'}),
          '&:hover': { ...(!active && { bgcolor: 'var(--mui-palette-action-hover)' }) },
        }}
        tabIndex={0}
      >
        <div>
          <AvatarGroup
            max={2}
            sx={{
              '& .MuiAvatar-root': {
                fontSize: 'var(--fontSize-xs)',
                ...(thread.type.toLowerCase() === 'group'
                  ? { height: '24px', ml: '-16px', width: '24px', '&:nth-of-type(2)': { mt: '12px' } }
                  : { height: '36px', width: '36px' }),
              },
            }}
          >
             {
            recipients.map((recipient) => (
              <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
          key={recipient.id}
        >
          <Avatar src={recipient?.avatar} />
        </Badge>
            ))
          }
          </AvatarGroup>
        </div>
        <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Typography noWrap variant="subtitle2">
            {thread.type.toLowerCase() === 'group' ? thread.name : recipients.map((recipient) => recipient.name).join(', ')}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {(thread.unreadCount ?? 0) > 0 ? (
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-primary-main)',
                  borderRadius: '50%',
                  flex: '0 0 auto',
                  height: '8px',
                  width: '8px',
                }}
              />
            ) : null}
            {lastMessage ? (
              <Typography color="text.secondary" noWrap sx={{ flex: '1 1 auto' }} variant="subtitle2">
                {getDisplayContent(lastMessage, userInfo.email)}
              </Typography>
            ) : null}
          </Stack>
        </Box>
        {lastMessage ? (
          <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
            {dayjs(lastMessage.createdAt).fromNow()}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
