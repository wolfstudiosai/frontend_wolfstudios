'use client';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { ThinnerFooter } from '/src/components/navbar/thinner-footer';
import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';

import { DesktopSideNav } from './desktop-side-nav';
import { MainNavV2 } from './main-nav-v2';
import { NotificationCards } from '/src/app/(public)/notification-card';
import { pxToRem } from '/src/utils/helper';

export function LayoutView({ children }) {
  const { settings, toggleMenuItem, isFeaturedCardVisible, setIsFeaturedCardVisible } = useSettings();
  const { isLogin } = useAuth();
  const [openSidebar, setOpenSidebar] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState === 'true' ? true : false;
    }
    return true;
  });
  // const [isFeaturedCardVisible, setIsFeaturedCardVisible] = React.useState(false);

  const handleSidebarToggle = () => {
    setOpenSidebar((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarState', newState);
      return newState;
    });
    toggleMenuItem();
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': openSidebar ? pxToRem(250) : pxToRem(50),
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />

      <Box display={isLogin ? 'flex' : 'block'} width="100vw" height="100vh" overflow="hidden">
        <Box
          display={isLogin ? 'flex' : 'none'}
          justifyContent="center"
          alignItems="center"
          width="auto"
          bgcolor="var(--mui-palette-background-default)"
          sx={{ border: '1px solid var(--mui-palette-divider)', p: { xs: 0, lg: 1 } }}
        >
          <DesktopSideNav color={settings.navColor} open={openSidebar} isFeaturedCardVisible={isFeaturedCardVisible} />
        </Box>
        <Box
          id="scrollable_container"
          sx={{ flex: 1, height: '100%', position: 'relative', overflowX: 'hidden', overflowY: 'auto' }}
        >
          <MainNavV2 onToggle={handleSidebarToggle} onFeatureCardVisible={setIsFeaturedCardVisible} />
          {isLogin && (
            <Box
              sx={{
                backgroundColor: 'var(--mui-palet˝te-background-default)',
                transform: isFeaturedCardVisible ? 'translateY(100)' : 'translateY(-100%)',
                opacity: isFeaturedCardVisible ? 1 : 0,
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                width: '100%',
                position: 'sticky',
                top: 43,
                zIndex: 100,
              }}
            >
              {isFeaturedCardVisible ? <NotificationCards /> : <Box />}
            </Box>
          )}

          <Box
            component="main"
            sx={{
              '--Content-paddingY': { xs: pxToRem(2), lg: pxToRem(4) },
              '--Content-paddingX': { xs: pxToRem(6), md: pxToRem(8), lg: pxToRem(10), xl: pxToRem(12) },
              '--Content-padding': 'var(--Content-paddingY) 0',
              '--Content-width': '100%',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              minHeight: isFeaturedCardVisible ? 'calc(100vh - 78px)' : 'calc(100vh - 76px)',
              padding: 'var(--Content-paddingY) var(--Content-paddingX)',
              overflow: 'hidden',
            }}
          >
            {children}
          </Box>
          <ThinnerFooter isFeaturedCardVisible={isFeaturedCardVisible} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
