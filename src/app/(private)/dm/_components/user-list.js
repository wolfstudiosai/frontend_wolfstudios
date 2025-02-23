import { Iconify } from "@/components/iconify/iconify";
import { Avatar, Box, ButtonGroup, Divider, FormControlLabel, IconButton, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";

const USER_DEMO_DATA = [
    {
        id: 1,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "10:05 PM"
    },
    {
        id: 2,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit. The quick brown fox jumps over the lazy dog.",
        timestamp: "09:11 PM"
    },
    {
        id: 3,
        user: {
            name: 'Riyazul Haque'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "12 Feb, 2025"
    },
    {
        id: 4,
        user: {
            name: 'John Doe'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "11 Jan, 2023"
    },
    {
        id: 5,
        user: {
            name: 'Test User'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "19 Dec, 2023"
    },
    {
        id: 6,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit. The quick brown fox jumps over the lazy dog.",
        timestamp: "09:11 PM"
    },
]

export const UserList = () => {
    return (
        <Stack direction='column' gap={1} sx={{ width: '30%', height: '100%', p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
                <Typography variant="h5">Direct messages</Typography>
                <FormControlLabel control={<Switch />} label="Unreads" labelPlacement="start" />
            </Stack>
            <TextField fullWidth placeholder="Find a DM" size="small" slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon='ri:search-line' />
                        </InputAdornment>
                    ),
                },
            }} />
            <Stack direction='column' gap={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{
                mt: 2, height: '80%', overflowY: 'scroll', scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            }}>
                {
                    USER_DEMO_DATA.map((user, index) => (
                        <Stack key={index} direction='row' gap={1} sx={{ cursor: 'pointer', py: 0.5, position: 'relative', '&:hover .hover-action': { opacity: 1 } }}>
                            <Avatar />
                            <Box>
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>{user.user?.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{user.timestamp}</Typography>
                                </Stack>
                                <Typography variant="body2">{user.last_message}</Typography>
                            </Box>

                            {/* on hover */}
                            <ButtonGroup className="hover-action" sx={{ backgroundColor: 'var(--mui-palette-background-level2)', position: 'absolute', top: 0, right: 0, opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
                                <IconButton>
                                    <Iconify icon={2 === 2 ? 'material-symbols-light:bookmark-outline' : 'material-symbols-light:bookmark'} />
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