import Link from 'next/link';
import { Box, Card, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material';

export const AmazonInfo = ({ partner }) => {
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
        <CardHeader title="Amazon Information" subheader="Amazon-related metrics and details" />
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Amazon Metrics
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Amazon Kickback
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${partner?.amazonKickback ? partner?.amazonKickback : '0'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Order Total
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${partner?.amazonOrderTotal ? partner?.amazonOrderTotal : '0'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Referral Fee
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${partner?.amazonReferralFee ? partner?.amazonReferralFee : '0'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Amazon Tax
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${partner?.amazonTax ? partner?.amazonTax : '0'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Shipping FBA Fee
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${partner?.shippingFBAFeeGiftedPartners ? partner?.shippingFBAFeeGiftedPartners : '0'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    REVO Order Confirmation
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.revoAmazonOrderConfirmationNumber ? partner?.revoAmazonOrderConfirmationNumber : '-'}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Amazon Reviews
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Beauty Wand Review
                  </Typography>
                  {partner?.amazonReviewBeautyWand ? (
                    <Link href={partner?.amazonReviewBeautyWand} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Cupper Review
                  </Typography>
                  {partner?.amazonReviewCupper ? (
                    <Link href={partner?.amazonReviewCupper} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Oil Review
                  </Typography>
                  {partner?.amazonReviewOil ? (
                    <Link href={partner?.amazonReviewOil} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Soothing Cream Review
                  </Typography>
                  {partner?.amazonReviewSoothingCream ? (
                    <Link href={partner?.amazonReviewSoothingCream} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    The Pill Review
                  </Typography>
                  {partner?.amazonReviewThePill ? (
                    <Link href={partner?.amazonReviewThePill} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Walking Pad Pro Review
                  </Typography>
                  {partner?.amazonReviewWalkingPadPro ? (
                    <Link href={partner?.amazonReviewWalkingPadPro} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Walking Pad Standard Review
                  </Typography>
                  {partner?.amazonReviewWalkingPadStandard ? (
                    <Link href={partner?.amazonReviewWalkingPadStandard} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Amazon Links
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Review Link
                  </Typography>
                  {partner?.amazonReviewLink ? (
                    <Link href={partner?.amazonReviewLink} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Storefront
                  </Typography>
                  {partner?.amazonStorefront ? (
                    <Link href={partner?.amazonStorefront} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  ) : (
                    <Typography variant="body2" fontWeight="500">
                      -
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
};
