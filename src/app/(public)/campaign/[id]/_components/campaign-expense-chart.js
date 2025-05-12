'use client'

import { Grid2, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function CampaignExpenseChart({ campaign }) {
    const expenseData = [
        { label: 'Budget', values: campaign?.Budget || 10, color: COLORS[0] },
        { label: 'Product Expense', values: Number(campaign?.ProductExpense) || 30, color: COLORS[1] },
        { label: 'Total Expense', values: Number(campaign?.TotalExpense) || 20, color: COLORS[2] },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    })
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Expense" subheader="Campaign Expense Details" />
                <CardContent>
                    <CustomPieGraph data={expenseData} />
                </CardContent>
            </Card>
        </Grid2>
    );
}