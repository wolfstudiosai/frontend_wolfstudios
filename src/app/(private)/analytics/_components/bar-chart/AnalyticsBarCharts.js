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
            { name: "North America", value: 120 },
            { name: "Europe", value: 98 },
            { name: "Asia", value: 130 },
            { name: "South America", value: 85 },
            { name: "Africa", value: 70 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#3f51b5",
    },
    {
        title: "Onboarding by Creator Tier",
        data: [
            { name: "Micro", value: 60 },
            { name: "Macro", value: 40 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#f50057",
    },
    {
        title: "Posts per Onboarded Creator",
        data: [
            { name: "Creator A", value: 10 },
            { name: "Creator B", value: 8 },
            { name: "Creator C", value: 12 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#4caf50",
    },
    {
        title: "Top 5 Influencers by Engagement Rate",
        data: [
            { name: "Influencer A", value: 15 },
            { name: "Influencer B", value: 13 },
            { name: "Influencer C", value: 10 },
            { name: "Influencer D", value: 9 },
            { name: "Influencer E", value: 7 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#ff9800",
    },
    {
        title: "Top 5 Influencers by Click‑Through Rate",
        data: [
            { name: "Influencer X", value: 8 },
            { name: "Influencer Y", value: 7.5 },
            { name: "Influencer Z", value: 7 },
            { name: "Influencer M", value: 6.5 },
            { name: "Influencer N", value: 6 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#009688",
    },
    {
        title: "Campaign Conversions by Campaign",
        data: [
            { name: "Campaign 1", value: 40 },
            { name: "Campaign 2", value: 55 },
            { name: "Campaign 3", value: 35 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#9c27b0",
    },
    {
        title: "Assets Delivered by Month",
        data: [
            { name: "Jan", value: 20 },
            { name: "Feb", value: 25 },
            { name: "Mar", value: 30 },
            { name: "Apr", value: 18 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#3f51b5",
    },
    {
        title: "Post Frequency by Day of Week",
        data: [
            { name: "Mon", value: 5 },
            { name: "Tue", value: 8 },
            { name: "Wed", value: 6 },
            { name: "Thu", value: 7 },
            { name: "Fri", value: 9 },
            { name: "Sat", value: 4 },
            { name: "Sun", value: 3 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#2196f3",
    },
    {
        title: "Revision Count per Creator",
        data: [
            { name: "Creator A", value: 2 },
            { name: "Creator B", value: 5 },
            { name: "Creator C", value: 3 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#ff5722",
    },
    {
        title: "Pending Onboarding Tasks by Category",
        data: [
            { name: "Profile Setup", value: 10 },
            { name: "Document Upload", value: 8 },
            { name: "Verification", value: 5 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#00bcd4",
    },
    {
        title: "Response Rate to Briefs by Creator",
        data: [
            { name: "Creator A", value: 90 },
            { name: "Creator B", value: 75 },
            { name: "Creator C", value: 85 },
        ],
        dataKey: "name",
        barKey: "value",
        color: "#8bc34a",
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
                                        <Tooltip />
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
