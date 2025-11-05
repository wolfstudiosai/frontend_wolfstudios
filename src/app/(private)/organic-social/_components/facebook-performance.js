'use client';

import React from 'react';
import {
  Box,
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
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { StatisticsCard } from '../../performance-overview/_components/statistics-card';
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export const FacebookPerformance = () => {
  const facebookStatCards = [
    { label: 'Total Engagement', value: '191,057' },
    { label: 'Likes', value: '4,736' },
    { label: 'Comments', value: '$460,108.64' },
    { label: 'Shares', value: '$143,663.82' },
  ];

  const data = [
    { name: 'Page Views', uv: 4000 },
    { name: 'Page Likes', uv: 3000 },
    { name: 'Page Comments', uv: 2000 },
    { name: 'Page Shares', uv: 1000 },
    { name: 'Page Saves', uv: 500 },
    { name: 'Page Follows', uv: 250 },
    { name: 'Page Clicks', uv: 100 },
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
  { label: 'Saves', percent: 1, values: 10, color: '#FFD700' }          
];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Facebook Performance
        </Typography>
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
        {facebookStatCards.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <StatisticsCard state={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                Content by Total Engagement
              </Typography>

              <NoSsr>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '350px', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </NoSsr>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                Content by Total Engagement
              </Typography>

              <CustomDonutChart data={donutData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
