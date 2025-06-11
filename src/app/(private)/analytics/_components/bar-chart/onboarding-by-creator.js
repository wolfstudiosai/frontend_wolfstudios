import { Card, CardContent, Typography, Grid2 as Grid } from "@mui/material";
import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';

const colors = ["#FFC300", "#00FFFF"]

export function OnboardingByCreator({ data }) {
    const barData = data?.data?.map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.value, 0);
        return { label: item.label, percent: Number((item.value / total) * 100).toFixed(2), values: item.value, color: colors[index] };
    });

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        {data?.label}
                    </Typography>
                    <CustomPieGraph data={barData} />
                </CardContent>
            </Card>
        </Grid>
    );
}