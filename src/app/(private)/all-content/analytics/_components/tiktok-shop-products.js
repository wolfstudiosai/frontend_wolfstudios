'use client';

import React from 'react';
import { Box, Stack, Typography, TextField, MenuItem, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Search } from 'lucide-react';
import { StatisticsCard } from './statistics-card';
import { CustomBarChart } from './custom-bar-chart';

const tiktokShopProducts = [
    { label: 'Purchasees', value: '191,057' },
    { label: 'ROAS', value: '4,736' },
    { label: 'CV', value: '$143,663.82' },
];

const data = [
    { label: 'Apr 2025', value: 4000 },
    { label: 'May 2025', value: 3000 },
    { label: 'Jun 2025', value: 2000 },
    { label: 'Jul 2025', value: 2780 },
    { label: 'Aug 2025', value: 1890 },
    { label: 'Sep 2025', value: 2390 },
    { label: 'Oct 2025', value: 3490 },
];

export const TiktokShopProducts = () => {
    return (
        <Box mt={4}>
            <Box>
                <Typography variant="h6" fontWeight={600}>
                    Tiktok Shop Products
                </Typography>
            </Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                spacing={2}
                mt={3}
                alignItems="center"
            >
                <Stack direction="row" alignItems="center" gap={1}>
                    <TextField select size="small">
                        <MenuItem>All</MenuItem>
                        <MenuItem>Partner HQ</MenuItem>
                    </TextField>
                    <TextField type="date" size="small" />
                </Stack>
                <IconButton size="small">
                    <Search size={18} />
                </IconButton>
            </Stack>

            <Grid container spacing={2} mt={2}>
                {tiktokShopProducts.map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <StatisticsCard state={stat} key={i} />
                    </Grid>
                ))}
            </Grid>

            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <CustomBarChart data={data} title="Product Statistics by Shop Tabs" />
                <CustomBarChart data={data} title="Product Statistics by Lives" />
                <CustomBarChart data={data} title="Product Statistics by Video" />
                <CustomBarChart data={data} title="Product Statistics by Product Card" />
            </Box>
        </Box>
    );
}