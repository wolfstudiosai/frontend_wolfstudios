import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { SideNav } from '@/components/dashboard/settings/side-nav';
import { PageContainer } from '@/components/container/PageContainer';

export default function Layout({ children }) {
  return (
    <PageContainer>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
        <SideNav />
        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
      </Stack>
    </PageContainer>
  );
}
