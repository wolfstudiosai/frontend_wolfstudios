'use client';

import * as React from 'react';

import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';
import useAuth from '/src/hooks/useAuth';

export const SettingsContext = React.createContext({
  settings: applyDefaultSettings({}),
  setSettings: () => {
    // noop
  },
  customSettings: {
    openSubNav: false, // Set a default value here
    setOpenSubNav: () => { }, // Provide a default noop function
  },
  isFeaturedCardVisible: false,
  setIsFeaturedCardVisible: () => { },
});

export function SettingsProvider({ children, settings: initialSettings }) {
  const { isLogin } = useAuth();
  const [state, setState] = React.useState(initialSettings);
  const [openSubNav, setOpenSubNav] = React.useState(isLogin ? true : false);
  const [isFeaturedCardVisible, setIsFeaturedCardVisible] = React.useState(false);

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
          setOpenSubNav,
        },
        isFeaturedCardVisible,
        setIsFeaturedCardVisible,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const SettingsConsumer = SettingsContext.Consumer;
