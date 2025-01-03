import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { LeftProfileOverview } from './_components/left-profile-overview';

export const ProfileView = () => {
  return (
    <Grid container>
      <Grid item size={{ xs: 12, md: 3 }}>
        <Card>
          <LeftProfileOverview />
        </Card>
      </Grid>
      <Grid item size={{ xs: 12, md: 9 }}>
        hello
      </Grid>
    </Grid>
  );
};
