import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from 'lucide-react';

import { StatisticsCard } from '../../performance-overview/_components/statistics-card';
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export const InstagramPerformance = () => {
  const instagramStatCards = [
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
  { label: 'Saves', percent: 1, values: 10, color: '#FFD700' }          
];


  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Instagram Performance
        </Typography>
      </Stack>

      {/* Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
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

      {/* Stats */}
      <Grid container spacing={2}>
        {instagramStatCards.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6 }} key={i}>
            <StatisticsCard state={stat} />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            Content by Total Engagement
          </Typography>
          <CustomDonutChart data={donutData} />
        </CardContent>
      </Card>
    </Box>
  );
};
