import { Avatar, Box, ButtonGroup, FormControlLabel, IconButton, Stack, Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

export const ThreadList = () => {
    const { userData, handleActiveConversation, handleActiveUser } = useContext(ChatContext);

    return (
        <Stack direction='column' gap={1} sx={{ width: '30%', height: '100%', p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
                <Typography variant="h5">Activity</Typography>
                <FormControlLabel control={<Switch onChange={(e) => handleActiveUser(e.target.checked)} />} label="Online" labelPlacement="start" />
            </Stack>
            <Stack direction='column' gap={1} sx={{
                mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            }}>
                {
                    userData.map((user, index) => (
                        <Stack key={index} onClick={() => handleActiveConversation(user.userId)} direction='row' gap={1} sx={{ cursor: 'pointer', py: 0.5, position: 'relative', '&:hover .hover-action': { opacity: 1 } }}>
                            <Box sx={{ position: "relative", width: 60, height: 60 }}>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        transform: "rotate(-15deg)",
                                        zIndex: 1,
                                    }}
                                >
                                    <Avatar
                                        alt="Person 1"
                                        src="/path-to-avatar1.jpg"
                                        sx={{ width: 30, height: 30 }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 14,
                                        left: 14,
                                        transform: "rotate(15deg)",
                                        zIndex: 2,
                                    }}
                                >
                                    <Avatar
                                        alt="Person 2"
                                        src="/path-to-avatar2.jpg"
                                        sx={{ width: 30, height: 30 }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>{user.name} and you</Typography>
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