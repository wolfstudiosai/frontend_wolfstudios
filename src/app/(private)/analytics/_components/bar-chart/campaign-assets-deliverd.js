'use client'

import { Grid2 as Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { NoSsr } from '/src/components/core/no-ssr';

export function CampaignAssetsDelivered() {

    const data = [
        { name: "Sun", value: 20 },
        { name: "Mon", value: 25 },
        { name: "Tue", value: 30 },
        { name: "Wed", value: 18 },
        { name: "Thu", value: 22 },
        { name: "Fri", value: 28 },
        { name: "Sat", value: 35 },
    ];
    return (
        <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Campaign Assets Delivered by Week
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