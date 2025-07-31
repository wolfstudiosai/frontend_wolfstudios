import React from 'react';
import RouterLink from 'next/link';
import { Avatar, Box, Divider, List, ListItemIcon, MenuItem, Popover, Stack, Typography } from '@mui/material';

import { paths } from '/src/paths';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

export const UserInfoPopover = ({ isSidebarOpen = false }) => {
  const { userInfo, logout } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const avatarSize = isSidebarOpen ? 35 : 28;

  const handleLogout = () => {
    setMenuAnchorEl(null);
    logout();
  };

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        ref={menuAnchorEl}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
          <Avatar sx={{ width: avatarSize, height: avatarSize, bgcolor: 'white', color: 'black' }} src={userInfo.profile_pic} />
          {isSidebarOpen && (
            <Box sx={{ textAlign: 'start' }}>
              <Typography color="white" variant="body2">
                {userInfo.name || 'Unknown'}
              </Typography>
              <Typography color="white" variant="body2">
                {userInfo.email}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
      <Popover
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setMenuAnchorEl(null)}
        open={Boolean(menuAnchorEl)}
        slotProps={{ paper: { sx: { width: '280px' } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}>
          <List sx={{ p: 1 }}>
            <MenuItem component={RouterLink} href={paths.dashboard.profile} onClick={() => setMenuAnchorEl(null)}>
              <ListItemIcon>
                <Iconify icon="solar:user-linear" />
              </ListItemIcon>
              Profile
            </MenuItem>

          </List>
          <Divider />
          <Box sx={{ p: 1 }}>
            <MenuItem
              component="div"
              onClick={handleLogout}
              sx={{
                justifyContent: 'center',
                py: 0,
                px: 1,
                fontSize: '0.875rem',
                minHeight: 'unset',
              }}
            >
              Sign out
            </MenuItem>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
