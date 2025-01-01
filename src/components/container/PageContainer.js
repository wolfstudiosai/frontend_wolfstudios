import { Box, Stack } from "@mui/material";

export const PageContainer = ({ children }) => {
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                m: 'var(--Content-margin)',
                p: 'var(--Content-padding)',
                width: 'var(--Content-width)',
            }}
        >
            <Stack spacing={4}>
                {children}
            </Stack>
        </Box>
    )
};