import { Box, Grid2, Stack } from '@mui/material';
import { PartnerIframes } from '../../_components/partner-quickview';
import SocialMediaStates from './social-media-states';
import CampaignDetails from './campign-details';
import FinancialInfo from './financial-info';
import AmazonInfo from './amazon-info';
import ConversionInfo from './conversion-info';
import AdditionalInfo from './additonal-info';
import SocialMediaGraph from './social-media-graph';
import FinancialPerformanceChart from './financial-performance-chart';

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


    return (
        <Box>
            {socialProfiles.length > 0 && (
                <Stack direction="row" sx={{ mb: 4 }}>
                    <PartnerIframes profiles={socialProfiles} />
                </Stack>
            )}

            {/* <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Followers Details
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        width: '100%',
                        mb: 5,
                        gridTemplateColumns: {
                            xs: 'repeat(3, 1fr)',
                            sm: 'repeat(5, 1fr)',
                            md: 'repeat(7, 1fr)',
                            lg: 'repeat(9, 1fr)',
                        },
                    }}
                >
                    {items.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {item.label}
                            </Typography>
                            <Typography variant="h6">
                                {item.value ? formatCompactNumber(item.value) : '-'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box> */}

            <Grid2 container spacing={1}>
                {/* Social Media Graph */}
                <SocialMediaGraph partner={partner} />

                {/* Financial Performance Chart */}
                <FinancialPerformanceChart partner={partner} />

                {/* Social Media Stats */}
                <SocialMediaStates partner={partner} />

                {/* Campaign Details */}
                <CampaignDetails partner={partner} />

                {/* Financial */}
                <FinancialInfo partner={partner} />

                {/* Amazon Information */}
                <AmazonInfo partner={partner} />

                {/* Conversions */}
                <ConversionInfo partner={partner} />

                {/* Additional Information */}
                <AdditionalInfo partner={partner} />

            </Grid2>
        </Box>
    );
};
