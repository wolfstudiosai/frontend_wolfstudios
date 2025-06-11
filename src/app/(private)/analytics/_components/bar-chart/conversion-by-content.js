'use client'

import { Grid2 as Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { NoSsr } from '/src/components/core/no-ssr';

export function ConversionByContent({ data }) {
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        {data?.label}
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data?.data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <XAxis dataKey="label" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="value" fill="#009688" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </CardContent>
            </Card>
        </Grid>
    );
}