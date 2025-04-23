'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Divider, Drawer, MenuList } from '@mui/material';

import useAuth from '/src/hooks/useAuth';
import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';
import { getWorkspacesTab, renderMenuItems, useMenuCollapse } from '/src/utils/nav-utils';

export function MobileSideNav({ open, onClose }) {
  const pathname = usePathname();
  const { userInfo } = useAuth();
  const { openMenus, toggleMenuItem } = useMenuCollapse();

  const workspacesTab = getWorkspacesTab(userInfo);

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          p: 2,
          bgcolor: 'background.default',
          borderRight: '1px solid',
          borderColor: 'divider',
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
        <MenuList>
          {renderMenuItems({
            items: [...dashboardFavItemsV2, workspacesTab],
            pathname,
            openMenus,
            toggleMenuItem,
            isDesktop: false,
          })}
        </MenuList>
        <Divider sx={{ my: 1 }} />
        <MenuList>
          {renderMenuItems({
            items: privateRoutesV2,
            pathname,
            openMenus,
            toggleMenuItem,
            isDesktop: false,
          })}
        </MenuList>
      </Box>
    </Drawer>
  );
}