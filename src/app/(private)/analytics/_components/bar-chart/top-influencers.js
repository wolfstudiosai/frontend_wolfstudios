'use client'

import { Grid2 as Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { NoSsr } from '/src/components/core/no-ssr';

export function TopInfluencers() {

    const data = [
        { name: "Alice", conversions: 340 },
        { name: "Bob", conversions: 290 },
        { name: "Charlie", conversions: 270 },
        { name: "Diana", conversions: 250 },
        { name: "Evan", conversions: 230 },
    ];
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ width: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Top 5 Influencers by Engagement Rate
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="conversions" fill="#FF9800" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </CardContent>
            </Card>
        </Grid>
    );
}