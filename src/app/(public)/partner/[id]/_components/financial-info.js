import { Box, Card, CardContent, CardHeader, Chip, Grid2, Paper, Stack, Typography } from '@mui/material';

import { formatCompactNumber } from '/src/utils/helper';

export const FinancialInfo = ({ partner }) => {
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
        <CardHeader title="Financial" subheader="Rates and payment information" />
        <CardContent>
          <Stack spacing={3}>
            {/* Hourly Rate */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Hourly Rate
              </Typography>
              <Typography variant="h5">{partner?.hourlyRate || 'N/A'}</Typography>
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
                      {partner?.partnerIGRate ? formatCompactNumber(partner?.partnerIGRate) : '0'}
                    </Typography>
                  </Paper>
                </Grid2>
                <Grid2 item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      TikTok
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {partner?.partnerTTRate ? formatCompactNumber(partner?.partnerTTRate) : '0'}
                    </Typography>
                  </Paper>
                </Grid2>
                <Grid2 item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      YouTube
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {partner?.partnerYTRate ? formatCompactNumber(partner?.partnerYTRate) : '0'}
                    </Typography>
                  </Paper>
                </Grid2>
                <Grid2 item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      UGC
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {partner?.partnerUGCRate ? formatCompactNumber(partner?.partnerUGCRate) : '0'}
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
                    {partner?.amountPaid ? formatCompactNumber(partner?.amountPaid) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Expense
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.totalExpense ? formatCompactNumber(partner?.totalExpense) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Estimated Tax
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.estimatedTaxes ? formatCompactNumber(partner?.estimatedTaxes) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    UGC Payment Status
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.ugcPaymentStatus ? partner?.ugcPaymentStatus : '-'}
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
                    {partner?.totalROI ? formatCompactNumber(partner?.totalROI) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Post Views
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.partnerPostViews ? formatCompactNumber(partner?.partnerPostViews) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Engagement
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.totalContributedEngagementByContent
                      ? formatCompactNumber(partner?.totalContributedEngagementByContent)
                      : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Expense
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.totalExpense ? formatCompactNumber(partner?.totalExpense) : '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Product COG Expense
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.totalProductCOGExpense ? formatCompactNumber(partner?.totalProductCOGExpense) : '0'}
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
                    Refusal Reason
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.refusalReason ? partner?.refusalReason : 'N/A'}
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
                    {partner?.secondPaymentDate ? partner?.secondPaymentDate : 'N/A'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Remaining Credits
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.remainingCredits ? partner?.remainingCredits : '-'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    FBA x Levanta
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {partner?.fbaXLevanta ? partner?.fbaXLevanta : '-'}
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
                  {partner?.sourcedFrom && partner?.sourcedFrom.length > 0 ? (
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {partner?.sourcedFrom.map((source, i) => (
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
                  {partner?.monthSourced ? (
                    <Typography variant="body2" fontWeight="500">
                      {partner?.monthSourced}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      N/A
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
