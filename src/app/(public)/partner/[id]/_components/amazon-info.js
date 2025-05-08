import { Box, Card, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function AmazonInfo({ partner }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
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
                                    <Typography variant="body2" fontWeight="bold">
                                        ${partner?.AmazonKickback ? partner?.AmazonKickback : '0'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Order Total
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${partner?.AmazonOrderTotal ? partner?.AmazonOrderTotal : '0'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Referral Fee
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${partner?.AmazonReferralFee ? partner?.AmazonReferralFee : '0'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Amazon Tax
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${partner?.AmazonTax ? partner?.AmazonTax : '0'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Shipping FBA Fee
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${partner?.ShippingFBAFeeGiftedPartners ? partner?.ShippingFBAFeeGiftedPartners : '0'}
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
                                    {partner?.AmazonReviewBeautyWand ? (
                                        <Link href={partner?.AmazonReviewBeautyWand} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Cupper Review
                                    </Typography>
                                    {partner?.AmazonReviewCupper ? (
                                        <Link href={partner?.AmazonReviewCupper} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Oil Review
                                    </Typography>
                                    {partner?.AmazonReviewOil ? (
                                        <Link href={partner?.AmazonReviewOil} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Soothing Cream Review
                                    </Typography>
                                    {partner?.AmazonReviewSoothingCream ? (
                                        <Link href={partner?.AmazonReviewSoothingCream} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        The Pill Review
                                    </Typography>
                                    {partner?.AmazonReviewThePill ? (
                                        <Link href={partner?.AmazonReviewThePill} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Walking Pad Pro Review
                                    </Typography>
                                    {partner?.AmazonReviewWalkingPadPro ? (
                                        <Link href={partner?.AmazonReviewWalkingPadPro} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Walking Pad Standard Review
                                    </Typography>
                                    {partner?.AmazonReviewWalkingPadStandard ? (
                                        <Link href={partner?.AmazonReviewWalkingPadStandard} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Walking Pad Pro Review
                                    </Typography>
                                    {partner?.AmazonReviewWalkingPadPro ? (
                                        <Link href={partner?.AmazonReviewWalkingPadPro} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Walking Pad Standard Review
                                    </Typography>
                                    {partner?.AmazonReviewWalkingPadStandard ? (
                                        <Link href={partner?.AmazonReviewWalkingPadStandard} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
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
                                    {partner?.AmazonReviewLink ? (
                                        <Link href={partner?.AmazonReviewLink} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>


                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Storefront
                                    </Typography>
                                    {partner?.AmazonStorefront ? (
                                        <Link href={partner?.AmazonStorefront} target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">
                                            -
                                        </Typography>
                                    )}
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        REVO Order Confirmation
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {partner?.REVOAmazonOrderConfirmationNumber ? partner?.REVOAmazonOrderConfirmationNumber : "-"}
                                    </Typography>
                                </Box>

                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}