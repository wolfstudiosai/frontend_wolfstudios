import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ContentFilter } from './_components/content-filter';
import { ContentList } from './_components/content-list';

export const ContentOverView = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container>
        <ContentFilter />
        <ContentList />
      </Grid>
    </Box>
  );
};
