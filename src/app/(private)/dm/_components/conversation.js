"use client";

import { TextEditor } from '@/components/core/text-editor/text-editor';
import { Iconify } from "@/components/iconify/iconify";
import { Box, Divider, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { USER_DEMO_DATA } from '../_lib/demo_data';
import { Message } from './message';

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

export const Conversation = ({ showThreadConversation, openThreadConversation }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Stack sx={{ p: 2, width: showThreadConversation ? '40%' : '70%', ...(showThreadConversation && { borderRight: '1px solid', borderColor: 'divider' }) }}>
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
                        color: "var(--SideNav-color)",
                        transition: 'color 0.2s ease-in-out',
                        '& .MuiTab-iconWrapper': {
                            fontSize: '16px',
                            color: "var(--SideNav-color)",
                        },
                    },
                    '& .Mui-selected': {
                        fontWeight: 'bold',
                        color: 'var(--SideNav-color) !important',
                        '& .MuiTab-iconWrapper': {
                            color: "var(--SideNav-color)",
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: "grey.800",
                        height: '2px',
                        borderRadius: 0,
                    },
                }}
            >
                <Tab icon={<Iconify icon='ant-design:message-filled' />} iconPosition="start" label="Messages" value='messages' />
                <Tab icon={<Iconify icon='ph:files-fill' />} iconPosition="start" label="Files" value='files' />
            </Tabs>
            {
                activeTab === 'messages' && (
                    <>
                        <Stack direction='column' gap={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{
                            mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                        }}>
                            {
                                USER_DEMO_DATA.map((message, index) => (
                                    <Message key={index} message={message} openThreadConversation={openThreadConversation} />
                                ))
                            }
                        </Stack>
                        <Box sx={{ boxShadow: 'var(--mui-shadows-16)', borderRadius: 1, mt: 2 }}>
                            <TextEditor />
                        </Box>
                    </>
                )
            }
            {
                activeTab === 'files' && (
                    <Stack direction='column' gap={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{
                        mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                    }}>
                        Files show here
                    </Stack>
                )
            }
        </Stack>
    )
}