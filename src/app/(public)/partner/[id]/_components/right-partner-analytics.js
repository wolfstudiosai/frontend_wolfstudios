import { Box, Grid2, Stack, Typography } from '@mui/material';

import { PartnerIframes } from '../../_components/partner-quickview';
import { AdditionalInfo } from './additonal-info';
import { AmazonInfo } from './amazon-info';
import { CampaignDetails } from './campign-details';
import { FinancialInfo } from './financial-info';
import { FinancialPerformanceChart } from './financial-performance-chart';
import { SocialMediaGraph } from './social-media-graph';
import { SocialMediaStates } from './social-media-states';
import { PartnerGallery } from './partner-gallery';

export const RightPartnerAnalytics = ({ partner }) => {
  const socialProfiles = [
    partner?.instagram && { platform: 'Instagram', url: partner.instagram },
    partner?.tiktok && { platform: 'TikTok', url: partner.tiktok },
    // partner?.Youtube && { platform: 'YouTube', url: partner.Youtube },
    partner?.x && { platform: 'X', url: partner.x },
    partner?.facebook && { platform: 'Facebook', url: partner.facebook },
    partner?.pinterest && { platform: 'Pinterest', url: partner.pinterest },
    partner?.linkedIn && { platform: 'LinkedIn', url: partner.linkedIn },
  ].filter(Boolean);

  const partnerGallery = [...partner?.partnerGallery, ...partner?.mediaKit, ...partner?.contracts, ...partner?.receipts]

  return (
    <Box>
      {socialProfiles.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Social Profiles
          </Typography>
          <Stack direction="row">
            <PartnerIframes profiles={socialProfiles} />
          </Stack>
        </Box>
      )}
      <PartnerGallery partnerGallery={partnerGallery} />

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
        {/* <ConversionInfo partner={partner} /> */}

        {/* Additional Information */}
        <AdditionalInfo partner={partner} />
      </Grid2>
    </Box>
  );
};
