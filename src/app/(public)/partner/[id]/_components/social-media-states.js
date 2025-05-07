import { Box, Card, CardContent, CardHeader, Grid2, Stack, Typography, Divider } from '@mui/material';
import { formatCompactNumber } from '/src/utils/helper';
import SocialProgressItem from './social-progress-item';

export default function SocialMediaStates({ partner }) {
    const items = [
        { label: 'Facebook', value: partner?.FacebookFollowing, bgcolor: '#1877F2', progressColor: '#1877F2' },
        { label: 'Instagram', value: partner?.InstagramFollowing, bgcolor: '#E1306C', progressColor: '#E1306C' },
        { label: 'LinkedIn', value: partner?.LinkedInConnections, bgcolor: '#0077B5', progressColor: '#0077B5' },
        { label: 'TikTok', value: partner?.TiktokFollowers, bgcolor: '#010101', progressColor: '#69C9D0' },
        { label: 'YouTube', value: partner?.YoutubeFollowing, bgcolor: '#FF0000', progressColor: '#FF0000' },
        { label: 'Pinterest', value: partner?.PinterestFollowing, bgcolor: '#BD081C', progressColor: '#BD081C' },
        { label: 'Snapchat', value: partner?.SnapchatFollowing, bgcolor: '#FFFC00', progressColor: '#FFFC00' },
        { label: 'Post Views', value: partner?.PartnerPostViews, bgcolor: '#6C757D', progressColor: '#6C757D' },
    ];

    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", borderRadius: 0, bgcolor: '#fff', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Social Media" subheader="Audience and platform statistics" />
                <CardContent>
                    <Stack spacing={3}>
                        <Box>
                            {items.map((item) => (
                                <SocialProgressItem
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    total={partner?.TotalAudience || 1}
                                    bgcolor={item.bgcolor}
                                    progressColor={item.progressColor}
                                />
                            ))}
                        </Box>

                        <Divider />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Total Audience
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {partner.TotalAudience ? formatCompactNumber(partner.TotalAudience) : '0'}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}