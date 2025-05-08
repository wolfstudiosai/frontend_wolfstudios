import { Grid2, Card, CardHeader, CardContent } from '@mui/material';
import { colorPalette } from '/src/constants/constants';
import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';

export default function SocialMediaGraph({ partner }) {
    const data = [
        { label: 'REVO Massage Gun', values: partner?.SocialMedia?.MassageGun ?? 10, color: colorPalette[0] },
        { label: 'REVO Oils & Creams', values: partner?.SocialMedia?.OilsCreams ?? 30, color: colorPalette[1] },
        { label: 'REVO Smart Cupper', values: partner?.SocialMedia?.SmartCupper ?? 60, color: colorPalette[2] },
        { label: 'REVO Walking Pad Pro', values: partner?.SocialMedia?.WalkingPadPro ?? 20, color: colorPalette[3] },
        { label: 'REVO Walking Pad Max', values: partner?.SocialMedia?.WalkingPadMax ?? 70, color: colorPalette[4] },
    ].map((item, index, array) => {
        const total = array.reduce((sum, current) => sum + current.values, 0);
        return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
    })

    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{
                height: "100%",
                borderRadius: 0,
                bgcolor: "background.default",
                border: "1px solid var(--mui-palette-divider)",
            }}>
                <CardHeader title="Social Media" subheader="Social media metrics" />
                <CardContent>
                    <CustomPieGraph data={data} />
                </CardContent>
            </Card>
        </Grid2>
    )
}