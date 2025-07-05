import React from 'react';
import { Box, ListItemIcon, MenuItem, Popover, useColorScheme } from '@mui/material';

import { setSettings as setPersistedSettings } from '/src/lib/settings/set-settings';
import { useSettings } from '/src/hooks/use-settings';
import { Iconify } from '/src/components/iconify/iconify';

import { OptionsColorScheme } from '../components/core/settings/options-color-scheme';

export const SettingsPopover = ({ isSidebarOpen = false }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const { settings } = useSettings();
  const { mode, setMode } = useColorScheme();

  const handleUpdate = async (value) => {
    if (value) {
      setMode(value);
    }

    const updatedSettings = { ...settings, mode: value };

    await setPersistedSettings(updatedSettings);
  };

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        ref={menuAnchorEl}
        sx={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          p: 0,
          width: '100%',
          display: 'flex',
          justifyContent: isSidebarOpen ? 'flex-start' : 'center',
        }}
      >
        <MenuItem sx={{width: "100%"}}>
          <ListItemIcon sx={{ mr: isSidebarOpen ? 1 : 0 }}>
            <Iconify icon="solar:settings-linear" fontSize={isSidebarOpen ? 'small' : 'inherit'} />
          </ListItemIcon>
          {isSidebarOpen && 'Settings'}
        </MenuItem>
      </Box>
      <Popover
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setMenuAnchorEl(null)}
        open={Boolean(menuAnchorEl)}
        slotProps={{ paper: { sx: { width: '280px' } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <OptionsColorScheme
          onChange={(value) => {
            handleUpdate(value);
          }}
          value={{ ...settings, mode }}
        />
      </Popover>
    </>
  );
};
