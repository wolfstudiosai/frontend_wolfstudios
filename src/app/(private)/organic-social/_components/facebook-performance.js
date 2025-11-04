import React from 'react';
import { Button, Box, Grid2 as Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Search } from 'lucide-react';

import { StatisticsCard } from '../../performance-overview/_components/statistics-card';

export const FacebookPerformance = () => {
  const facebookStatCards = [
    { label: 'Total Engagement', value: '191,057' },
    { label: 'Likes', value: '4,736' },
    { label: 'Comments', value: '$460,108.64' },
    { label: 'Shares', value: '$143,663.82' },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Facebook Performance
        </Typography>

        <Button variant="contained" size="small">
          Sync for the month
        </Button>
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
        {facebookStatCards.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <StatisticsCard state={stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
