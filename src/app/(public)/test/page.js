'use client';

import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { PageContainer } from "/src/components/container/PageContainer";
import { useState } from "react";

const result = {
    profiles: [
        {
            id: 1,
            name: "John Doe",
            image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 2,
            name: "Jane Doe",
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        }
    ],
    messages: [
        {
            id: 1,
            senderImage: "https://randomuser.me/api/portraits/men/1.jpg",
            senderName: "John Doe",
            content: "Hello, how are you?",
            time: "10:00 AM"
        },
        {
            id: 2,
            senderImage: "https://randomuser.me/api/portraits/women/1.jpg",
            senderName: "Jane Doe",
            content: "I'm good, thanks!",
            time: "10:01 AM"
        }
    ]
}

export default function Test() {
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    return <PageContainer>
        <Box sx={{ position: 'relative', width: '400px' }}>
            <TextField
                placeholder="Search messages..."
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={search}
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none', // default
                        },
                        '&:hover fieldset': {
                            border: 'none', // on hover
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none', // on focus
                            boxShadow: 'none',
                        },
                    },
                }}
            />

            {showResults && (
                <Box
                    sx={{
                        bgcolor: 'var(--mui-palette-background-level2)',
                        p: 2,
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Stack spacing={1}>
                        {result.profiles.map(profile => (
                            <Box key={profile.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="img" src={profile.image} sx={{ width: 30, height: 30, borderRadius: '50%' }} alt={profile.name} />
                                <Typography variant="body2">{profile.name}</Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1}>
                        {result.messages.map(message => (
                            <Box key={message.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="img" src={message.senderImage} sx={{ width: 30, height: 30 }} alt={message.id} />
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                        {message.content}
                                    </Typography>
                                    <Typography variant="body2">{message.senderName}</Typography>
                                </Box>
                                <Typography variant="caption">{message.time}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    </PageContainer>;
}