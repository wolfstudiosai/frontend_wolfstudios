"use client";

import { Box, Divider, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useContext, useState } from 'react';
import { Message } from './message';
// import { TextEditor } from '/src/components/core/text-editor/text-editor';
import { StyledBadge } from "./avatar-badge";
import { MessageForm } from './message-form';
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

export const Conversation = () => {
    const [activeTab, setActiveTab] = useState('messages');

    const { messages, activeReceiver, activeThread, activeProfile } = useContext(ChatContext);


    return (
        <Stack sx={{ p: 2, width: (activeThread || activeProfile) ? '40%' : '70%', ...((activeThread || activeProfile) && { borderRight: '1px solid', borderColor: 'divider' }) }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                {
                    activeReceiver && (
                        <Stack direction='row' alignItems='center' gap={1}>
                            <Box>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    isOnline={activeReceiver?.active}
                                >
                                    <Avatar alt={activeReceiver?.last_name ? `${activeReceiver.first_name} ${activeReceiver.last_name}` : activeReceiver.first_name} src={activeReceiver?.profile_pic} sx={{ width: 30, height: 30 }} />
                                </StyledBadge>
                            </Box>
                            <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>{activeReceiver?.last_name ? `${activeReceiver.first_name} ${activeReceiver.last_name}` : activeReceiver.first_name}</Typography>
                        </Stack>
                    )
                }
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
                        <Stack direction='column' gap={1.5} sx={{
                            mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                        }}>
                            {
                                messages?.length > 0 ? (
                                    messages.map((message) => (
                                        <Message key={message.id} message={message} />
                                    ))
                                ) : (
                                    <Typography>No messages</Typography>
                                )
                            }
                        </Stack>
                        <MessageForm />
                        {/* <Box sx={{ boxShadow: 'var(--mui-shadows-16)', borderRadius: 1, mt: 2, width: '100%' }}> 
                            <TextEditor />
                        </Box> */}
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