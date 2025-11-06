'use client';

import React from 'react';
import { NoSsr } from '/src/components/core/no-ssr';
import { Box } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// #endregion
export const CustomAreaChart = ({data, color}) => {
    return (
        <NoSsr fallback={<Box sx={{ height: 300 }} />}>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis width={50} />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="url(#gradientColor)" />

                     <defs>
                            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} stopOpacity={1} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                </AreaChart>
            </ResponsiveContainer>
        </NoSsr>
    );
};