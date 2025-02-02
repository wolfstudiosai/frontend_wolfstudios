'use client';

import * as React from 'react';
import { FeatureCards } from '@/app/(public)/top-cards';
import { ThinerFooter } from '@/components/navbar/thinner-footer';
import { privateRoutes } from '@/router';
import { pxToRem } from '@/utils/utils';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import useAuth from '@/hooks/useAuth';

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
  const [isFeaturedCardVisible, setIsFeaturedCardVisible] = React.useState(true);

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
          // minHeight: '100%',
        }}
      >
        <MainNavV2 onToggle={handleSidebarToggle} onFeatureCardVisible={setIsFeaturedCardVisible} />
        {isLogin && (
          <Box
            sx={{
              transform: isFeaturedCardVisible ? 'translateY(100)' : 'translateY(-100%)',
              opacity: isFeaturedCardVisible ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
              width: '100%',
              position: 'sticky',
              top: 45,
              zIndex: 100,
            }}
          >
            <FeatureCards />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: isLogin && openSidebar ? pxToRem(260) : '0px' },
          }}
        >
          {isLogin && openSidebar && (
            <SideNavV2
              color={settings.navColor}
              items={privateRoutes}
              open={openSidebar}
              isFeaturedCardVisible={isFeaturedCardVisible}
            />
          )}
          <Box
            component="main"
            sx={{
              // '--Content-margin': '1.5rem auto',
              // '--Content-maxWidth': 'var(--maxWidth-xl)',
              // '--Content-paddingY': { xs: pxToRem(16), lg: pxToRem(18) },
              '--Content-paddingX': { xs: pxToRem(4), md: pxToRem(6) },
              '--Content-padding': '0 var(--Content-paddingX)',
              '--Content-width': '100%',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              minHeight: isFeaturedCardVisible ? 'calc(100vh - 78px)' : 'calc(100vh - 122px)',
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
