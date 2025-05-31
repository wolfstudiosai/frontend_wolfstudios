import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { CustomDonutChart } from "/src/components/bar-chart/custom-donut-chart";

export function PartnerPlatformUsages() {
    const data = [
        { label: "Instagram", values: 50, color: "#E1306C" },
        { label: "TikTok", values: 30, color: "#69C9D0" },
        { label: "YouTube", values: 20, color: "#FF0000" },
        { label: "Facebook", values: 25, color: "#2196F3" },
        { label: "Other", values: 5, color: "#FFC107" },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    });
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Partner Platform Usages
                    </Typography>
                    <CustomDonutChart data={data} />
                </CardContent>
            </Card>
        </Grid>
    )
}