'use client';

import React from 'react';
import { Box, Stack, Typography, TextField, MenuItem, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Search } from 'lucide-react';
import { StatisticsCard } from './statistics-card';
import { PerformanceChart } from './performance-chart';

const facebookAds = [
    { label: 'Purchasees', value: '191,057' },
    { label: 'ROAS', value: '4,736' },
    { label: 'CV', value: '$143,663.82' },
    { label: 'Spend', value: '$460,108.64' },
];

export const FacebookAddsPerformance = () => {
    return (
        <Box mt={4}>
            <Box>
                <Typography variant="h6" fontWeight={600}>
                    Facebook Adds Performance
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
                {facebookAds.map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatisticsCard state={stat} key={i} />
                    </Grid>
                ))}
            </Grid>

            <PerformanceChart />
        </Box>
    );
}