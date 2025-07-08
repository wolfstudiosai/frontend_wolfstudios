import { Box, Stack } from "@mui/material";
import React from "react";

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