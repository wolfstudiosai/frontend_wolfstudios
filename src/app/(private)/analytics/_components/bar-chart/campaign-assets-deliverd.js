'use client'

import { Grid2 as Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { NoSsr } from '/src/components/core/no-ssr';

export function CampaignAssetsDelivered() {

    const data = [
        { name: "Jan", value: 20 },
        { name: "Feb", value: 25 },
        { name: "Mar", value: 30 },
        { name: "Apr", value: 18 },
        { name: "May", value: 22 },
        { name: "Jun", value: 28 },
        { name: "Jul", value: 35 },
        { name: "Aug", value: 27 },
        { name: "Sep", value: 22 },
        { name: "Oct", value: 28 },
        { name: "Nov", value: 35 },
        { name: "Dec", value: 27 },
    ];
    return (
        <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Campaign Assets Delivered by Month
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <XAxis tick={{ angle: -45, textAnchor: 'end' }} interval={0} dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="value" fill="#F50057" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </CardContent>
            </Card>
        </Grid>
    );
}