'use client';

import React from 'react';
import { Box, Stack, Typography, TextField, MenuItem, IconButton } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { StatisticsCard } from './statistics-card';
import { PerformanceChart } from './performance-chart';
import { CustomBarChart } from './custom-bar-chart';
import { Search } from 'lucide-react';

export const TiktokShopVideos = () => {
    const tiktokShopVideos = [
        { label: 'GMV', value: '191,057' },
        { label: 'Shopable Videos', value: '4,736' },
        { label: 'Shopable Clicks', value: '$460,108.64' },
        { label: 'Refunded', value: '$143,663.82' },
        { label: 'Order', value: '$143,663.82' },
        { label: 'Clicks', value: '$143,663.82' },
        { label: 'CTR', value: '$143,663.82' },
        { label: 'CPM', value: '$143,663.82' },
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

    return (
        <Box mt={4}>
            <Typography variant="h6" fontWeight={600}>
                Tiktok Shop Videos
            </Typography>

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
                {tiktokShopVideos.map((stat, i) => (
                    <Grid size={{ xs: 12, md: 6, lg: 3 }} key={i}>
                        <StatisticsCard state={stat} />
                    </Grid>
                ))}
            </Grid>

            <PerformanceChart />
            <CustomBarChart data={data} barSize={20} title="Refunded" />
        </Box>
    );
};