"use client";

import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from 'react';
import { ChatContext } from '../context';
import { Message } from './message';
import { MessageForm } from "./message-form";
import { Iconify } from "/src/components/iconify/iconify";

export const ThreadConversation = () => {
    const { handleActiveThread, activeThread } = useContext(ChatContext);

    return (
        <Stack sx={{ p: 2, width: '30%' }}>
            <Stack direction='row' gap={1} alignItems='center' justifyContent='space-between'>
                <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>Thread</Typography>
                <IconButton onClick={() => handleActiveThread(null)}>
                    <Iconify icon="mingcute:close-fill" />
                </IconButton>
            </Stack>
            <Divider />
            <Stack direction='column' gap={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{
                mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            }}>
                {
                    activeThread?.length > 0 ? (
                        activeThread?.map((message, index) => (
                            <Message key={index} message={message} in_thread={true} />
                        ))
                    ) : (
                        <Typography>No thread found</Typography>
                    )
                }
            </Stack>
            <MessageForm />
        </Stack>
    )
}