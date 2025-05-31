'use client';

import { Card, CardContent, Typography, Box, Stack, Paper } from "@mui/material";
import { NoSsr } from '/src/components/core/no-ssr';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Grid from '@mui/material/Grid2';

const chartData = [
    { name: "New York", users: 98 },
    { name: "Texas", users: 130 },
    { name: "Pennsylvania", users: 20 },
    { name: "Florida", users: 85 },
    { name: "Delaware", users: 10 },
    { name: "Illinois", users: 70 },
    { name: "California", users: 120 },
    { name: "Massachusetts", users: 30 },
    { name: "New Jersey", users: 60 },
    { name: "Georgia", users: 50 },
    { name: "North Carolina", users: 40 },
];

export function OnboardingByRegion() {
    return (
        <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Onboarding by Region
                    </Typography>
                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                barGap={4}
                                data={chartData}
                                layout="vertical"
                                margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                            >
                                <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 4" />
                                <XAxis type="number" axisLine={false} tickLine={false} />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    width={150}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                                <Legend />
                                <Bar
                                    dataKey="users"
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
                    Region: {entry.payload.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Users: {entry.payload.users}
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
