'use client';

import React from 'react';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import { pxToRem } from '../../../../../utils/helper';

export const PartnerPerformanceCard = () => {
  return (
    <Box>
      <Card
        elevation={0}
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          overflow: 'hidden',
          boxShadow: 2,
          borderRadius: 0,
          bgcolor: 'background.paper',
          width: { xs: '100%', sm: '350px', md: '380px', lg: '408px' },
          maxWidth: '100%',
        }}
      >
        <Box
          component="img"
          src={'/assets/image-placeholder.jpg'}
          alt="Pertner image"
          sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
        />

        <CardContent sx={{ pt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            $31369.09
          </Typography>
          <Stack direction="column" alignItems="flex-start" sx={{ mt: 2 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '12px' }}>Partner HQ</Typography>
            <Chip
              label="EV Capital Pty Limited"
              size="small"
              sx={{
                color: 'text.secondary',
                fontSize: pxToRem(12),
                padding: 0,
                bgcolor: 'background.paper',
                border: '1px solid var(--mui-palette-divider)',
                borderRadius: 1,
              }}
            />
          </Stack>
          <Stack direction="column" alignItems="flex-start" sx={{ mt: 1 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '12px' }}>Start Date</Typography>
            <Typography sx={{ fontSize: pxToRem(12) }}>8/1/2025</Typography>
          </Stack>
          <Stack direction="column" alignItems="flex-start" sx={{ mt: 1 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '12px' }}>End Date</Typography>
            <Typography sx={{ fontSize: pxToRem(12) }}>8/1/2025</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
