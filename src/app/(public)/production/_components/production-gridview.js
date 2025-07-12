import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PageLoader from '/src/components/loaders/PageLoader';

import { ProductionCard } from './production-card';

export const ProductionGridView = ({ data, loading, fetchList }) => {
  return (
    <Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={0.5}>
          {data.map((content, index) => (
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
              <ProductionCard content={content} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};
