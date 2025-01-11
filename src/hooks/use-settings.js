import * as React from 'react';

import { SettingsContext } from '/src/contexts/settings';

export function useSettings() {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}
