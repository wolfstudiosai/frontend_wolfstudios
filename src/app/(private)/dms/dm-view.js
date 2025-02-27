"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DMsView } from "./_components/dms-view";
import { Iconify } from "/src/components/iconify/iconify";

const DMView = () => {
    const [active, setActive] = useState("dms");

    const subMenuItems = [
        { label: "DMs", icon: 'eva:message-circle-outline', active_icon: 'eva:message-circle-fill', value: 'dms' },
        { label: "Activity", icon: 'mdi:bell-notification-outline', active_icon: 'mdi:bell-notification', value: 'activity' }
    ];

    return (
        <Stack direction='row' gap={1} sx={{ height: 'calc(100vh - 92px)', mt: '6px' }}>
            <Stack direction='column' alignItems='center' gap={1.4} sx={{ width: '60px', backgroundColor: 'var(--mui-palette-background-level2)', py: 2, borderRadius: 1, ml: 1 }}>
                {
                    subMenuItems.map((item, index) => (
                        <Stack key={index} direction='column' justifyContent='center' alignItems='center'
                            sx={{
                                cursor: 'pointer', '&:hover .icon': {
                                    transform: 'scale(1.2)',
                                    transition: 'transform 0.3s ease-in-out'
                                }
                            }}
                            onClick={() => setActive(item.value)}
                        >
                            <Box sx={{ backgroundColor: 'white', px: 0.8, py: 0.5, borderRadius: 1 }}>
                                <Iconify className='icon' icon={active === item.value ? item.active_icon : item.icon} sx={{ width: '24px', height: '24px', color: "var(--SideNav-color)", transition: 'transform 0.3s ease-in-out' }} />
                            </Box>
                            <Typography sx={{ fontWeight: 'medium', fontSize: '0.8rem', color: "var(--SideNav-color)" }}>{item.label}</Typography>
                        </Stack>
                    ))
                }
            </Stack>
            {
                active === 'dms' && (
                    <DMsView />
                )
            }
        </Stack>
    );
};

export default DMView;


// backgroundColor: 'var(--mui-palette-background-level2)',
//     color: "var(--SideNav-color)",