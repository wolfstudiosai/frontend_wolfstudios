import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { LeftCampaignAnalytics } from '../_components/left-profile-overview';
import { RightCampaignAnalytics } from '../_components/right-profile-details';

export const CampaignAnalyticsView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, md: 3}}>
        <Card>
          <LeftCampaignAnalytics />
        </Card>
      </Grid>
      <Grid item size={{ xs: 12, md: 9 }}>
        <RightCampaignAnalytics />
      </Grid>
    </Grid>
  );
};
