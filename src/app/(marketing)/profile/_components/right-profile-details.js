import { Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ConversionRate } from './conversion-rate';
import { DemographicOverview } from './demographic-overview';
import { SalesVolume } from './sales-volume';

export const RightProfileDetails = () => {
  return (
    <Box>
      <ConversionRate />
      <DemographicOverview />
      <Card sx={{ padding: { xs: 1, md: 2 }, mt: 2 }}>
        <Grid container>
          <Grid item size={{ xs: 12, md: 6 }}>
            <SalesVolume />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            hello
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
