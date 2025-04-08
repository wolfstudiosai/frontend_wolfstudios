"use client";

import { Avatar, Box, ButtonGroup, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";
import useAuth from '/src/hooks/useAuth';

export const Message = ({ message, in_thread }) => {
    const { handleActiveThread, handleActiveProfile } = useContext(ChatContext);
    const { userInfo } = useAuth();

    return (
        <Stack direction='row' gap={1} sx={{ py: 0.5, position: 'relative', '&:hover .hover-action': { opacity: 1 } }}>
            {
                userInfo?.id === message.sender_id ? (
                    <Avatar src={message?.sender?.profile_pic} alt={message?.sender?.last_name ? `${message?.sender?.first_name} ${message?.sender?.last_name}` : message?.sender?.first_name} variant="square" sx={{ borderRadius: 1, cursor: 'pointer' }} onClick={() => handleActiveProfile(message?.senderId)} />
                ) : (
                    <Avatar src={message?.receiver?.profile_pic} alt={message?.receiver?.last_name ? `${message?.receiver?.first_name} ${message?.receiver?.last_name}` : message?.receiver?.first_name} variant="square" sx={{ borderRadius: 1, cursor: 'pointer' }} onClick={() => handleActiveProfile(message?.senderId)} />
                )
            }
            <Box>
                <Stack direction='row' gap={1.5} alignItems='center'>
                    {
                        userInfo?.id === message.sender_id ? (
                            <Typography sx={{ fontWeight: 'medium', fontSize: '1rem', cursor: 'pointer' }} onClick={() => handleActiveProfile(message.senderId)}>User Name</Typography>
                        ) : (
                            <Typography sx={{ fontWeight: 'medium', fontSize: '1rem', cursor: 'pointer' }} onClick={() => handleActiveProfile(message.senderId)}>User Name</Typography>
                        )
                    }
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{dayjs(message.timestamp).format('DD MMM, YYYY - hh:mm A')}</Typography>
                </Stack>
                <Typography variant="body2">{message.content}</Typography>
            </Box>

            {/* on hover */}
            <ButtonGroup className="hover-action" sx={{ backgroundColor: 'var(--mui-palette-background-level2)', position: 'absolute', top: 0, right: 0, opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
                <IconButton title="Like">
                    <Iconify icon="solar:like-broken" />
                </IconButton>
                <IconButton title="React">
                    <Iconify icon="material-symbols:add-reaction-outline" />
                </IconButton>
                <IconButton title="Edit">
                    <Iconify icon="material-symbols:edit-outline-rounded" />
                </IconButton>
                <IconButton title="Copy">
                    <Iconify icon="mingcute:copy-line" />
                </IconButton>
                {!in_thread && (
                    <IconButton onClick={() => handleActiveThread(message.messageId)} title="Reply in thread">
                        <Iconify icon="mingcute:message-3-fill" />
                    </IconButton>
                )}
                <IconButton title="Forward">
                    <Iconify icon="flowbite:forward-outline" />
                </IconButton>
                <IconButton title="Bookmark">
                    <Iconify icon={2 === 2 ? 'material-symbols-light:bookmark-outline' : 'material-symbols-light:bookmark'} />
                </IconButton>
            </ButtonGroup>
        </Stack>
    )
}