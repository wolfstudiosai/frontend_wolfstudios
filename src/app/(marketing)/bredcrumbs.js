import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export function Breadcrumbs() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: { xl: 'flex-start', sm: 'center' },
        gap: 1,
        mt: 2,
        p: 1,
        ml: 2,
        overflowX: 'auto',
        position: 'sticky',
        top: '75px',
        zIndex: 999,
        backgroundColor: 'var(--mui-palette-background-default)',
      }}
    >
      <Typography variant="breadcrumbs" color="text.primary">
        OVERVIEW
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        CAMPAIGNS
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        PORTFOLIOS
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        CONCEPTS
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        PRODUCTION
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        PARTNERS
      </Typography>
      <Typography variant="breadcrumbs" color="text.secondary">
        ·
      </Typography>
      <Typography variant="breadcrumbs" color="text.primary">
        SPACES
      </Typography>
    </Box>
  );
}
