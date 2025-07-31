'use client';

import { usePathname } from 'next/navigation';
import { Box, Divider, Drawer, MenuList } from '@mui/material';

import { useSettings } from '/src/hooks/use-settings';
import useAuth from '/src/hooks/useAuth';
import { Logo } from '/src/components/core/logo';
import { NavSearch } from '/src/components/navbar/nav-search';

import { privateRoutesV3 } from '/src/router';
import SidebarMenuItems, { getWorkspacesTab } from '/src/utils/nav-utils';
import { SettingsPopover } from '../settings-popover';
import { UserInfoPopover } from '../dashboard/layout/_components/user-info-popover';

export function MobileSideNav({ open, onClose }) {
  const pathname = usePathname();
  const { userInfo } = useAuth();
  const { openMenus, toggleMenuItem } = useSettings();
  const workspacesTab = getWorkspacesTab(userInfo);

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: 'transparent',
          },
        },
      }}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          width: 250,
          p: 2,
          bgcolor: '#5C6954',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
        }}
      >
        <Logo height={40} width={120} />
        <NavSearch isMobile={true} />
        <Divider sx={{ my: 1 }} />
        <MenuList>
          <SidebarMenuItems
            items={privateRoutesV3}
            pathname={pathname}
            openMenus={openMenus}
            toggleMenuItem={toggleMenuItem}
            isDesktop={false}
            isOpen={open}
          />
        </MenuList>
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
    </Drawer>
  );
}
