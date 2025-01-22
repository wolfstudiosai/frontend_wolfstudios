import Box from '@mui/material/Box';

import { PageContainer } from '@/components/container/PageContainer';

export default function Layout({ children }) {
    return (
        <PageContainer>
            <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
        </PageContainer>
    );
}
