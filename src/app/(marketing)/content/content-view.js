import { Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { LeftContentOverview } from './_components/left-content-overview';
import { RightContentOverview } from './_components/right-content-overview';

export const ContentView = ({ data }) => {
  const { campaign_title, description, details, author, tags } = data;

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card>
            <LeftContentOverview
              description={description}
              details={details}
              author={author}
              campaign_title={campaign_title}
              tags={tags}
            />
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <RightContentOverview />
        </Grid>
      </Grid>
    </Box>
  );
};
