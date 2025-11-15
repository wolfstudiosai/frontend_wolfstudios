'use client';

import React from 'react';
import { Box, MenuList } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';

import { SettingsPopover } from '../../components/settings-popover';
import { UserInfoPopover } from '../dashboard/layout/_components/user-info-popover';
import { navColorStyles } from '../dashboard/layout/vertical/styles';
import SidebarChatProfiles from './sidebar-chat-profiles';
import { adminPrivateRoutesV3, userPrivateRoutes } from '/src/router';
import SidebarMenuItems from '/src/utils/nav-utils';

export function DesktopSideNav({ color = 'evident', open, isFeaturedCardVisible }) {
  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const { userInfo } = useAuth();
  const { openMenus, toggleMenuItem } = useSettings();

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
        },
      }}
    >

      {/* Admin */}
      {userInfo.role === 'SUPER_ADMIN' && (
        <>
          <SidebarChatProfiles isOpen={open} />
          <MenuList>
            <SidebarMenuItems
              items={adminPrivateRoutesV3}
              openMenus={openMenus}
              toggleMenuItem={toggleMenuItem}
              isDesktop={true}
              isOpen={open}
            />
          </MenuList>
        </>
      )}

      {/* User */}
      {userInfo.role === 'USER' && (
        <>
          <SidebarChatProfiles isOpen={open} />
          <MenuList>
            <SidebarMenuItems
              items={userPrivateRoutes}
              openMenus={openMenus}
              toggleMenuItem={toggleMenuItem}
              isDesktop={true}
              isOpen={open}
            />
          </MenuList>
        </>
      )}

      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: `${open ? 'start' : 'center'}`,
          gap: 2,
        }}
      >
        <SettingsPopover isSidebarOpen={open} />
        <UserInfoPopover isSidebarOpen={open} />
      </Box>
    </Box>
  );
}
