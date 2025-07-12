import Grid from '@mui/material/Grid2';

import { PageLoader } from '/src/components/loaders/PageLoader';

import { SpaceCard } from './space-card';

export const SpaceGridView = ({ data, fetchList, loading }) => {
  return (
    <PageLoader loading={loading} error={null}>
      <Grid container spacing={0.5}>
        {data.map((space) => (
          <Grid
            key={space.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 2,
            }}
          >
            <SpaceCard content={space} fetchList={fetchList} />
          </Grid>
        ))}
      </Grid>
    </PageLoader>
  );
};
