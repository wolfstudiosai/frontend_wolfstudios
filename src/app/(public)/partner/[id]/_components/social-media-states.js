import { Box, Card, CardContent, CardHeader, Divider, Grid2, Stack, Typography } from '@mui/material';

import ProgressItem from '/src/components/common/progress-item';

import { formatCompactNumber } from '/src/utils/helper';

export const SocialMediaStates = ({ partner }) => {
  const items = [
    { label: 'Facebook', value: partner?.facebookFollowing, bgcolor: '#1877F2', progressColor: '#1877F2' },
    { label: 'Instagram', value: partner?.instagramFollowing, bgcolor: '#E1306C', progressColor: '#E1306C' },
    { label: 'LinkedIn', value: partner?.linkedinConnections, bgcolor: '#0077B5', progressColor: '#0077B5' },
    { label: 'TikTok', value: partner?.tiktokFollowing, bgcolor: '#010101', progressColor: '#69C9D0' },
    { label: 'YouTube', value: partner?.youtubeFollowing, bgcolor: '#FF0000', progressColor: '#FF0000' },
    { label: 'Pinterest', value: partner?.pinterestFollowing, bgcolor: '#BD081C', progressColor: '#BD081C' },
    { label: 'Snapchat', value: partner?.snapchatFollowing, bgcolor: '#FFFC00', progressColor: '#FFFC00' },
    { label: 'Post Views', value: partner?.partnerPostViews, bgcolor: '#6C757D', progressColor: '#6C757D' },
  ];

  return (
    <Grid2 item size={{ xs: 12, md: 6 }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 0,
          bgcolor: 'background.default',
          border: '1px solid var(--mui-palette-divider)',
        }}
      >
        <CardHeader title="Social Media" subheader="Audience and platform statistics" />
        <CardContent>
          <Stack spacing={3}>
            <Box>
              {items.map((item) => (
                <ProgressItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  total={partner?.totalAudience || 1}
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
              <Typography variant="h6" fontWeight="500">
                {partner.totalAudience ? formatCompactNumber(partner.totalAudience) : '0'}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
};
