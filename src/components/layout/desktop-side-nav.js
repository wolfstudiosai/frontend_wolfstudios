'use client';

import { Box, Divider, IconButton, ListItem, MenuList, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';

import { Person, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { UserInfoPopover } from '../dashboard/layout/_components/user-info-popover';
import { navColorStyles } from '../dashboard/layout/vertical/styles';
import SidebarChatProfiles from './sidebar-chat-profiles';
import { privateRoutesV3 } from '/src/router';
import SidebarMenuItems, { getWorkspacesTab } from '/src/utils/nav-utils';

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
          items={privateRoutesV3}
          openMenus={openMenus}
          toggleMenuItem={toggleMenuItem}
          isDesktop={true}
          isOpen={open}
        />
      </MenuList>
      <Divider sx={{ mb: open ? 1 : 2 }} />
      {/* User settings */}
      {!open && <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 0 }}>
        <UserInfoPopover sidebar />
      </Box>}
      <Box sx={{ display: 'flex', justifyContent: open ? 'start' : 'center', alignItems: 'center', my: open ? 0 : 1 }}>
        {open ? (
          <ListItem
            as={Link}
            href="/user-profile"
            sx={{
              gap: 1.5,
              py: 1,
              px: 1.5,
              color: "text.primary",
              cursor: "pointer",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}>
            <Person fontSize={open ? "small" : "inherit"} />
            <Typography>Profile</Typography>
          </ListItem>
        ) : (
          <IconButton as={Link} href="/user-profile" sx={{ cursor: "pointer" }}>
            <Person fontSize={open ? "small" : "inherit"} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: open ? 'start' : 'center', alignItems: 'center' }}>
        {open ? (
          <ListItem
            as={Link}
            href="/dashboard/settings/security"
            sx={{
              gap: 1.5,
              py: 1,
              px: 1.5,
              color: "text.primary",
              cursor: "pointer",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}>
            <Settings fontSize={open ? "small" : "inherit"} />
            <Typography>Settings</Typography>
          </ListItem>
        ) : (
          <IconButton as={Link} href="/dashboard/settings/security" sx={{ cursor: "pointer" }}>
            <Settings fontSize={open ? "small" : "inherit"} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
