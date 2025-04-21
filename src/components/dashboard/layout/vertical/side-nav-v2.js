'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapse, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useColorScheme } from '@mui/material/styles';

import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

import { navColorStyles } from './styles';
import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';
import { pxToRem } from '/src/utils/helper';

export function SideNavV2({ color = 'evident', open, isFeaturedCardVisible }) {
  const pathname = usePathname();
  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const [openMenus, setOpenMenus] = React.useState({});
  const { userInfo } = useAuth();

  const toggleMenuItem = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  {
    /** renderMenuItems which open submenu on click of arrow only submenu will open on arrow click **/
  }
  const renderMenuItems = (items, level = 0, workspaces = []) => {
    const newItems = [...items];
    if (workspaces?.length > 0) {
      const workspacesTab = {
        key: 'workspaces',
        title: 'Workspaces',
        icon: 'fluent:chat-12-regular',
        items: workspaces?.map((workspace) => ({
          key: workspace.slug,
          title: workspace.name,
          icon: 'fluent:chat-12-regular',
          href: `/workspace/${workspace.slug}`,
          allowedRoles: ['admin', 'user', 'super_admin'],
        })),
      };

      console.log('workspacesTab', workspacesTab);
      newItems.push(workspacesTab);
    }
    return newItems.map((item) => {
      const isActive = item.href && pathname === item.href;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = openMenus[item.key] || false;

      // these are just shorthand for your existing sx objects
      const iconStyles = {
        justifyContent: 'flex-start',
        ...(!open && {
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 1,
          p: 0.5,
          backgroundColor: 'background.paper',
        }),
      };
      const textStyles = {
        color: 'text.primary',
        ...(hasChildren && { fontWeight: 800 }),
      };

      const MenuButton = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {/** Icon and Text area **/}
          {item.href ? (
            <Link href={item.href} passHref legacyBehavior>
              <MenuItem
                component="a"
                sx={{ justifyContent: 'flex-start', minWidth: 0, flexGrow: 1 }}
                selected={isActive}
              >
                <ListItemIcon sx={iconStyles} title={open ? '' : item.title}>
                  <Iconify icon={item.icon} width={open ? 20 : 24} height={open ? 20 : 24} color="text.primary" />
                </ListItemIcon>
                {open && <ListItemText primary={item.title} sx={textStyles} />}
                {!open && item.count && (
                  <Chip
                    label={item.count}
                    size="small"
                    fontSize={10}
                    color="text.primary"
                    sx={{ borderRadius: 1, position: 'absolute', top: 8, right: 8 }}
                  />
                )}
              </MenuItem>
            </Link>
          ) : (
            <MenuItem
              component="div"
              onClick={() => hasChildren && toggleMenuItem(item.key)}
              sx={{ justifyContent: 'flex-start', minWidth: 0, flexGrow: 1 }}
              selected={isActive}
            >
              <ListItemIcon sx={iconStyles} title={open ? '' : item.title}>
                <Iconify icon={item.icon} width={open ? 20 : 24} height={open ? 20 : 24} color="text.primary" />
              </ListItemIcon>
              {open && <ListItemText primary={item.title} sx={textStyles} />}
              {!open && item.count && (
                <Chip
                  label={item.count}
                  size="small"
                  fontSize={10}
                  color="text.primary"
                  sx={{ borderRadius: 1, position: 'absolute', top: 8, right: 8 }}
                />
              )}
            </MenuItem>
          )}

          {/** Arrow toggle **/}
          {hasChildren && open && (
            <IconButton size="small" onClick={() => toggleMenuItem(item.key)} sx={{ ml: 'auto' }}>
              <Iconify
                icon={isExpanded ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'}
                width={10}
                height={10}
                color="text.secondary"
              />
            </IconButton>
          )}
        </Box>
      );

      return (
        <React.Fragment key={item.key}>
          <MenuButton />
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <MenuList sx={{ pl: open ? level + 2 : 0 }}>
                {renderMenuItems(item.items, level + 1, workspaces)}
              </MenuList>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box
      sx={{
        ...styles,
        bgcolor: 'text-primary',
        borderRight: 'var(--SideNav-border)',
        color: 'var(--SideNav-color)',
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
        border: '1px solid var(--mui-palette-background-level2)',
        height: isFeaturedCardVisible ? 'calc(100vh - 160px)' : 'calc(100vh - 93px)',
        paddingRight: open ? pxToRem(5) : 0,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        background: 'transparent',
      }}
    >
      <MenuList>{renderMenuItems(dashboardFavItemsV2, 0, userInfo?.workspaces)}</MenuList>
      <Divider />
      <MenuList>{renderMenuItems(privateRoutesV2)}</MenuList>
    </Box>
  );
}
