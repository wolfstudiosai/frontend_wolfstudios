import { colorPalette } from '@/app/dashboard/analytics/page';
import { Box } from '@mui/material';

import { ConversionRate } from './conversion-rate';
import { DemographicOverview } from './demographic-overview';

export const RightProfileDetails = () => {
  return (
    <Box>
      <ConversionRate />
      <DemographicOverview />
    </Box>
  );
};
