'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid2';

export const PortfolioAnalyticsCard = ({ state }) => {
    return (
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{ height: '100%' }}
            >
                <CardContent>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {state.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                        {state.value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};