'use client';

import { Card, CardContent, Typography, Box, Stack, Paper } from "@mui/material";
import { NoSsr } from '/src/components/core/no-ssr';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Grid from '@mui/material/Grid2';

export function OnboardingByRegion({ data }) {
    return (
        <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        {data?.label}
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                barGap={4}
                                data={data?.data}
                                layout="vertical"
                                margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                            >
                                <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 4" />
                                <XAxis type="number" axisLine={false} tickLine={false} />
                                <YAxis
                                    type="category"
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    width={150}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                                <Legend />
                                <Bar
                                    dataKey="value"
                                    barSize={40}
                                    fill="#3f51b5"
                                    radius={[0, 6, 6, 0]}
                                    label={renderCustomBarLabel}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </CardContent>
            </Card>
        </Grid>
    );
}

function TooltipContent({ active, payload }) {
    if (!active || !payload?.length) return null;

    const entry = payload[0];

    return (
        <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 3, p: 1 }}>
            <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                    Region: {entry.payload.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Users: {entry.payload.value}
                </Typography>
            </Stack>
        </Paper>
    );
}

const renderCustomBarLabel = ({ x, y, width, value }) => (
    <text
        x={x + width + 5}
        y={y + 25}
        fill="#666"
        fontSize="12"
        fontWeight="bold"
        textAnchor="start"
    >
        {value}
    </text>
);
