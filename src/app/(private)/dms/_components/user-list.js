import { Avatar, Box, ButtonGroup, FormControlLabel, IconButton, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { StyledBadge } from "./avatar-badge";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

export const UserList = () => {
    const { userData, handleActiveConversation, handleSearchUser, handleActiveUser } = useContext(ChatContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        handleSearchUser(e.target.value);
    }

    return (
        <Stack direction='column' gap={1} sx={{ width: '30%', height: '100%', p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
                <Typography variant="h5">Direct messages</Typography>
                <FormControlLabel control={<Switch onChange={(e) => handleActiveUser(e.target.checked)} />} label="Online" labelPlacement="start" />
            </Stack>
            <TextField value={searchTerm} onChange={handleSearch} fullWidth placeholder="Find a DM" size="small" slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon='ri:search-line' />
                        </InputAdornment>
                    ),
                },
            }} />
            <Stack direction='column' gap={1.5} sx={{
                mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            }}>
                {
                    userData.map((user, index) => (
                        <Stack key={index} onClick={() => handleActiveConversation(user.userId)} direction='row' gap={1} sx={{ cursor: 'pointer', py: 0.5, position: 'relative', '&:hover .hover-action': { opacity: 1 } }}>
                            <Box>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    isOnline={user.active}
                                >
                                    <Avatar alt={user.name} src={user.profile_image} sx={{ width: 40, height: 40 }} />
                                </StyledBadge>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>{user.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{dayjs(user.last_message?.timestamp).format('DD MMM, YYYY - hh:mm A')}</Typography>
                                </Stack>
                                <Typography variant="body2">{user.last_message?.message}</Typography>
                            </Box>

                            {/* on hover */}
                            <ButtonGroup className="hover-action" sx={{ backgroundColor: 'var(--mui-palette-background-level2)', position: 'absolute', top: 0, right: 0, opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
                                <IconButton>
                                    <Iconify icon={user.bookmark ? 'material-symbols-light:bookmark' : 'material-symbols-light:bookmark-outline'} />
                                </IconButton>
                                <IconButton>
                                    <Iconify icon="bi:three-dots-vertical" />
                                </IconButton>
                            </ButtonGroup>
                        </Stack>
                    ))
                }
            </Stack>
        </Stack>
    )
}