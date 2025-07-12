import React from 'react';
import Grid from '@mui/material/Grid2';

import PageLoader from '../../../../components/loaders/PageLoader';
import { CampaignCard } from './campaign-card';

export const CampaignGridView = ({ data, loading, fetchList }) => {
  return (
    <PageLoader loading={loading} error={null}>
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
            <CampaignCard content={item} fetchList={fetchList} />
          </Grid>
        ))}
      </Grid>
    </PageLoader>
  );
};
