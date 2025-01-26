'use client';

import * as React from 'react';
import { FeatureCards } from '@/app/(marketing)/top-cards';
import { ThinerFooter } from '@/components/navbar/thinner-footer';
import { privateRoutes } from '@/router';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import useAuth from '@/hooks/useAuth';

import { MainNavV2, NewMainNav } from './main-nav-v2';
// import { MainNav } from './main-nav';
import { SideNav } from './side-nav';
import { useSettings } from '/src/hooks/use-settings';

export function VerticalLayout({ children }) {
  const { settings } = useSettings();
  const { isLogin } = useAuth();
  const [open, setOpen] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState === 'true' ? true : false;
    }
    return true;
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
          // minHeight: '100%',
        }}
      >
        {/* <DashboardTopNav onToggle={handleSidebarToggle} /> */}
        <MainNavV2 onToggle={handleSidebarToggle} />
        <FeatureCards />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: isLogin && open ? '280px' : '0px' },
          }}
        >
          {isLogin && open && <SideNav color={settings.navColor} items={privateRoutes} open={open} />}
          <Box
            component="main"
            sx={{
              // '--Content-margin': '1.5rem auto',
              // '--Content-maxWidth': 'var(--maxWidth-xl)',
              '--Content-paddingX': '24px',
              '--Content-paddingY': { xs: '24px', lg: '24px' },
              '--Content-padding': 'var(--Content-paddingY) var(--Content-paddingX)',
              '--Content-width': '100%',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              minHeight: 'calc(100vh - 120px)',
            }}
          >
            {children}
          </Box>
          {/* <Footer /> */}
        </Box>
        <ThinerFooter />
      </Box>
    </React.Fragment>
  );
}
