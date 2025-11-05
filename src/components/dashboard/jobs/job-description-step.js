'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import * as React from 'react';

export function JobDescriptionStep({ onBack, onNext }) {
  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">How would you describe the job post?</Typography>
        </div>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={onBack} startIcon={<ArrowLeftIcon />}>
          Back
        </Button>
        <Button onClick={onNext} variant="contained">
          Create job
        </Button>
      </Stack>
    </Stack>
  );
}
