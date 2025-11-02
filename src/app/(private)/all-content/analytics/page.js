'use client';

import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { PartnerCard } from './_components/partner-card';
import { PartnerPerformanceCard } from './_components/partner-performance-card';
import { PerformanceChart } from './_components/performance-chart';

export default function ContentAnalyticsPage() {
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

  // startIcon={<Sync size={18} />}
  return (
    <Box sx={{ p: 3 }}>
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
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerCard />
            </Grid>
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
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <PerformanceChart />

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerPerformanceCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerPerformanceCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerPerformanceCard />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <PartnerPerformanceCard />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
