'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapse, Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useColorScheme } from '@mui/material/styles';

import { Iconify } from '/src/components/iconify/iconify';

import { navColorStyles } from './styles';
import { dashboardFavItemsV2, privateRoutesV2 } from '/src/router';
import { pxToRem } from '/src/utils/helper';

export function SideNavV2({ color = 'evident', items = [], open, isFeaturedCardVisible }) {
  const pathname = usePathname();
  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const [openMenus, setOpenMenus] = React.useState({});

  const toggleMenuItem = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isActive = item.href && pathname === item.href;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = openMenus[item.key] || false;

      // Make parent item clickable AND expandable
      const MenuButton = ({ children }) => (
        <MenuItem
          component={item.href ? Link : 'div'}
          href={item.href || undefined}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleMenuItem(item.key);
            }
          }}
          sx={{ mb: hasChildren && 1 }}
          selected={isActive}
        >
          <ListItemIcon>
            <Iconify icon={item.icon} width={15} height={15} color="text.primary" />
          </ListItemIcon>

          <ListItemText
            primary={item.title}
            sx={{
              color: 'text.primary',
              ...(hasChildren && { fontWeight: 800 }),
            }}
          />

          {hasChildren && (
            <Iconify
              icon={isExpanded ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'}
              width={10}
              height={10}
              color="text.secondary"
            />
          )}

          {!hasChildren && item.count && (
            <Chip label={item.count} size="small" fontSize={10} color="text.primary" sx={{ borderRadius: 1 }} />
          )}
        </MenuItem>
      );

      return (
        <React.Fragment key={item.key}>
          <MenuButton />
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <MenuList sx={{ pl: level + 2 }}>{renderMenuItems(item.items, level + 1)}</MenuList>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    open && (
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
          paddingRight: pxToRem(5),
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          background: 'transparent',
        }}
      >
        <MenuList>{renderMenuItems(dashboardFavItemsV2)}</MenuList>
        <Divider />
        <MenuList>{renderMenuItems(privateRoutesV2)}</MenuList>
      </Box>
    )
  );
}
