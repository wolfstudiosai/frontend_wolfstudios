"use client";

import { TextEditor } from '/src/components/core/text-editor/text-editor';
import { Iconify } from "/src/components/iconify/iconify";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { USER_DEMO_DATA } from '../_lib/demo_data';
import { Message } from './message';

export const ThreadConversation = ({ closeThreadConversation }) => {

    return (
        <Stack sx={{ p: 2, width: '30%' }}>
            <Stack direction='row' gap={1} alignItems='center' justifyContent='space-between'>
                <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>Thread</Typography>
                <IconButton onClick={closeThreadConversation}>
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
                    USER_DEMO_DATA.map((message, index) => (
                        <Message key={index} message={message} />
                    ))
                }
            </Stack>
            <Box sx={{ boxShadow: 'var(--mui-shadows-16)', borderRadius: 1, mt: 2 }}>
                <TextEditor />
            </Box>
        </Stack>
    )
}