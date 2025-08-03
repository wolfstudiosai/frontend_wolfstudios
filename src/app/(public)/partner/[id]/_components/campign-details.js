import { Box, Card, CardContent, CardHeader, Chip, Grid2, Paper, Stack, Typography } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';

export const CampaignDetails = ({ partner }) => {

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
        <CardHeader title="Campaign Details" subheader="Proposed campaigns and products" />
        <CardContent>
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Proposed Campaigns
              </Typography>
              {partner?.proposedCampaigns?.length > 0 ? (
                <Stack spacing={0.5}>
                  {partner?.proposedCampaigns?.map((campaign, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <Iconify icon="mdi:calendar-blank-outline" />
                      <Typography variant="body2">{campaign.name}</Typography>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No campaigns proposed
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Products
              </Typography>
              {partner?.products?.length > 0 ? (
                <Stack spacing={0.5}>
                  {partner?.products?.map((product, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <Iconify icon="mdi:shopping-outline" />
                      <Typography variant="body2">{product.name}</Typography>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No products assigned
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Campaign Months
              </Typography>
              <Typography variant="body2">
                {partner?.campaignMonth?.length > 0
                  ? partner?.campaignMonth?.map((month, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <Iconify icon="mdi:calendar-blank-outline" />
                      <Typography variant="body2">{month}</Typography>
                    </Box>
                  ))
                  : 'N/A'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Tags
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {partner?.tags?.length > 0 ? (
                  partner?.tags?.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag?.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      icon={<Iconify icon="mdi:tag-outline" fontSize="small" />}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No tags assigned
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
};
