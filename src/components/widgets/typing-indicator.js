import { Fragment, useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  IconButton,
  Paper,
  Popover,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { AvatarWithActiveStatus } from '/src/components/core/avatar-with-active-status';
import { Iconify } from '/src/components/iconify/iconify';

import { TypingAnimation } from './typing-animation';

const TypingIndicator = ({ message, sidebar, sender }) => {
  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        position: 'relative',
        '&:hover .hover-action': { opacity: 1 },
      }}
    >
      <AvatarWithActiveStatus
        src={sender?.profileImage || ''}
        alt={sender?.name || ''}
        sx={{
          ...(sidebar && { width: '28px', height: '28px' }),
        }}
        status={true}
      />
      <Stack direction="column" gap={1.5}>
        <Typography fontWeight={600}>{sender?.name}</Typography>
        <TypingAnimation />
      </Stack>
    </Stack>
  );
};

export default TypingIndicator;
