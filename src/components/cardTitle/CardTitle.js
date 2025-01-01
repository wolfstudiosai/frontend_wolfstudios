import { Box, Button, Stack, Typography } from "@mui/material"

export const CardTitle = ({ title, rightItem }) => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
                <Typography variant="h4">{title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {rightItem}
            </Box>
        </Stack>
    )
}