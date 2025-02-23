import { Iconify } from "/src/components/iconify/iconify";
import { Avatar, Box, ButtonGroup, IconButton, Stack, Typography } from "@mui/material";

export const Message = ({ message, openThreadConversation }) => {

    return (
        <Stack direction='row' gap={1} sx={{ cursor: 'pointer', py: 0.5, position: 'relative', '&:hover .hover-action': { opacity: 1 } }}>
            <Avatar variant="square" sx={{ borderRadius: 1 }} />
            <Box>
                <Stack direction='row' gap={1.5} alignItems='center'>
                    <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>{message.user?.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{message.timestamp}</Typography>
                </Stack>
                <Typography variant="body2">{message.last_message}</Typography>
            </Box>

            {/* on hover */}
            <ButtonGroup className="hover-action" sx={{ backgroundColor: 'var(--mui-palette-background-level2)', position: 'absolute', top: 0, right: 0, opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
                <IconButton>
                    <Iconify icon="solar:like-broken" />
                </IconButton>
                <IconButton>
                    <Iconify icon="material-symbols:add-reaction-outline" />
                </IconButton>
                <IconButton>
                    <Iconify icon="material-symbols:edit-outline-rounded" />
                </IconButton>
                <IconButton>
                    <Iconify icon="mingcute:copy-line" />
                </IconButton>
                <IconButton onClick={openThreadConversation}>
                    <Iconify icon="material-symbols:reply-rounded" />
                </IconButton>
                <IconButton>
                    <Iconify icon="flowbite:forward-outline" />
                </IconButton>
                <IconButton>
                    <Iconify icon={2 === 2 ? 'material-symbols-light:bookmark-outline' : 'material-symbols-light:bookmark'} />
                </IconButton>
            </ButtonGroup>
        </Stack>
    )
}