import { NoSsr } from '/src/components/core/no-ssr';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, ComposedChart, Area, Line, } from 'recharts';
import { Iconify } from '/src/components/iconify/iconify';
import { alpha } from '@mui/material/styles';

export const StatisticsAreaChart = ({ 
    data, dataKey, color = '#8884d8',icon, title, value, growth }) => {
        const gradientId = `gradientColor-${title.replace(/\s+/g, '')}`;

    return (
        <Box
            sx={{
                p: 1,
                height: '100%',
                borderRadius: 0,
                border: '1px solid var(--mui-palette-divider)'
            }}>

            <Box p={1}>
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={30}
                        width={30}
                        bgcolor="background.paper"
                        borderRadius={1}
                        border={1}
                        borderColor={alpha(color, 0.5)}
                    >
                        <Iconify
                            color={color}
                            icon={icon}
                        />
                    </Box>

                    <Typography variant="body1">
                        {title}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={3} mt={1}>
                    <Typography variant="h4">
                        {value}
                    </Typography>
                    <Typography component="span" fontSize={14} sx={{ bgcolor: "background.paper", py: 0.5, px: 1 }}>
                        {growth}%
                    </Typography>
                </Box>
            </Box>

            <NoSsr fallback={<Box sx={{ height: 100 }} />}>
                <ResponsiveContainer width="100%" height={100}>
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} stopOpacity={1} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            fill={`url(#${gradientId})`}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </NoSsr>
        </Box>
    );
};