'use client';

import * as React from 'react';
import { dashboardItems } from '@/router';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '/src/hooks/use-settings';
import { LocalizationProvider } from '/src/components/core/localization-provider';

import { MainNav } from './main-nav';
import { SideNav } from './side-nav';

export function VerticalLayout({ children }) {
  const { settings } = useSettings();

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <LocalizationProvider>
          <SideNav color={settings.navColor} items={dashboardItems} />
          <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
            <MainNav items={dashboardItems} />
            <Box
              component="main"
              sx={{
                '--Content-margin': '0 auto',
                '--Content-maxWidth': 'var(--maxWidth-xl)',
                '--Content-paddingX': '24px',
                '--Content-paddingY': { xs: '24px', lg: '24px' },
                '--Content-padding': 'var(--Content-paddingY) var(--Content-paddingX)',
                '--Content-width': '100%',
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
              }}
            >
              {children}
            </Box>
          </Box>
        </LocalizationProvider>
      </Box>
    </React.Fragment>
  );
}
