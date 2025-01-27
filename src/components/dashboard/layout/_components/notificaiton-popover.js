import React from 'react';
import RouterLink from 'next/link';
import { Iconify } from '@/components/iconify/iconify';
import { Avatar, Badge, Box, Divider, List, ListItemIcon, Menu, MenuItem, Popover, Typography } from '@mui/material';

import { paths } from '@/paths';
import { usePopover } from '@/hooks/use-popover';
import useAuth from '@/hooks/useAuth';

export const NotificationPopover = () => {
  const popover = usePopover();
  const { userInfo } = useAuth();
  return (
    <React.Fragment>
      <Box
        component="button"
        onMouseEnter={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Badge color="primary" variant="dot">
          <Iconify icon="clarity:notification-line" width={20} style={{ color: 'var(--mui-palette-neutral-400)' }} />
        </Badge>
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
};

const UserPopover = ({ anchorEl, onClose, open }) => {
  const { userInfo } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const { logout } = useAuth();

  const onSelectAccount = () => {
    // logic for choosing account
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={Boolean(open)}
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
        <MenuItem component={RouterLink} href={paths.dashboard.profile} onClick={onClose}>
          <ListItemIcon>
            <Iconify icon="solar:user-linear" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.security} onClick={onClose}>
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
      {/* Switch Account Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {/* here we can add our Account getting from API */}
        <MenuItem onClick={onSelectAccount}>Account 1</MenuItem>
        <MenuItem onClick={onSelectAccount}>Account 2</MenuItem>
        <MenuItem onClick={onSelectAccount}>Account 3</MenuItem>
      </Menu>
    </Popover>
  );
};
