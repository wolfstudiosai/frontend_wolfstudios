'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';
import { ThinnerFooter } from '/src/components/navbar/thinner-footer';

import { MainNavV2 } from './main-nav-v2';
import { DesktopSideNav, SideNavV2 } from './desktop-side-nav';
import { FeatureCards } from '/src/app/(public)/top-cards';
import { pxToRem } from '/src/utils/helper';
import { useMenuCollapse } from '/src/utils/nav-utils';

export function LayoutView({ children }) {
  const { settings, toggleMenuItem, isFeaturedCardVisible, setIsFeaturedCardVisible } = useSettings();
  const { isLogin } = useAuth();
  // const { openMenus, toggleMenuItem } = useMenuCollapse();
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
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <MainNavV2 onToggle={handleSidebarToggle} onFeatureCardVisible={setIsFeaturedCardVisible} />
        {isLogin && (
          <Box
            sx={{
              backgroundColor: 'var(--mui-palette-background-default)',
              transform: isFeaturedCardVisible ? 'translateY(100)' : 'translateY(-100%)',
              opacity: isFeaturedCardVisible ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
              width: '100%',
              position: 'sticky',
              top: 43,
              zIndex: 100,
            }}
          >
            {isFeaturedCardVisible ? <FeatureCards /> : <Box />}
          </Box>
        )}
        <Box
          sx={{
            display: isFeaturedCardVisible ? 'flex' : 'block',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: isLogin ? (openSidebar ? pxToRem(260) : pxToRem(60)) : pxToRem(0) },
          }}
        >
          {isLogin && (
            <DesktopSideNav color={settings.navColor} open={openSidebar} isFeaturedCardVisible={isFeaturedCardVisible} />
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
        </Box>
        <ThinnerFooter isFeaturedCardVisible={isFeaturedCardVisible} />
      </Box>
    </React.Fragment>
  );
}
