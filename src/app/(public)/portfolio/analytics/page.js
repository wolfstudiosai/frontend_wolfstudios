'use client';

import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid2 as Grid,
    IconButton,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import { PortfolioAnalyticsCard } from './_components/portfolio-analytics-card';
import { PerformanceChart } from '../../../(private)/all-content/analytics/_components/performance-chart';
import { RefundedChart } from './_components/refunded-chart';

export default function PortfolioAnalyticsPage() {

    const googleAds = [
        { label: 'Clicks', value: '191,057' },
        { label: 'Impressions', value: '4,736' },
        { label: 'Spend', value: '$460,108.64' },
        { label: 'CPM', value: '$143,663.82' },
    ];

    const facebook = [
        { label: 'Purchase', value: '191,057' },
        { label: 'RAOS', value: '4,736' },
        { label: 'CV', value: '$143,663.82' },
        { label: 'Spend', value: '$460,108.64' },
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
        <Box>
            <Typography variant="h6" fontWeight={600}>
                Google Ads
            </Typography>

            <Grid container spacing={2} mt={2}>
                {googleAds.map((stat, i) => (
                    <PortfolioAnalyticsCard state={stat} key={i} />
                ))}
            </Grid>

            <PerformanceChart />

            <Typography variant="h6" fontWeight={600} mt={4}>
                Facebook
            </Typography>

            <Grid container spacing={2} mt={2}>
                {facebook.map((stat, i) => (
                    <PortfolioAnalyticsCard state={stat} key={i} />
                ))}
            </Grid>


            <PerformanceChart />
            <RefundedChart data={data} />
        </Box>
    );
}