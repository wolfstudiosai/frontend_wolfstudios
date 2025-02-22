'use client';


import { useRouter } from 'next/navigation';
import * as React from 'react';
// import { SettingsDrawer } from './settings-drawer';
import { SettingsDrawer } from '/src/components/core/settings/settings-drawer';
import { Iconify } from '/src/components/iconify/iconify';
import { setSettings as setPersistedSettings } from '/src/lib/settings/set-settings';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { useSettings } from '/src/hooks/use-settings';

export const SettingsGear = () => {
  const { settings } = useSettings();
  const { mode, setMode } = useColorScheme();
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleUpdate = async (values) => {
    const { mode: newMode, ...other } = values;

    if (newMode) {
      setMode(newMode);
    }

    const updatedSettings = { ...settings, ...other };

    await setPersistedSettings(updatedSettings);

    // Refresh the router to apply the new settings.
    router.refresh();
  };

  const handleReset = async () => {
    setMode(null);

    await setPersistedSettings({});

    // Refresh the router to apply the new settings.
    router.refresh();
  };

  return (
    <React.Fragment>
      <Tooltip title="Settings">
        <Iconify
          onClick={() => {
            setOpenDrawer(true);
          }}
          icon="ph:gear-light"
          width={20}
          style={{ color: 'var(--mui-palette-neutral-400)', cursor: 'pointer' }}
        />
      </Tooltip>
      <SettingsDrawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        onReset={handleReset}
        onUpdate={handleUpdate}
        open={openDrawer}
        values={{ ...settings, mode }}
      />
    </React.Fragment>
  );
};
