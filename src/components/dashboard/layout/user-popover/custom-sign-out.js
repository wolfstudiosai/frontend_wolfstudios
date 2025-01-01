'use client';

import MenuItem from '@mui/material/MenuItem';

import useAuth from '@/hooks/useAuth';

export function CustomSignOut({ onClose }) {
  const { logout } = useAuth()
  function handleSignOut() {
    onClose();
    logout();
  }

  return (
    <MenuItem
      component="div"
      onClick={handleSignOut}
      sx={{ justifyContent: 'center' }}
    >
      Sign out
    </MenuItem>
  );
}
