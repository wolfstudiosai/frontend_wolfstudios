'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export const AnalyticsBanner = () => {
    return (
        <Box
        sx={{
          backgroundImage: 'url(/assets/analytics-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '220px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)',
          },
        }}
        >
            <Box p={4} height="100%" position="relative" display="flex" flexDirection="column" justifyContent="end" alignItems="flex-start" gap={1}>
              <Typography variant="h3" color="white" fontWeight={600}>
                Analytics Dashboard Overview
            </Typography>
            <Typography variant="h5">
                A snapshot of your analytics Campaign, Content, and Portfolio.
            </Typography>
            </Box>
        </Box>
    );
}