import { Box, Card, CardContent, CardHeader, Grid2, Paper, Typography } from '@mui/material';

export const ConversionInfo = ({ partner }) => {
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
        <CardHeader title="Conversions" subheader="Product conversion metrics" />
        <CardContent>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
            {[
              { label: 'Amazon review cupper', value: partner?.amazonReviewCupper },
              { label: 'Amazon review oils', value: partner?.amazonReviewOil },
              { label: 'Amazon review pro', value: partner?.amazonReviewWalkingPadPro },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: '1 1 calc(20% - 16px)',
                  minWidth: '160px',
                  maxWidth: '100%',
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 120,
                    border: '1px solid var(--mui-palette-divider)',
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value ?? '0'}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};
