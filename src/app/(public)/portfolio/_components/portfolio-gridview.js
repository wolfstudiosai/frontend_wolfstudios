'use client';

import Grid from '@mui/material/Grid2';

import { PageLoader } from '/src/components/loaders/PageLoader';
import { PortfolioCard } from './portfolio-card';
import React from 'react';


export const PortfolioGridView = ({ data, loading }) => {


  return (
    <PageLoader loading={loading} error={null}>
      <Grid container spacing={0.5}>
        {data?.map((content) => (
          <Grid
            key={content.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 2,
            }}
          >
            <PortfolioCard content={content} />
          </Grid>
        ))}
      </Grid>
    </PageLoader>
  );
};


