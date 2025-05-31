import { Card, CardContent, Typography, Grid2 as Grid } from "@mui/material";
import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';

export function OnboardingByCreator() {
    const data = [
        { label: "Micro", values: 60, color: '#FFC300' },
        { label: "Macro", values: 40, color: '#00FFFF' },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    });
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ width: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Onboarding by Creator
                    </Typography>
                    <CustomPieGraph data={data} />
                </CardContent>
            </Card>
        </Grid>
    );
}