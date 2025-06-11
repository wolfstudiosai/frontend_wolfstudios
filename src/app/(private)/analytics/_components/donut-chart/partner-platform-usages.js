import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

const colors = ['#E1306C', '#69C9D0', '#FF0000', '#2196F3', '#FFC107'];

export function PartnerPlatformUsages({ data }) {
    const donutData = data?.data?.map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { label: item.label, percent: Number((item.values / total) * 100).toFixed(2), values: item.value, color: colors[index] };
    });
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        {data?.label}
                    </Typography>
                    <CustomDonutChart data={donutData} />
                </CardContent>
            </Card>
        </Grid>
    )
}