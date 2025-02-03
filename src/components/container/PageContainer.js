import { Box, Stack } from "@mui/material";

export const PageContainer = ({ children }) => {
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                p: 'var(--Content-padding)',
                width: 'var(--Content-width)',
            }}
        >
            <Stack>
                {children}
            </Stack>
        </Box>
    )
};