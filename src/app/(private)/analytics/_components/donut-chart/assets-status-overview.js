import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export function AssetsStatusOverview() {
    const data = [
        { label: "Draft", values: 20, color: "#A28EFF" },
        { label: "Under Review", values: 10, color: "#F39C12" },
        { label: "Approved", values: 70, color: "#27AE60" },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    });
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Assets Status Overview
                    </Typography>
                    <CustomDonutChart data={data} />
                </CardContent>
            </Card>
        </Grid>
    )
}