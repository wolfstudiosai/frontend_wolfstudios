import { useContext } from 'react';
import { Avatar, Box, Breadcrumbs, IconButton, Link, Stack, Typography } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

export const Topbar = () => {
  const { activeTab, activeTabInfo } = useContext(ChatContext);
  const { userInfo } = useAuth();

  const sender = activeTabInfo?.sender?.id === userInfo?.id ? activeTabInfo?.receiver : activeTabInfo?.sender;

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left Section */}
      <Stack direction="row" spacing={1} alignItems="center">
        {activeTab?.type === 'direct' ? (
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar src={sender?.profileImage} alt={sender?.firstName} />
            <Typography sx={{ fontWeight: 'medium' }}>
              {sender?.firstName} {sender?.lastName}
            </Typography>
          </Stack>
        ) : (
          <>
            <Iconify icon="mdi:pound" fontSize={18} color="text.primary" />
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                href="/"
                color="text.primary"
                underline="none"
                sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
              >
                {activeTabInfo?.name}
              </Link>
              {/* <Link
                                    href="/material-ui/getting-started/installation/"
                                    color="text.primary"
                                    underline="none"
                                    sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                                >
                                    v3.0
                                </Link>
                                <Link
                                    href="/material-ui/react-breadcrumbs/"
                                    color="text.primary"
                                    underline="none"
                                    aria-current="page"
                                    sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                                >
                                    UI-kit design
                                </Link> */}
            </Breadcrumbs>
          </>
        )}
      </Stack>

      {/* Right Section */}
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small">
          <Iconify icon="bi:three-dots" fontSize={20} />
        </IconButton>
        {/* <IconButton size="small">
          <Iconify icon="lucide:sparkle" fontSize={20} />
        </IconButton>
        <IconButton size="small">
          <Iconify icon="si:warning-line" fontSize={20} />
        </IconButton> */}
      </Stack>
    </Box>
  );
};
