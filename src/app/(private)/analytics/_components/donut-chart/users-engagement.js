import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export function UsersEngagement() {
    const data = [
        { label: "Prospects", values: 500, color: '#00C49F' },
        { label: "Active Users", values: 800, color: '#FFBB28' },
        { label: "Inactive 96h+", values: 200, color: '#FF4442' },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    });

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Users Engagement Status
                    </Typography>
                    <CustomDonutChart data={data} />
                </CardContent>
            </Card>
        </Grid>
    )
}
