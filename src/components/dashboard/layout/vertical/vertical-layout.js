'use client';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import { FeatureCards } from '/src/app/(public)/top-cards';
import { ThinerFooter } from '/src/components/navbar/thinner-footer';
import { pxToRem } from '/src/utils/helper';

import useAuth from '/src/hooks/useAuth';

import { MainNavV2 } from './main-nav-v2';
import { SideNavV2 } from './side-nav-v2';
import { useSettings } from '/src/hooks/use-settings';

export function VerticalLayout({ children }) {
  const { settings } = useSettings();
  const { isLogin } = useAuth();
  const [openSidebar, setOpenSidebar] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState === 'true' ? true : false;
    }
    return true;
  });
  const [isFeaturedCardVisible, setIsFeaturedCardVisible] = React.useState(false);

  const handleSidebarToggle = () => {
    setOpenSidebar((prev) => {
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
            '--SideNav-width': open ? pxToRem(250) : '70px',
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
            pl: { lg: isLogin && openSidebar ? pxToRem(270) : '0px' },
          }}
        >
          {isLogin && openSidebar && (
            // <MiniNav color={settings.navColor} open={openSidebar} isFeaturedCardVisible={isFeaturedCardVisible} />
            <SideNavV2
              color={settings.navColor}
              open={openSidebar}
              isFeaturedCardVisible={isFeaturedCardVisible}
            />
          )}
          <Box
            component="main"
            sx={{
              // '--Content-margin': '1.5rem auto',
              // '--Content-maxWidth': 'var(--maxWidth-xl)',
              '--Content-paddingY': { xs: pxToRem(2), lg: pxToRem(4) },
              '--Content-paddingX': { xs: pxToRem(4), md: pxToRem(6), lg: pxToRem(8), xl: pxToRem(12) },
              '--Content-padding': 'var(--Content-paddingY) 0',
              '--Content-width': '100%',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              minHeight: isFeaturedCardVisible ? 'calc(100vh - 78px)' : 'calc(100vh - 76px)',
              padding: 'var(--Content-paddingY) var(--Content-paddingX)',
            }}
          >
            {children}
          </Box>
        </Box>
        <ThinerFooter isFeaturedCardVisible={isFeaturedCardVisible} />
      </Box>
    </React.Fragment>
  );
}
