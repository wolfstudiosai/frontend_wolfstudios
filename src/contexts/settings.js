'use client';

import * as React from 'react';

import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';

export const SettingsContext = React.createContext({
  settings: applyDefaultSettings({}),
  setSettings: () => {
    // noop
  },
  customSettings: {
    openSubNav: true
  }
});

export function SettingsProvider({ children, settings: initialSettings }) {
  const [state, setState] = React.useState(initialSettings);
  const [openSubNav, setOpenSubNav] = React.useState(true);

  React.useEffect(() => {
    setState(initialSettings);
  }, [initialSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: state,
        setSettings: (newSettings) => {
          setState(newSettings);
        },
        customSettings: {
          openSubNav,
          setOpenSubNav
        }
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const SettingsConsumer = SettingsContext.Consumer;
