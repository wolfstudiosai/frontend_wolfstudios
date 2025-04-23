'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Chip, Collapse, Divider, Drawer, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';

import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';

export function MobileSideNav({ open, onClose }) {
  const pathname = usePathname();
  const { userInfo } = useAuth();
  const [openMenus, setOpenMenus] = React.useState({});

  const workspacesTab = {
    key: 'workspaces',
    title: 'Workspaces',
    icon: 'fluent:chat-12-regular',
    items: userInfo?.workspaces?.map((workspace) => ({
      key: workspace.slug,
      title: workspace.name,
      icon: 'fluent:chat-12-regular',
      href: `/workspace/${workspace.slug}`,
      allowedRoles: ['admin', 'user', 'super_admin'],
    })),
  };

  const toggleMenuItem = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isActive = item.href && pathname === item.href;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = openMenus[item.key] || false;

      const iconStyles = {
        minWidth: 40,
      };
      const textStyles = {
        color: 'text.primary',
        ...(hasChildren && { fontWeight: 700 }),
      };

      return (
        <React.Fragment key={item.key}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <MenuItem
              component={item.href ? Link : 'div'}
              href={item.href}
              selected={isActive}
              sx={{ py: 1, pl: level * 2 + 2, flexGrow: 1 }}
              onClick={() => hasChildren && toggleMenuItem(item.key)}
            >
              <ListItemIcon sx={iconStyles}>
                <Iconify icon={item.icon} width={20} height={20} color="text.primary" />
              </ListItemIcon>
              <ListItemText primary={item.title} sx={textStyles} />
              {item.count && (
                <Chip
                  label={item.count}
                  size="small"
                  sx={{
                    fontSize: 10,
                    borderRadius: 1,
                    bgcolor: 'background.neutral',
                    color: 'text.primary',
                  }}
                />
              )}
            </MenuItem>
            {hasChildren && (
              <IconButton
                size="small"
                onClick={() => toggleMenuItem(item.key)}
                sx={{ mr: 1 }}
              >
                <Iconify
                  icon={isExpanded ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'}
                  width={10}
                  height={10}
                  color="text.secondary"
                />
              </IconButton>
            )}
          </Box>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <MenuList sx={{ pl: 2 }}>{renderMenuItems(item.items, level + 1)}</MenuList>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

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
        <MenuList>{renderMenuItems([...dashboardFavItemsV2, workspacesTab])}</MenuList>
        <Divider sx={{ my: 1 }} />
        <MenuList>{renderMenuItems(privateRoutesV2)}</MenuList>
      </Box>
    </Drawer>
  );
}