import Grid from '@mui/material/Grid2';
import React from 'react';
import { ContentCard } from './content-card';

export default function AllContentGridView({ data }) {

  return (
    <Grid container spacing={0.5} mt={2}>
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
          <ContentCard content={content} />
        </Grid>
      ))}
    </Grid>
  );
}
