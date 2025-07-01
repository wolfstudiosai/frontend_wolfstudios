'use client';

import React from 'react';
import Grid from '@mui/material/Grid2';

import { CampaignCard } from './campaign-card';

export const CampaignGridView = ({ data, fetchList }) => {
  return (
    <Grid container sx={{ position: 'relative' }} spacing={0.5}>
      {data?.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 2,
          }}
        >
          <CampaignCard item={item} fetchList={fetchList} />
        </Grid>
      ))}
    </Grid>
  );
};
