'use client'

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid2 as Grid,
    useTheme,
    alpha
} from "@mui/material";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    ResponsiveContainer
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const metrics = [
    {
        title: "Total Signups",
        value: 1520,
        data: [200, 220, 250, 300, 280, 330, 340],
        type: "line"
    },
    {
        title: "Completed Profiles",
        value: 1245,
        data: [100, 150, 140, 180, 100, 220, 240],
        type: "area"
    },
    {
        title: "Total Assets",
        value: 590,
        data: [50, 60, 70, 85, 90, 100, 110],
        type: "area"
    },
    {
        title: "Published Posts",
        value: 1010,
        data: [80, 95, 100, 120, 130, 145, 150],
        type: "line"
    },
    {
        title: "Avg Onboarding Time",
        value: "2.1h",
        data: [3.0, 2.7, 2.5, 2.3, 2.2, 2.1, 2.0],
        type: "area"
    },
    {
        title: "Content Revision Rate",
        value: "12%",
        data: [15, 14, 13, 13, 12, 12, 11],
        type: "area"
    },
    {
        title: "Approval Time (Hours)",
        value: "3.6h",
        data: [4.5, 4.2, 4.0, 3.9, 3.8, 3.7, 3.6],
        type: "line"
    },
];

const SparklineMetricsCard = ({ title, value, data, type }) => {
    const theme = useTheme();
    const chartData = data.map((d, i) => ({ value: d, index: i }));
    const change = ((data[data.length - 1] - data[data.length - 2]) / data[data.length - 2]) * 100;
    const isIncrease = change >= 0;
    const ChangeIcon = isIncrease ? ArrowUpRight : ArrowDownRight;

    return (
        <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight={600}>
                        {value}
                    </Typography>
                    <Box display="flex" alignItems="center" color={isIncrease ? "success.main" : "error.main"}>
                        <ChangeIcon style={{ width: 18, height: 18, marginRight: 4 }} />
                        <Typography variant="body2">{Math.abs(change).toFixed(2)}%</Typography>
                    </Box>
                </Box>
                <ResponsiveContainer width="100%" height={50}>
                    {type === "line" ? (
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={theme.palette.primary.main}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    ) : (
                        <AreaChart data={chartData}>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#003DF7"
                                fill={alpha("#003DF7", 0.15)}
                                strokeWidth={2}
                                dot={false}
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const SparklineMetricsGrid = () => {
    return (
        <Grid container spacing={1} mb={1}>
            {metrics.map((metric) => (
                <Grid size={{ xs: 6, md: 4, lg: 3, }} key={metric.title}>
                    <SparklineMetricsCard
                        title={metric.title}
                        value={metric.value}
                        data={metric.data}
                        type={metric.type}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default SparklineMetricsGrid;
