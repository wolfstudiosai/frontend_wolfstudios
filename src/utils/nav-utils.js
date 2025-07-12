'use client'

import { Box, Chip, Collapse, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
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
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

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

      {!isOpen && isDesktop && items.map((item) => {
        if (!item.items?.length) return null;

        const handleSubmenuEnter = (event, itemKey) => {
          setHoveredItem(itemKey);
          setSubmenuAnchorEl(event.currentTarget);
        };

        const handleSubmenuLeave = () => {
          setHoveredItem(null);
          setSubmenuAnchorEl(null);
        };

        return (
          <Popover
            key={item.key}
            open={openSubmenuKey === item.key && Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            onClose={closeSubmenu}
            disableRestoreFocus
            sx={{ pointerEvents: 'none' }}
            slotProps={{
              paper: {
                onMouseEnter: cancelCloseSubmenu,
                onMouseLeave: closeSubmenu,
                sx: {
                  pointerEvents: 'auto',
                  boxShadow: 3,
                  p: 0.5,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  minWidth: 200,
                }
              }
            }}
          >
            <Box>
              <Box
                onClick={() => item.href && router.push(item.href)}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  bgcolor: item.href && pathname === item.href ? 'action.hover' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}>
                <Typography variant="body2" noWrap>
                  {item.title}
                </Typography>
              </Box>
              {item.items.map((child) => {
                const isActive = child.href && pathname === child.href;
                return (
                  <Box
                    key={child.key}
                    onMouseEnter={(e) => handleSubmenuEnter(e, child.key)}
                    onMouseLeave={handleSubmenuLeave}
                    onClick={() => child.href && router.push(child.href)}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: 'pointer',
                      bgcolor: isActive ? 'action.hover' : 'transparent',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {child.title}
                    </Typography>

                    {/* Recursive Submenu Popover */}
                    {child.items?.length > 0 && hoveredItem === child.key && (
                      <Popover
                        open={Boolean(submenuAnchorEl)}
                        anchorEl={submenuAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        onClose={handleSubmenuLeave}
                        disableRestoreFocus
                        sx={{ pointerEvents: 'none' }}
                        slotProps={{
                          paper: {
                            onMouseEnter: () => {
                              clearTimeout(hoverTimeoutRef.current);
                            },
                            onMouseLeave: handleSubmenuLeave,
                            sx: {
                              pointerEvents: 'auto',
                              p: 0.5,
                              minWidth: 200,
                              bgcolor: 'background.paper',
                            },
                          }
                        }}
                      >
                        {child.items?.map((item) => <SidebarPopoverItem key={item.key} item={item} />)}
                      </Popover>
                    )}
                  </Box>
                )
              })}
            </Box>
          </Popover>
        );
      })}


    </>
  );
};

// Popover menu item
export const SidebarPopoverItem = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = item.href && pathname === item.href;

  return (
    <Box>
      <Box
        key={item.key}
        onClick={() => item.href && router.push(item.href)}
        sx={{
          px: 2,
          py: 1,
          cursor: 'pointer',
          bgcolor: isActive ? 'action.hover' : 'transparent',
          '&:hover': { bgcolor: 'action.hover' }
        }}
      >
        <Typography variant="body2" noWrap>
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
};


export default SidebarMenuItems;
