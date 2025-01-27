import React from 'react';
import RouterLink from 'next/link';
import { Iconify } from '@/components/iconify/iconify';
import { Avatar, Badge, Box, Divider, List, ListItemIcon, MenuItem, Popover, Typography } from '@mui/material';

import { paths } from '@/paths';
import useAuth from '@/hooks/useAuth';

export const UserInfoPopover = () => {
  const { userInfo } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const { logout } = useAuth();

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        ref={menuAnchorEl}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        {/* <Badge
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
        > */}
          <Avatar
            sx={{ width: 34, height: 34 }}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${userInfo.profile_pic}`}
          />
        {/* </Badge> */}
      </Box>
      <Popover
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setMenuAnchorEl(null)}
        open={Boolean(menuAnchorEl)}
        slotProps={{ paper: { sx: { width: '280px' } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
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
      </Popover>
    </>
  );
};
