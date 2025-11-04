'use client';

import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  NoSsr,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CustomDonutChart } from '/src/components/bar-chart/custom-donut-chart';

import { StatisticsCard } from '../../performance-overview/_components/statistics-card';

export const YoutubePerformance = () => {
  const youtubeStatCards = [
    { label: 'Views', value: '4,736' },
    { label: 'Likes', value: '4,736' },
    { label: 'Comments', value: '$460,108.64' },
  ];

  const donutData = [
    { label: 'Likes', percent: 25, values: 250, color: '#FF6F61' },
    { label: 'Comments', percent: 15, values: 150, color: '#6B5B95' },
    { label: 'Shares', percent: 10, values: 100, color: '#88B04B' },
    { label: 'Views', percent: 30, values: 300, color: '#FFA500' },
    { label: 'Reactions', percent: 8, values: 80, color: '#0096C7' },
    { label: 'Engagements', percent: 5, values: 50, color: '#FFB6C1' },
    { label: 'Clicks', percent: 4, values: 40, color: '#8A2BE2' },
    { label: 'Follows', percent: 2, values: 20, color: '#00FA9A' },
    { label: 'Saves', percent: 1, values: 10, color: '#FFD700' },
  ];

  const data = [
    { name: 'A', value: 4000, scatterVal: 240 },
    { name: 'B', value: 3000, scatterVal: 139 },
    { name: 'C', value: 2000, scatterVal: 980 },
    { name: 'D', value: 2780, scatterVal: 390 },
    { name: 'E', value: 1890, scatterVal: 480 },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Youtube Performance
        </Typography>

        <Button variant="contained" size="small">
          Sync for the month
        </Button>
      </Stack>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} alignItems="center">
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

      {/* Stats */}
      <Grid container spacing={2}>
        {youtubeStatCards.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <StatisticsCard state={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                Content by Total Engagement
              </Typography>
              <CustomDonutChart data={donutData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <NoSsr fallback={<Box sx={{ height: '400px' }} />}>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Bar chart */}
                <Bar dataKey="value" barSize={40} fill="#413ea0" name="Bar Value" />

                {/* Scatter chart */}
                <Scatter dataKey="scatterVal" fill="#ff7300" name="Scatter Value" />
              </ComposedChart>
            </ResponsiveContainer>
          </NoSsr>
        </Grid>
      </Grid>
    </Box>
  );
};
