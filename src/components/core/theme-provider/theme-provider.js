'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useSettings } from '/src/hooks/use-settings';
import { createTheme } from '/src/styles/theme/create-theme';

import { EmotionCacheProvider } from './emotion-cache';
import { Rtl } from './rtl';

function CustomThemeProvider({ children }) {
  const { settings } = useSettings();

  const theme = createTheme({
    primaryColor: settings.primaryColor,
    direction: settings.direction,
  });

  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <Rtl direction={settings.direction}>
        <ThemeProvider disableTransitionOnChange theme={theme} defaultMode="dark">
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Rtl>
    </EmotionCacheProvider>
  );
}

export { CustomThemeProvider as ThemeProvider };
