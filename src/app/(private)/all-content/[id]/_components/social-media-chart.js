'use client'

import { Box, Grid2, Typography, Card, CardContent, CardHeader } from "@mui/material";
import { NoSsr } from '/src/components/core/no-ssr';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function SocialMediaChart({ content }) {
    // Create data for the pie chart
    const chartData = [
        { name: "Instagram", value: content.IGTotalViews + content.IGTotalLikes + content.IGTotalComments + content.IGTotalShares },
        {
            name: "TikTok",
            value: content.PartnerTTViews + content.PartnerTTLikes + content.PartnerTTComments + content.PartnerTTShares,
        },
        { name: "YouTube", value: content.YTPartnerTotalViews + content.YTPartnerTotallikes + content.YTPartnerTotalcomments },
        { name: "Pinterest", value: content.PinterestTotalViews + content.PinterestTotalPinClicks },
    ]

    // Ensure we have at least some data to show
    const hasData = chartData.some((item) => item.value > 0)

    if (!hasData) {
        // Add dummy data if no real data exists
        chartData.forEach((item, index) => {
            item.value = 10 + index * 5
        })
    }

    const COLORS = ["#4f46e5", "#ec4899", "#ef4444", "#f97316"]
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Social Media Distribution" subheader="Engagement across platforms" />
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ height: 300 }}>
                        <NoSsr fallback={<Box sx={{ height: 300, width: 300 }} />}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </NoSsr>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}