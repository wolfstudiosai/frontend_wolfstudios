'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { LockKey as LockKeyIcon } from '@phosphor-icons/react/dist/ssr/LockKey';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { config } from '/src/config';
import { paths } from '/src/paths';
import { AuthStrategy } from '/src/lib/auth/strategy';

import { Auth0SignOut } from './auth0-sign-out';
import { CognitoSignOut } from './cognito-sign-out';
import { CustomSignOut } from './custom-sign-out';
import { FirebaseSignOut } from './firebase-sign-out';
import { SupabaseSignOut } from './supabase-sign-out';
import useAuth from '/src/hooks/useAuth';

const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  email: 'sofia@devias.io',
};

export function UserPopover({ anchorEl, onClose, open }) {
  const { userInfo } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

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
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.profile}
          onClick={onClose}
        >
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.security}
          onClick={onClose}
        >
          <ListItemIcon>
            <LockKeyIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        {config.auth.strategy === AuthStrategy.CUSTOM ? <CustomSignOut onClose={onClose} /> : null}
        {config.auth.strategy === AuthStrategy.AUTH0 ? <Auth0SignOut /> : null}
        {config.auth.strategy === AuthStrategy.COGNITO ? <CognitoSignOut /> : null}
        {config.auth.strategy === AuthStrategy.FIREBASE ? <FirebaseSignOut /> : null}
        {config.auth.strategy === AuthStrategy.SUPABASE ? <SupabaseSignOut /> : null}
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
}