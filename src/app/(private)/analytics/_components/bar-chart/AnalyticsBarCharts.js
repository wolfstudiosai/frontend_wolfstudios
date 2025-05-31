'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Typography, Card, CardContent, Box, Grid } from "@mui/material";
import { NoSsr } from '/src/components/core/no-ssr';

const chartData = [
    {
        title: "Onboarding by Region",
        data: [
            { name: "North America", count: 120 },
            { name: "Europe", count: 98 },
            { name: "Asia", count: 130 },
            { name: "South America", count: 85 },
            { name: "Africa", count: 70 },
        ],
        dataKey: "name",
        barKey: "count",
        color: "#3f51b5",
    },
    {
        title: "Onboarding by Creator Tier",
        data: [
            { name: "Micro", count: 60 },
            { name: "Macro", count: 40 },
        ],
        dataKey: "name",
        barKey: "count",
        color: "#f50057",
    },
    {
        title: "Top 5 Influencers by Engagement Rate",
        data: [
            { name: "Alice", conversions: 340 },
            { name: "Bob", conversions: 290 },
            { name: "Charlie", conversions: 270 },
            { name: "Diana", conversions: 250 },
            { name: "Evan", conversions: 230 },
        ],
        dataKey: "name",
        barKey: "conversions",
        color: "#ff9800",
    },
    {
        title: "Conversions by Content",
        data: [
            { content: "Content", conversions: 200 },
            { content: "Partner", conversions: 150 },
            { content: "Levanta", conversions: 100 },
        ],
        dataKey: "content",
        barKey: "conversions",
        color: "#9c27b0",
    },
    {
        title: "Campaign Assets Delivered by Month",
        data: [
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
        ],
        dataKey: "name",
        barKey: "value",
        color: "#009688",
    },
    {
        title: "User Distribution by Partner Category",
        data: [
            { category: "Fashion", users: 120 },
            { category: "Tech", users: 90 },
            { category: "Fitness", users: 75 },
            { category: "Travel", users: 60 },
            { category: "Food", users: 80 },
            { category: "Beauty", users: 70 },
        ],
        dataKey: "category",
        barKey: "users",
        color: "#2196f3",
    },
];

export default function AnalyticsBarCharts() {
    return (
        <Grid container spacing={1}>
            {chartData.map((chart, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                    <Card sx={{ width: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                                {chart.title}
                            </Typography>
                            <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chart.data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <XAxis dataKey={chart.dataKey} axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Legend />
                                        <Bar dataKey={chart.barKey} fill={chart.color} radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </NoSsr>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
