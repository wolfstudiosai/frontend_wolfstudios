'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from 'lucide-react';

import { StatisticsCard } from './_components/statistics-card';
import { PartnerPerformanceCard } from './_components/partner-performance-card';
import { PerformanceChart } from './_components/performance-chart';
import { GoogleAddsPerformance } from './_components/google-adds-performance';
import { FacebookAddsPerformance } from './_components/facebook-adds-performance';
import { TiktokShopVideos } from './_components/tiktok-shop-videos';
import { TiktokShopProducts } from './_components/tiktok-shop-products';
import { PartnerCard } from './_components/partner-card';

export default function PerformanceOverviewPage() {
  const [loading, setLoading] = useState(false);

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const statCards = [
    { label: 'Clicks', value: '191,057' },
    { label: 'Conversions', value: '4,736' },
    { label: 'Sales', value: '$460,108.64' },
    { label: 'Commissions', value: '$143,663.82' },
    { label: 'Actively Converting Partners', value: '45' },
    { label: 'Dormant Partners', value: '32' },
    { label: 'In Communication', value: '35' },
    { label: 'Invited Partners', value: '172' },
  ];

  const impactStatCards = [
    { label: 'Clicks', value: '191,057' },
    { label: 'Conversions', value: '4,736' },
    { label: 'Revenue', value: '$460,108.64' },
    { label: 'Action Costs', value: '$143,663.82' },
  ];

  const partners = [
    {
      name: 'EV Capital Pty Limited',
      amount: '$31,369.03',
      date: '8/1/2025',
      status: 'Active - Top Performer',
      img: '/user1.png',
    },
    {
      name: 'Unnamed Partner',
      amount: '$17,769.46',
      date: '1/9/2025',
      status: 'Re-Engage',
      img: '/user-placeholder.png',
    },
    {
      name: 'Digle Media',
      amount: '$17,439.47',
      date: '1/9/2025',
      status: 'Offer Support',
      img: '/logo-placeholder.png',
    },
    {
      name: 'EV Capital Pty Limited',
      amount: '$15,438.00',
      date: '7/1/2025',
      status: 'Active - Top Performer',
      img: '/user1.png',
    },
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

  // startIcon={<Sync size={18} />}
  return (
    <Box>
      {/* Header */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Levanta Performance
          </Typography>

          <Button variant="contained" size="small" onClick={handleSync}>
            Sync for the month
          </Button>
        </Stack>

        {/* Filters */}
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
              <MenuItem>Partner A</MenuItem>
            </TextField>
            <TextField select size="small">
              <MenuItem>All</MenuItem>
              <MenuItem>Product A</MenuItem>
            </TextField>
            <TextField type="date" size="small" />
            <TextField type="date" size="small" />
            <TextField select size="small">
              <MenuItem>All</MenuItem>
              <MenuItem>Program A</MenuItem>
            </TextField>
          </Stack>
          <IconButton size="small">
            <Search size={18} />
          </IconButton>
        </Stack>

        {/* Stats */}
        <Grid container spacing={2} mt={3}>
          {statCards.map((stat, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <StatisticsCard state={stat} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            {[...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, md: 3 }} key={i}>
                <PartnerCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Divider sx={{ mt: 4, mb: 2 }} />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Impact Performance
          </Typography>

          <Button variant="contained" size="small" onClick={handleSync}>
            Sync for the month
          </Button>
        </Stack>

        {/* Filters */}
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
            <TextField type="date" size="small" />
          </Stack>
          <IconButton size="small">
            <Search size={18} />
          </IconButton>
        </Stack>

        {/* Stats */}
        <Grid container spacing={2} mt={3}>
          {impactStatCards.map((stat, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <StatisticsCard state={stat} />
            </Grid>
          ))}
        </Grid>

        <PerformanceChart />

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            {[...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, md: 3 }} key={i}>
                <PartnerPerformanceCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Google Adds Performance */}
      <GoogleAddsPerformance />

      {/* Facebook Adds Performance */}
      <FacebookAddsPerformance />

      {/* Tiktok Shop Videos */}
      <TiktokShopVideos />

      {/* Tiktok Shop Products */}
      <TiktokShopProducts />
    </Box>
  );
}
