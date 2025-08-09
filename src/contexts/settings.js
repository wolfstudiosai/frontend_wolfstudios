'use client';

import * as React from 'react';

import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';
import useAuth from '/src/hooks/useAuth';
import { useDebounce } from '/src/hooks/use-debounce';

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
  openMenus: {},
  toggleMenuItem: () => { },
  debouncedSearch: '',
  setSearch: () => { },
});

export function SettingsProvider({ children, settings: initialSettings }) {
  const { isLogin } = useAuth();
  const [state, setState] = React.useState(initialSettings);
  const [openSubNav, setOpenSubNav] = React.useState(isLogin ? true : false);
  const [isFeaturedCardVisible, setIsFeaturedCardVisible] = React.useState(false);
  const [openMenus, setOpenMenus] = React.useState({});

  // GLOBAL SEARCH
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 500);


  const toggleMenuItem = (key) => {
    if (key) {
      setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setOpenMenus({});
    }

  };

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
        openMenus,
        toggleMenuItem,
        debouncedSearch,
        setSearch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const SettingsConsumer = SettingsContext.Consumer;
