'use client';

import { Button, Popover, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Iconify } from '/src/components/iconify/iconify';
import { dashboardFavItems } from '/src/router';


import { navColorStyles } from './styles';

// import Link from 'next/link';

const logoColors = {
    dark: { blend_in: 'light', discrete: 'light', evident: 'light' },
    light: { blend_in: 'dark', discrete: 'dark', evident: 'light' },
};

export function MiniNav({ color = 'evident', open, isFeaturedCardVisible }) {
    const pathname = usePathname();

    const { colorScheme = 'light' } = useColorScheme();
    const styles = navColorStyles[colorScheme][color];
    const [openMenus, setOpenMenus] = React.useState({});

    const toggleMenuItem = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const openSubMenu = Boolean(anchorEl);
    const id = openSubMenu ? 'simple-popover' : undefined;

    // const renderMenuItems = (items, level = 0) => {
    //     return items.map((item) => {
    //         const isActive = item.href && pathname === item.href;
    //         const hasChildren = item.items && item.items.length > 0;
    //         const isExpanded = openMenus[item.key] || false;

    //         return (
    //             <React.Fragment key={item.key}>
    //                 <MenuItem onClick={() => hasChildren && toggleMenuItem(item.key)} sx={{ mb: hasChildren && 1 }} selected={isActive}>
    //                     <ListItemIcon>
    //                         <Iconify icon={item.icon} width={15} height={15} color="text.primary" />
    //                     </ListItemIcon>
    //                     {hasChildren && (
    //                         <>
    //                             <Iconify
    //                                 icon={isExpanded ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'}
    //                                 width={10}
    //                                 height={10}
    //                                 color="text.secondary"
    //                             />
    //                         </>
    //                     )}
    //                     {!hasChildren && item.count && (
    //                         <Chip label={item.count} size="small" fontSize={10} color="text.primary" sx={{ borderRadius: 1 }} />
    //                     )}
    //                 </MenuItem>

    //                 {/* Collapsible Children (Placed Outside MenuItem) */}
    //                 {hasChildren && (
    //                     <Collapse in={isExpanded} timeout="auto" unmountOnExit>
    //                         <MenuList sx={{ pl: level + 2 }}>{renderMenuItems(item.items, level + 1)}</MenuList>
    //                     </Collapse>
    //                 )}
    //             </React.Fragment>
    //         );
    //     });
    // };

    const renderMenuItems = (items, level = 0) => {
        return items.map((item) => {
            const isActive = item.href && pathname === item.href;
            const hasChildren = item.items && item.items.length > 0;
            const isExpanded = openMenus[item.key] || false;

            return (
                <React.Fragment key={item.key}>
                    {
                        hasChildren ? (
                            <Stack
                                direction='column'
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover .nav-icon': {
                                        transform: 'scale(1.2)',
                                        transition: 'transform 0.3s ease-in-out'
                                    },
                                }}
                            >
                                <Stack direction='column'>
                                    <Stack direction='row' alignItems='center' gap={0.5}>
                                        <Box sx={{ backgroundColor: 'white', px: 0.8, py: 0.5, borderRadius: 1 }}>
                                            <Iconify className='nav-icon' icon={item.icon} sx={{ width: '24px', height: '24px', color: "grey.900", transition: 'transform 0.3s ease-in-out' }} />
                                        </Box>
                                        <Iconify icon='solar:alt-arrow-right-linear' sx={{ color: 'text.primary' }} />
                                    </Stack>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: '0.8rem', color: "text.primary", mt: 0.3 }}>
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack
                                direction='column'
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover .nav-icon': {
                                        transform: 'scale(1.2)',
                                        transition: 'transform 0.3s ease-in-out'
                                    },
                                }}
                            >
                                <Stack direction='column'>
                                    <Stack direction='row' alignItems='center' gap={0.5}>
                                        <Box sx={{ backgroundColor: 'white', px: 0.8, py: 0.5, borderRadius: 1, position: 'relative' }}>
                                            <Iconify className='nav-icon' icon={item.icon} sx={{ width: '24px', height: '24px', color: "grey.900", transition: 'transform 0.3s ease-in-out' }} />
                                            {
                                                item?.count && (
                                                    <Stack direction='column' justifyContent='center' alignItems='center' sx={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'primary.main', width: '20px', height: '20px', borderRadius: '50%' }}>
                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.7rem', color: "#fff" }}>15</Typography>
                                                    </Stack>
                                                )
                                            }
                                        </Box>
                                    </Stack>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: '0.8rem', color: "text.primary", mt: 0.3 }}>
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </Stack>
                        )
                    }
                </React.Fragment>
            );
        });
    };

    return (
        open && (
            <Box
                sx={{
                    ...styles,
                    backgroundColor: 'var(--mui-palette-background-level2)',
                    color: 'var(--SideNav-color)',
                    display: { xs: 'none', lg: 'flex' },
                    flexDirection: 'column',
                    gap: 2,
                    left: 10,
                    position: 'fixed',
                    top: isFeaturedCardVisible ? 118 : 50,
                    width: '72px',
                    zIndex: 'var(--SideNav-zIndex)',
                    transition: 'width 0.3s ease',
                    borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    marginBottom: '10px',
                    border: '1px solid var(--mui-palette-background-level2)',
                    height: isFeaturedCardVisible ? 'calc(100vh - 160px)' : 'calc(100vh - 93px)',
                    py: 2,
                    px: 1.1,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '0px',
                    },
                }}
            >
                <div>
                    <Button
                        aria-describedby={id}
                        variant="contained"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Hover
                    </Button>
                    <Popover
                        id={id}
                        open={openSubMenu}
                        anchorEl={anchorEl}
                        onClose={handleMouseLeave}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>The content of the Popover (submenu).</Typography>
                    </Popover>
                </div>

                {renderMenuItems(dashboardFavItems)}
                {/* <MenuList>{renderMenuItems(dashboardFavItems)}</MenuList> */}
                {/* <Divider /> */}
                {/* dynamic nested menu items */}
                {/* <MenuList>{renderMenuItems(privateRoutes)}</MenuList> */}
            </Box>
        )
    );
}
