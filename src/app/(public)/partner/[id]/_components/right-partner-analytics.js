import { Box, Card, Grid2, Stack, Typography } from '@mui/material';
import { PartnerIframes } from '../../_components/partner-quickview';
import { formatCompactNumber } from '/src/utils/helper';
import { SalesVolume } from '../../../../(private)/campaign-analytics/_components/sales-volume';
import { SegmentationByGender } from '../../../../(private)/campaign-analytics/_components/segmentation-by-gender';
import { ConversionRate } from '../../../../(private)/campaign-analytics/_components/conversion-rate';
import { DemographicOverview } from '../../../../(private)/campaign-analytics/_components/demographic-overview';

export const RightPartnerAnalytics = ({ partner }) => {
    const socialProfiles = [
        partner?.Instagram && { platform: 'Instagram', url: partner.Instagram },
        partner?.Tiktok && { platform: 'TikTok', url: partner.Tiktok },
        partner?.Youtube && { platform: 'YouTube', url: partner.Youtube },
        partner?.X && { platform: 'X', url: partner.X },
        partner?.Facebook && { platform: 'Facebook', url: partner.Facebook },
        partner?.Pinterest && { platform: 'Pinterest', url: partner.Pinterest },
        partner?.LinkedIn && { platform: 'LinkedIn', url: partner.LinkedIn },
    ].filter(Boolean);

    console.log(partner.InstagramFollowers);
    console.log(partner.LinkedInConnections);
    console.log(partner.TiktokFollowers);
    console.log(partner.YoutubeSubscribers);
    const items = [
        { label: 'Facebook', value: partner?.FacebookFollowing },
        { label: 'Instagram', value: partner?.InstagramFollowing },
        { label: 'Linkedin', value: partner?.LinkedInConnections },
        { label: 'Tiktok', value: partner?.TiktokFollowers },
        { label: 'Youtube', value: partner?.YoutubeFollowing },
        { label: 'Tiktok', value: partner?.TiktokFollowing },
        { label: 'Pinterest', value: partner?.PinterestFollowing },
        { label: 'Snapchat', value: partner?.SnapchatFollowing },
        { label: 'Post Views', value: partner?.PartnerPostViews },
    ];

    return (
        <Box>
            <Stack direction="row" spacing={1}>
                {socialProfiles.length > 0 && <PartnerIframes profiles={socialProfiles} />}
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    width: '100%',
                    my: 5,
                    gridTemplateColumns: {
                        xs: 'repeat(3, 1fr)',
                        sm: 'repeat(5, 1fr)',
                        md: 'repeat(7, 1fr)',
                        lg: 'repeat(9, 1fr)',
                    },
                }}
            >
                {items.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {item.label}
                        </Typography>
                        <Typography variant="h6">
                            {item.value ? formatCompactNumber(item.value) : '-'}
                        </Typography>
                    </Box>
                ))}
            </Box>



            <ConversionRate />
            <DemographicOverview />
            <Card sx={{ padding: { xs: 1, md: 2 }, mt: 2 }}>
                <Grid2 container spacing={4}>
                    <Grid2 item size={{ xs: 12, md: 8 }}>
                        <SalesVolume />
                    </Grid2>
                    <Grid2 item size={{ xs: 12, md: 4 }}>
                        <SegmentationByGender />
                    </Grid2>
                </Grid2>
            </Card>
        </Box>
    );
};
