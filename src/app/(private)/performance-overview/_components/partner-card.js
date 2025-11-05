'use client';

import React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

export const PartnerCard = () => {
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
          alt="Partner"
          sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
        />

        <CardContent sx={{ pt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            $31369.09
          </Typography>
          <Chip
            label="EV Capital Pty Limited"
            size="small"
            sx={{
              mt: 2,
              color: 'text.secondary',
              fontSize: 12,
              padding: 0,
              bgcolor: 'background.paper',
              border: '1px solid var(--mui-palette-divider)',
              borderRadius: 1,
            }}
          />
          <Typography sx={{ mt: 1, fontSize: 12 }}>8/1/2025</Typography>
          <Chip
            label="Active - Top Performer"
            size="small"
            sx={{
              mt: 2,
              fontSize: 12,
              padding: 0,
              border: '1px solid var(--mui-palette-divider)',
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
