import { Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ConversionRate } from './conversion-rate';
import { DemographicOverview } from './demographic-overview';
import { ProfileSlider } from './profile-slider';
import { SalesVolume } from './sales-volume';
import { SegmentationByGender } from './segmentation-by-gender';

export const RightProfileDetails = () => {
  return (
    <Box>
      <ProfileSlider />
      <ConversionRate />
      <DemographicOverview />
      <Card sx={{ padding: { xs: 1, md: 2 }, mt: 2 }}>
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <SalesVolume />
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <SegmentationByGender />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
