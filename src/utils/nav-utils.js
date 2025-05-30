'use client'

import { Box, Chip, Collapse, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';
import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

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

// MenuItems Component
const SidebarMenuItems = ({
  items,
  level = 0,
  openMenus,
  toggleMenuItem,
  isDesktop = false,
  isOpen = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubmenuKey, setOpenSubmenuKey] = useState(null)

  // Ref to store the hover timeout
  const hoverTimeoutRef = useRef(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef?.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleClickMenu = (event, item) => {
    if (isOpen && item.href) {
      router?.push(item.href);
    } else if (!isOpen && item.items?.length > 0) {
      setAnchorEl(event.currentTarget);
      setOpenSubmenuKey?.(item.key);
    } else if (!isOpen && !item?.items?.length) {
      router.push(item.href);
    }
  };

  // Function to open submenu
  const openSubmenu = (event, itemId) => {
    if (isOpen) return;

    // Clear any existing timeout
    if (hoverTimeoutRef?.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setAnchorEl(event.currentTarget);
    setOpenSubmenuKey?.(itemId);
  };

  // Function to close submenu
  const closeSubmenu = () => {
    if (isOpen) return;

    if (hoverTimeoutRef?.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setOpenSubmenuKey?.(null);
      if (hoverTimeoutRef?.current) {
        hoverTimeoutRef.current = null;
      }
    }, 100);
  };

  // Function to cancel submenu closing
  const cancelCloseSubmenu = () => {
    if (isOpen) return;
    if (hoverTimeoutRef?.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const iconStyles = isDesktop
    ? {
      justifyContent: 'flex-start',
      ...(!isOpen && {
        // border: '1px solid var(--mui-palette-divider)',
        // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 1,
        p: 0.5,
        ml: 0.9,
        // backgroundColor: 'background.paper',
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
          <Fragment key={item.key}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
              <MenuItem
                selected={isActive}
                onClick={(e) => handleClickMenu(e, item)}
                onMouseEnter={(e) => openSubmenu(e, item.key)}
                onMouseLeave={() => closeSubmenu()}
                onMouseOver={() => cancelCloseSubmenu()}
                sx={{
                  justifyContent: 'flex-start',
                  minWidth: 0,
                  flexGrow: 1,
                  py: 1,
                  pl: isDesktop && !isOpen ? 0 : 1.5,
                  ml: level === 0 ? 0 : level + 1,
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
                  <SidebarMenuItems
                    items={item.items}
                    level={level + 1}
                    pathname={pathname}
                    openMenus={openMenus}
                    toggleMenuItem={toggleMenuItem}
                    isDesktop={isDesktop}
                    isOpen={isOpen}
                  />
                </MenuList>
              </Collapse>
            )}
          </Fragment>
        );
      })}

      {!isOpen && isDesktop && (
        items.map(item => {
          return item.items && (
            <Popover
              key={item.key}
              open={openSubmenuKey === item.key && Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={closeSubmenu}
              onClick={closeSubmenu}
              disableRestoreFocus
              sx={{
                pointerEvents: "none",
                "& .MuiPaper-root": {
                  pointerEvents: "auto",
                  boxShadow: 3,
                  mt: 0,
                  ml: 0.5,
                  p: 0.5,
                  minWidth: 200,
                  borderRadius: 0,
                  bgcolor: 'background.paper',
                },
              }}
              slotProps={{
                paper: {
                  onMouseEnter: cancelCloseSubmenu,
                  onMouseLeave: closeSubmenu,
                },
              }}
            >
              <Box>
                {item.href && <PopoverMenuItem
                  item={item}
                  onClick={closeSubmenu}
                />}
                {item.items.map((child) => (
                  <PopoverMenuItem key={child.key} item={child} onClick={closeSubmenu} />
                ))}
              </Box>
            </Popover>
          )
        })
      )}
    </>
  );
};

// Popover menu item
const PopoverMenuItem = ({ item, onClick }) => {
  const pathname = usePathname();
  const isActive = item.href && pathname === item.href;
  return (
    <Box
      component={Link}
      href={item.href}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderRadius: 1,
        color: 'text.primary',
        textDecoration: 'none',
        typography: 'body2',
        bgcolor: isActive ? 'action.hover' : 'transparent',
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

export default SidebarMenuItems;
