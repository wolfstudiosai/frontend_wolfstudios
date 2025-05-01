import React from 'react';
import RouterLink from 'next/link';
import { Avatar, Box, Divider, List, ListItemIcon, MenuItem, Popover, Typography } from '@mui/material';

import { paths } from '/src/paths';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

export const UserInfoPopover = () => {
  const { userInfo, logout } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        ref={menuAnchorEl}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Avatar sx={{ width: 34, height: 34 }} src={userInfo.profile_pic} />
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
          <Box sx={{ p: 2 }}>
            <Typography>{userInfo.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userInfo.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userInfo.role}
            </Typography>
          </Box>
          <Divider />
          <List sx={{ p: 1 }}>
            <MenuItem component={RouterLink} href={paths.dashboard.profile} onClick={() => setMenuAnchorEl(null)}>
              <ListItemIcon>
                <Iconify icon="solar:user-linear" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem component={RouterLink} href={paths.dashboard.security} onClick={() => setMenuAnchorEl(null)}>
              <ListItemIcon>
                <Iconify icon="ph:gear-light" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </List>
          <Divider />
          <Box sx={{ p: 1 }}>
            <MenuItem component="div" onClick={logout} sx={{ justifyContent: 'center' }}>
              Sign out
            </MenuItem>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
