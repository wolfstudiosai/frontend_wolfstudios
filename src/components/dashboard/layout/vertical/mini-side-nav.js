'use client';

import {
    Box,
    IconButton,
    Stack
} from "@mui/material";
import { useColorScheme } from '@mui/material/styles';
import { useRef, useState } from "react";
import { ChildrenItemPopover } from "./children-item-popover";
import { navColorStyles } from './styles';
import { Iconify } from "/src/components/iconify/iconify";

const navItems = [
    {
        icon: 'material-symbols:home-outline-rounded',
        label: "Dashboard",
        children: ["Overview", "Stats", "Reports"],
    },
    {
        icon: 'material-symbols:home-outline-rounded',
        label: "Sync",
    },
    {
        icon: 'material-symbols:home-outline-rounded',
        label: "Projects",
        children: ["List", "Create", "Manage"],
    },
    {
        icon: 'material-symbols:home-outline-rounded',
        label: "New",
    },
];

export function MiniSideNav({ color = 'evident', isFeaturedCardVisible }) {
    const { colorScheme = 'light' } = useColorScheme();
    const styles = navColorStyles[colorScheme][color];
    const [openUserList, setOpenUserList] = useState(false);

    const anchorRef = useRef(null);

    return (
        <>
            <Box
                sx={{
                    ...styles,
                    // color: 'var(--SideNav-color)',
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
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '0px',
                    },
                    py: 1.5,
                    background: 'transparent'
                }}
            >
                <Stack direction="column" alignItems="center" justifyContent="center" gap={1.5} sx={{ width: '100%' }}>
                    <IconButton size="small" ref={anchorRef} onClick={() => setOpenUserList(true)} sx={{ border: '1px solid var(--mui-palette-background-level2)', width: '42px', height: '42px' }}>
                        <Iconify icon="mdi:plus" sx={{ width: '30px', height: '30px' }} />
                    </IconButton>
                    <IconButton size="small" ref={anchorRef} onClick={() => setOpenUserList(true)} sx={{ border: '1px solid var(--mui-palette-background-level2)', width: '42px', height: '42px' }}>
                        <Iconify icon="mdi:plus" sx={{ width: '30px', height: '30px' }} />
                    </IconButton>
                    <IconButton size="small" ref={anchorRef} onClick={() => setOpenUserList(true)} sx={{ border: '1px solid var(--mui-palette-background-level2)', width: '42px', height: '42px' }}>
                        <Iconify icon="mdi:plus" sx={{ width: '30px', height: '30px' }} />
                    </IconButton>
                </Stack>
            </Box>
            <ChildrenItemPopover open={openUserList} onClose={() => setOpenUserList(false)} anchorRef={anchorRef} title="Direct Messages" />
        </>
    );
}



// backgroundColor: 'var(--mui-palette-background-level2)',