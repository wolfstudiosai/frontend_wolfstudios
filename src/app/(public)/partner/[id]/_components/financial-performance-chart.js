import { Grid2, Card, CardHeader, CardContent } from '@mui/material';
import { CustomLineChart } from '/src/components/bar-chart/custom-line-chart';

export default function FinancialPerformanceChart({ partner }) {

    const data = [
        {
            name: 'ROI',
            pv: 400,
            amt: partner?.TotalROI ?? 1290,
        },
        {
            name: 'Post Views',
            pv: 200,
            amt: partner?.TotalPostViews ?? 990,
        },
        {
            name: 'Engagement',
            pv: 840,
            amt: partner?.TotalContributedEngagementbyContent ?? 1110,
        },
        {
            name: 'Expense',
            pv: 1240,
            amt: partner?.TotalExpense ?? 1290,
        },
        {
            name: 'Revenue',
            pv: 140,
            amt: partner?.TotalRevenue ?? 1290,
        },
        {
            name: 'COG Expense',
            pv: 900,
            amt: partner?.TotalProductCOGExpense ?? 1290,
        },
    ]
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{
                height: "100%",
                borderRadius: 0,
                bgcolor: "background.default",
                border: "1px solid var(--mui-palette-divider)",
            }}>
                <CardHeader title="Financial Performance" subheader="Financial performance metrics" />
                <CardContent>
                    <CustomLineChart data={data} />
                </CardContent>
            </Card>
        </Grid2>
    )
}