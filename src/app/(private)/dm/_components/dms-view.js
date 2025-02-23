import { Iconify } from "@/components/iconify/iconify";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { UserList } from "./user-list";

const StyledBadge = styled(Badge, {
    shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: isOnline ? '#44b700' : '#565e73',
        color: isOnline ? '#44b700' : '#565e73',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    ...(isOnline && {
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    })

}));

export const DMsView = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <UserList />
            <Stack sx={{ p: 2, width: '100%' }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Stack direction='row' alignItems='center' gap={1}>
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                isOnline={2 !== 2}
                            >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
                            </StyledBadge>
                        </Box>
                        <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>Combina Key</Typography>
                    </Stack>
                    <IconButton>
                        <Iconify icon="bi:three-dots-vertical" />
                    </IconButton>
                </Stack>
                <Tabs value={activeTab} onChange={(e, new_value) => setActiveTab(new_value)} aria-label="basic tabs example"
                    sx={{
                        minHeight: '40px',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            minHeight: '40px',
                            padding: '8px',
                            fontSize: '0.75rem',
                            color: 'var(--SideNav-color)', // Default color
                            transition: 'color 0.2s ease-in-out',
                            '&:hover': {
                                color: 'grey.800', // Hover color for inactive tabs
                            },
                            '& .MuiTab-iconWrapper': {
                                fontSize: '16px',
                                color: 'grey.700',
                            },
                        },
                        '& .Mui-selected': {
                            fontWeight: 'bold',
                            color: 'var(--SideNav-color)', // Ensure active color remains consistent
                            '&:hover': {
                                color: 'var(--SideNav-color)', // Keep color the same on hover
                            },
                            '& .MuiTab-iconWrapper': {
                                color: 'grey.800',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'grey.700',
                            height: '2px',
                            borderRadius: 0,
                        },
                    }}
                >
                    <Tab icon={<Iconify icon='ant-design:message-filled' />} iconPosition="start" label="Messages" />
                    <Tab icon={<Iconify icon='ph:files-fill' />} iconPosition="start" label="Media" />
                </Tabs>
            </Stack>
        </Stack>
    )
}