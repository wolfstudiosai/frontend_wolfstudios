'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Divider, MenuList } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';

import { navColorStyles } from '../dashboard/layout/vertical/styles';
import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';
import { getWorkspacesTab } from '/src/utils/nav-utils';
import SidebarMenuItems from '/src/utils/nav-utils';
import SidebarChatProfiles from './sidebar-chat-profiles';

export function DesktopSideNav({ color = 'evident', open, isFeaturedCardVisible }) {
  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const { userInfo } = useAuth();
  const { openMenus, toggleMenuItem } = useSettings();

  const workspacesTab = getWorkspacesTab(userInfo);

  return (
    <Box
      sx={{
        ...styles,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        transition: 'width 0.3s ease',
        marginBottom: '10px',
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        }
      }}
    >
      <SidebarChatProfiles isOpen={open} />
      <Divider />
      <MenuList>
        <SidebarMenuItems
          items={dashboardFavItemsV2}
          openMenus={openMenus}
          toggleMenuItem={toggleMenuItem}
          isDesktop={true}
          isOpen={open}
        />
      </MenuList>
      <Divider />
      <MenuList>
        <SidebarMenuItems
          items={privateRoutesV2}
          openMenus={openMenus}
          toggleMenuItem={toggleMenuItem}
          isDesktop={true}
          isOpen={open}
        />
      </MenuList>
    </Box>
  );
}
