'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Iconify } from '@/components/iconify/iconify';
import { dashboardFavItems, privateRoutes } from '@/router';
import { pxToRem } from '@/utils/helper';
import { Collapse, Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useColorScheme } from '@mui/material/styles';

import useAuth from '@/hooks/useAuth';

import { navColorStyles } from './styles';

// import Link from 'next/link';

const logoColors = {
  dark: { blend_in: 'light', discrete: 'light', evident: 'light' },
  light: { blend_in: 'dark', discrete: 'dark', evident: 'light' },
};

export function SideNavV2({ color = 'evident', items = [], open, isFeaturedCardVisible }) {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  const { colorScheme = 'light' } = useColorScheme();
  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];
  const [openMenus, setOpenMenus] = React.useState({});
  const router = useRouter();

  console.log(openMenus, '  openMenus');

  const toggleMenuItem = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isActive = item.href && pathname === item.href;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = openMenus[item.key] || false;

      return (
        <React.Fragment key={item.key}>
          <MenuItem onClick={() => hasChildren && toggleMenuItem(item.key)} sx={{ mb: hasChildren && 1 }} selected={isActive}>
            <ListItemIcon>
              <Iconify icon={item.icon} width={15} height={15} color="text.primary" />
            </ListItemIcon>

            {item.href ? (
              <Link href={item.href} passHref style={{ textDecoration: 'none' }}>
                <ListItemText primary={item.title} sx={{ color: 'text.primary' }} />
              </Link>
            ) : (
              <ListItemText primary={item.title} sx={{ color: 'text.primary', fontWeight: 800 }} />
            )}
            {hasChildren && (
              <>
                <Iconify
                  icon={isExpanded ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'}
                  width={10}
                  height={10}
                  color="text.secondary"
                />
              </>
            )}
            {!hasChildren && item.count && (
              <Chip label={item.count} size="small" fontSize={10} color="text.primary" sx={{ borderRadius: 1 }} />
            )}
          </MenuItem>

          {/* Collapsible Children (Placed Outside MenuItem) */}
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
          backgroundColor: 'var(--mui-palette-background-level2)',
          borderRight: 'var(--SideNav-border)',
          color: 'var(--SideNav-color)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          height: '100%',
          left: 10,
          position: 'fixed',
          top: isFeaturedCardVisible ? 95 : 50,
          width: open ? 'var(--SideNav-width)' : '70px',
          zIndex: 'var(--SideNav-zIndex)',
          transition: 'width 0.3s ease',
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          marginBottom: '10px',
          border: '1px solid var(--mui-palette-background-level2)',
          height: isFeaturedCardVisible ? 'calc(100vh - 135px)' : 'calc(100vh - 90px)',
          paddingRight: pxToRem(5),
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          // '&::-webkit-scrollbar-thumb': {
          //   backgroundColor: 'transparent', // Hide the thumb
          // },
          // '&:hover::-webkit-scrollbar-thumb': {
          //   backgroundColor: 'var(--mui-palette-divider)', // Show on hover
          //   borderRadius: '10px',
          // },
        }}
      >
        {/* static quick links */}
        <Box sx={{ mb: -1.3 }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <Iconify icon="material-symbols-light:draft-outline" width={20} height={20} color="text.primary" />
              </ListItemIcon>
              <ListItemText sx={{ color: 'text.primary' }}>Drafts</ListItemText>
              <Chip label={12} size="small" fontSize={10} color="text.primary" sx={{ borderRadius: 1 }} />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Iconify
                  icon="material-symbols-light:chat-outline-rounded"
                  width={20}
                  height={20}
                  color="text.primary"
                />
              </ListItemIcon>
              <ListItemText sx={{ color: 'text.primary' }}>Inbox</ListItemText>
              <Chip label={12} size="small" fontSize={10} color="text.primary" sx={{ borderRadius: 1 }} />
            </MenuItem>
          </MenuList>
        </Box>
        <MenuList>{renderMenuItems(dashboardFavItems)}</MenuList>
        <Divider />
        {/* dynamic nested menu items */}
        <MenuList>{renderMenuItems(privateRoutes)}</MenuList>
      </Box>
    )
  );
}
