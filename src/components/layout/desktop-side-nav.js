'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Divider, MenuList } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

import useAuth from '/src/hooks/useAuth';
import { navColorStyles } from '../dashboard/layout/vertical/styles';
import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';
import { pxToRem } from '/src/utils/helper';
import { getWorkspacesTab, renderMenuItems, useMenuCollapse } from '/src/utils/nav-utils';

export function DesktopSideNav({ color = 'evident', open, isFeaturedCardVisible }) {
  const pathname = usePathname();
  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const { userInfo } = useAuth();
  const { openMenus, toggleMenuItem } = useMenuCollapse();

  const workspacesTab = getWorkspacesTab(userInfo);

  return (
    <Box
      sx={{
        ...styles,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        left: 10,
        position: 'fixed',
        top: isFeaturedCardVisible ? 118 : 50,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        transition: 'width 0.3s ease',
        borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        marginBottom: '10px',
        border: '1px solid var(--mui-palette-divider)',
        height: isFeaturedCardVisible ? 'calc(100vh - 160px)' : 'calc(100vh - 95px)',
        paddingX: open ? pxToRem(15) : 0,
        // paddingLeft: open ? pxToRem(5) : 0,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0px',
        },
      }}
    >
      <MenuList>
        {renderMenuItems({
          items: [...dashboardFavItemsV2, workspacesTab],
          pathname,
          openMenus,
          toggleMenuItem,
          isDesktop: true,
          isOpen: open,
        })}
      </MenuList>
      <Divider />
      <MenuList>
        {renderMenuItems({
          items: privateRoutesV2,
          pathname,
          openMenus,
          toggleMenuItem,
          isDesktop: true,
          isOpen: open,
        })}
      </MenuList>
    </Box>
  );
}