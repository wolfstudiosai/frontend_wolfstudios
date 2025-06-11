'use client'

import { Grid2 as Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { NoSsr } from '/src/components/core/no-ssr';

export function UserDistribution({ data }) {
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        {data?.label}
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart layout="vertical" data={data?.data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 4" />
                                <XAxis type="number" axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="value" fill="#2196F3" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </CardContent>
            </Card>
        </Grid>
    );
}