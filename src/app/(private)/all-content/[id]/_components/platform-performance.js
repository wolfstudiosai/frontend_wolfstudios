import { Grid2 } from "@mui/material";
import { Card, CardContent, Box, CardHeader } from "@mui/material";
import ProgressItem from '/src/components/common/progress-item';

export default function PlatformPerformance({ content }) {
    const items = [
        { label: 'Instagram', value: content.IGTotalViews, bgcolor: '#4f46e5', progressColor: '#4f46e5' },
        { label: 'TikTok', value: content.PartnerTTViews, bgcolor: '#ec4899', progressColor: '#ec4899' },
        { label: 'YouTube', value: content.YTPartnerTotalViews, bgcolor: '#ef4444', progressColor: '#ef4444' },
        { label: 'Pinterest', value: content.PinterestTotalViews, bgcolor: '#f97316', progressColor: '#f97316' },
    ]
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Platform Performance" subheader="Views and engagement by platform" />
                <CardContent sx={{ p: 3 }}>
                    <Box>
                        {items.map((item) => (
                            <ProgressItem
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                total={content?.TotalAudience || 1}
                                bgcolor={item.bgcolor}
                                progressColor={item.progressColor}
                            />
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}