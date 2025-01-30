import { Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { RightPanel } from '@/components/rightPanel/right-panel';

export const RightSlideContent = ({ open, data, onClose }) => {
  return (
    <RightPanel
      open={open}
      heading={data?.name}
      onClose={onClose}
      actionButtons={() => {
        return (
          <Stack spacing={2} direction={'row'}>
            <Button
              variant="contained"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Close
            </Button>
          </Stack>
        );
      }}
      size="lg"
    >
      <Grid container spacing={2}>
        <Typography>This is Right panel for comment/feedback communication</Typography>
      </Grid>
    </RightPanel>
  );
};
