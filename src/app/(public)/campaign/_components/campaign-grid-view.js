'use client';

import Grid from '@mui/material/Grid2';
import React from 'react';

import { SettingsContext } from '/src/contexts/settings';

import { CampaignCard } from './campaign-card';

export const CampaignGridView = ({ data, fetchList, loading }) => {
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);

  return (
    <Grid  container sx={{ mb: 2, position: 'relative' }} spacing={.5}>
      {data.map((item, index) => (
        <Grid key={index} size={{ xs: 12, md: 4 }}>
          <CampaignCard item={item} fetchList={fetchList} />
        </Grid>
      ))}
    </Grid>
  );
};
