import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export function FunnelDropOff() {
    const data = [
        { label: "Invited", values: 500, color: '#FFC300' },
        { label: "Signed Up", values: 600, color: '#00FFFF' },
        { label: "Completed Profile", values: 300, color: '#FF9800' },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    });

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Funnel Drop Off
                    </Typography>
                    <CustomDonutChart data={data} />
                </CardContent>
            </Card>
        </Grid>
    )
} 