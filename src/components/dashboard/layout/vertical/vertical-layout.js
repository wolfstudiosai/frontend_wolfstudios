'use client';

import * as React from 'react';
import { dashboardItems } from '@/router';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '/src/hooks/use-settings';
import { LocalizationProvider } from '@/components/core/localization-provider';

import { MainNav } from './main-nav';
import { SideNav } from './side-nav';

export function VerticalLayout({ children }) {
  const { settings } = useSettings();
  const [open, setOpen] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState === 'true' ? true : false;
    }
    return true; // default state is expanded before setting to localStorage
  });

  const handleSidebarToggle = () => {
    setOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarState', newState);
      return newState;
    });
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': open ? '280px' : '70px',
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
        <SideNav
            color={settings.navColor}
            items={dashboardItems}
            open={open}
            onToggle={handleSidebarToggle}
          />
          <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: open ? '280px' : '70px' } }}>
            <MainNav items={dashboardItems} />
            <Box
              component="main"
              sx={{
                '--Content-margin': '0 auto',
                // '--Content-maxWidth': 'var(--maxWidth-xl)',
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
