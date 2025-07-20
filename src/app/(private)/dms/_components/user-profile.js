"use client";

import React from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { StyledBadge } from "./avatar-badge";
import { Iconify } from "/src/components/iconify/iconify";
import { IconWithoutText } from '/src/components/utils/icon-text';
import { ChatContext } from "/src/contexts/chat";

export const UserProfile = () => {
    const { handleActiveProfile, activeProfile } = useContext(ChatContext);

    return (
        <Stack sx={{ width: '30%' }}>
            <Stack direction='row' gap={1} alignItems='center' justifyContent='space-between' sx={{ px: 2, py: 0.5 }}>
                <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>Profile</Typography>
                <IconButton onClick={() => handleActiveProfile(null)}>
                    <Iconify icon="mingcute:close-fill" />
                </IconButton>
            </Stack>
            <Divider />
            <Stack direction='column' gap={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{
                mt: 2, p: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            }}>
                <Stack direction='column' alignItems='center'>
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            isOnline={2 === 2}
                        >
                            <Avatar alt={activeProfile.name} src={activeProfile.profile_image} sx={{ width: 70, height: 70 }} />
                        </StyledBadge>
                    </Box>
                    <Typography sx={{ fontWeight: 'medium', fontSize: '1.2rem', mt: 0.4 }}>{activeProfile.name}</Typography>
                    <Stack direction={'row'} gap={1.5} flexWrap="wrap" sx={{ py: 1.5 }}>
                        <IconWithoutText icon="mage:email" value={'email@example.com'} type={'email'} />
                        <IconWithoutText icon="proicons:call" value={'+8801840452116'} type={'phone'} />
                        <IconWithoutText icon="mynaui:globe" value={'https://wolfstudios.com'} type={'url'} />
                        <IconWithoutText icon="ri:drive-fill" value={'https://drive.google.com'} type={'url'} />
                        <IconWithoutText icon="ri:amazon-fill" value={'https://amazon.com'} type={'url'} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}