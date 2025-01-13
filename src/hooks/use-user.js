import * as React from 'react';

import { UserContext } from '/src/contexts/auth/user-context';

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
