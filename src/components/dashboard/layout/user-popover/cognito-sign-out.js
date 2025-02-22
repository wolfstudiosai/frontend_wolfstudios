'use client';

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from 'aws-amplify/auth';

import { logger } from '/src/lib/default-logger';
import { toast } from '/src/components/core/toaster';

export function CognitoSignOut() {
  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut();
      // UserProvider will handle Router refresh
      // After refresh, GuestGuard will handle the redirect
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, []);

  return (
    <MenuItem component="div" onClick={handleSignOut} sx={{ justifyContent: 'center' }}>
      Sign out
    </MenuItem>
  );
}
