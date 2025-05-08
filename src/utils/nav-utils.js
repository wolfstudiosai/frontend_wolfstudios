import {
  Box,
  Chip,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import { Iconify } from '/src/components/iconify/iconify';

// Utility to generate workspaces tab
export function getWorkspacesTab(userInfo) {
  return {
    key: 'workspaces',
    title: 'Workspaces',
    icon: 'fluent:chat-12-regular',
    items:
      userInfo?.workspaces?.map((workspace) => ({
        key: workspace.slug,
        title: workspace.name,
        icon: 'fluent:chat-12-regular',
        href: `/workspace/${workspace.slug}`,
        allowedRoles: ['admin', 'user', 'super_admin'],
      })) || [],
  };
}

// Shared renderMenuItems function
export function renderMenuItems({
  items,
  level = 0,
  pathname,
  openMenus,
  toggleMenuItem,
  isDesktop = false,
  isOpen = true,
  router,
  anchorEl,
  setAnchorEl,
  popoverItem,
  setPopoverItem,
}) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverItem(null);
    console.log('handleClose');
  };

  const handleClickMenu = (event, item) => {
    if (isOpen && item.href) {
      router.push(item.href);
    } else if (!isOpen && item.items?.length > 0) {
      setAnchorEl(event.currentTarget);
      setPopoverItem(item);
    } else if (!isOpen && !item?.items?.length) {
      router.push(item.href);
    }
  };

  const iconStyles = isDesktop
    ? {
        justifyContent: 'flex-start',
        ...(!isOpen && {
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 1,
          p: 0.5,
          ml: 0.9,
          backgroundColor: 'background.paper',
        }),
      }
    : { minWidth: 40 };

  const textStyles = {
    color: 'text.primary',
    fontWeight: isDesktop ? 800 : 700,
  };

  return (
    <>
      {items.map((item) => {
        const isActive = item.href && pathname === item.href;
        const hasChildren = item.items && item.items.length > 0;
        const isExpanded = openMenus[item.key] || false;

        return (
          <React.Fragment key={item.key}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
              <MenuItem
                selected={isActive}
                onClick={(e) => handleClickMenu(e, item)}
                sx={{
                  justifyContent: 'flex-start',
                  minWidth: 0,
                  flexGrow: 1,
                  py: 1,
                  pl: isDesktop && !isOpen ? 0 : level === 0 ? 0 : level + 1,
                }}
              >
                <ListItemIcon sx={iconStyles} title={isDesktop && !isOpen ? item.title : ''}>
                  <Iconify
                    icon={item.icon}
                    width={isDesktop && !isOpen ? 24 : 20}
                    height={isDesktop && !isOpen ? 24 : 20}
                    color="text.primary"
                  />
                </ListItemIcon>
                {(isDesktop ? isOpen : true) && <ListItemText primary={item.title} sx={textStyles} />}
                {isDesktop && !isOpen && item.count && (
                  <Chip
                    label={item.count}
                    size="small"
                    sx={{ borderRadius: 1, position: 'absolute', top: 8, right: 8 }}
                  />
                )}
              </MenuItem>

              {hasChildren && (isDesktop ? isOpen : true) && (
                <IconButton size="small" onClick={() => toggleMenuItem(item.key)} sx={{ mr: isDesktop ? 'auto' : 1 }}>
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
                <MenuList>
                  {renderMenuItems({
                    items: item.items,
                    level: level + 1,
                    pathname,
                    openMenus,
                    toggleMenuItem,
                    isDesktop,
                    isOpen,
                    router,
                    anchorEl,
                    setAnchorEl,
                    popoverItem,
                    setPopoverItem,
                  })}
                </MenuList>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}

      {open && popoverItem && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 0,
                boxShadow: 3,
                mt: -5,
                minWidth: 220,
                p: 1,
                bgcolor: 'background.paper',
              },
            },
          }}
        >
          <Box>
            <PopoverMenuItem item={popoverItem} handleClose={handleClose} />
            {popoverItem.items.map((child) => (
              <PopoverMenuItem key={child.key} item={child} handleClose={handleClose} />
            ))}
          </Box>
        </Popover>
      )}
    </>
  );
}

// Popover menu item
const PopoverMenuItem = ({ item, handleClose }) => {
  return (
    <Box
      component={Link}
      href={item.href}
      onClick={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderRadius: 1,
        color: 'text.primary',
        textDecoration: 'none',
        typography: 'body2',
        '&:hover': {
          bgcolor: 'action.hover',
          textDecoration: 'none',
        },
      }}
    >
      <Typography variant="body2" noWrap>
        {item.title}
      </Typography>
    </Box>
  );
};
