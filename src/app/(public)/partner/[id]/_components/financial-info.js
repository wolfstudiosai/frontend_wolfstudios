import { Box, Card, CardContent, CardHeader, Chip, Grid2, Paper, Stack, Typography } from '@mui/material';
import { formatCompactNumber } from '/src/utils/helper';
import dayjs from 'dayjs';

export default function FinancialInfo({ partner }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Financial" subheader="Rates and payment information" />
                <CardContent>
                    <Stack spacing={3}>
                        {/* Hourly Rate */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Hourly Rate
                            </Typography>
                            <Typography variant="h5">{partner?.HourlyRate || "N/A"}</Typography>
                        </Box>
                        {/* Platform Rates */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Platform Rates
                            </Typography>
                            <Grid2 container spacing={1}>
                                <Grid2 item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Instagram
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {partner?.PartnerIGRate ? formatCompactNumber(partner?.PartnerIGRate) : '0'}
                                        </Typography>
                                    </Paper>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            TikTok
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {partner?.PartnerTTRate ? formatCompactNumber(partner?.PartnerTTRate) : '0'}
                                        </Typography>
                                    </Paper>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            YouTube
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {partner?.PartnerYTRate ? formatCompactNumber(partner?.PartnerYTRate) : '0'}
                                        </Typography>
                                    </Paper>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            UGC
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {partner?.PartnerUGCRate ? formatCompactNumber(partner?.PartnerUGCRate) : '0'}
                                        </Typography>
                                    </Paper>
                                </Grid2>
                            </Grid2>
                        </Box>

                        {/* Payment Summary */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Payment Summary
                            </Typography>
                            <Stack spacing={1}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Amount Paid
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.AmountPaid ? formatCompactNumber(partner?.AmountPaid) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Total Expense
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.TotalExpense ? formatCompactNumber(partner?.TotalExpense) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Estimated Tax
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.EstimatedTax ? formatCompactNumber(partner?.EstimatedTax) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        UGC Payment Status
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.UGCPaymentStatus ? partner?.UGCPaymentStatus : '-'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Performance */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Performance
                            </Typography>
                            <Stack spacing={1}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Total ROI
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.TotalROI ? formatCompactNumber(partner?.TotalROI) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Post Views
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.PartnerPostViews ? formatCompactNumber(partner?.PartnerPostViews) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Total Engagement
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.TotalContributedEngagementbyContent ? formatCompactNumber(partner?.TotalContributedEngagementbyContent) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Total Expense
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.TotalExpense ? formatCompactNumber(partner?.TotalExpense) : '0'}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Total Product COG Expense
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.TotalProductCOGExpense ? formatCompactNumber(partner?.TotalProductCOGExpense) : '0'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Record Information */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Record Information
                            </Typography>

                            <Stack spacing={1}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Record ID
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.RECORDID ? partner?.RECORDID : 'N/A'}
                                    </Typography>
                                </Box>


                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Last Edited
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.Lasteditedtime ? dayjs(partner?.Lasteditedtime).format('DD/MM/YYYY') : 'N/A'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Audited Jan 2025
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.AuditedJan2025 ? partner?.AuditedJan2025 : 'N/A'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Refusal Reason
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.RefusalReason ? partner?.RefusalReason : 'N/A'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Additional Payment Details */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Additional Payment Details
                            </Typography>
                            <Stack spacing={1}>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Second Payment Date
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.SecondPaymentDate ? partner?.SecondPaymentDate : "N/A"}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Remaining Credits
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.RemainingCredits ? partner?.RemainingCredits : "-"}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Levanta Affiliate Fee
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.LevantaAffiliateFee ? partner?.LevantaAffiliateFee : "-"}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        FBA x Levanta
                                    </Typography>
                                    <Typography variant="body2" fontWeight="500">
                                        {partner?.FBAxLevanta ? partner?.FBAxLevanta : "-"}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Source Information */}
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Source Information
                            </Typography>
                            <Stack spacing={1}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Sourced From
                                    </Typography>
                                    {partner?.SourcedFrom && partner?.SourcedFrom.length > 0 ? (
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {partner?.SourcedFrom.map((source, i) => (
                                                <Chip key={i} label={source} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            N/A
                                        </Typography>
                                    )}
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Month Sourced
                                    </Typography>
                                    {partner?.MonthSourced ? (
                                        <Typography variant="body2" fontWeight="500">
                                            {partner?.MonthSourced}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            N/A
                                        </Typography>
                                    )}
                                </Box>
                                {/* <Box>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Is Featured
                                                        </Typography>
                                                        {partner?.isFeatured !== undefined ? (
                                                            <Typography variant="body2" fontWeight="bold">
                                                                {partner?.isFeatured ? "Yes" : "No"}
                                                            </Typography>
                                                        ) : (
                                                            <Typography variant="body2" color="text.secondary">
                                                                N/A
                                                            </Typography>
                                                        )}
                                                    </Box> */}
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}