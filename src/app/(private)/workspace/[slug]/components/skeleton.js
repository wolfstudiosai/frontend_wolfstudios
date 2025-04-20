import * as React from 'react';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ScrollableContent } from './custom-component';

export const MessageSkeleton = ({ sx }) => {
  return (
    <Stack direction="row" gap={1} sx={{ ...sx }}>
      <Skeleton variant="circular" width={44} height={44} />
      <Stack direction="column" gap={0.5} sx={{ width: '80%' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="40%" />
        </Stack>
        <Skeleton variant="rounded" width="100%" height={100} />
      </Stack>
    </Stack>
  );
};

export const ContentSkeleton = () => {
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{ width: '50%', height: 'calc(100vh - 94px)', borderRight: '1px solid', borderColor: 'divider' }}
    >
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: 1.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <Skeleton variant="rounded" width="100%" height={20} />
        <Skeleton variant="rounded" width={10} height={20} />
      </Box>

      <ScrollableContent sx={{ p: 2 }}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <MessageSkeleton key={index} sx={{ mb: 3 }} />
          ))}
      </ScrollableContent>
      <Stack sx={{ p: 2 }}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Stack>
    </Stack>
  );
};
