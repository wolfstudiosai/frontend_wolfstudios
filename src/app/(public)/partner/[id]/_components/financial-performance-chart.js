import { Card, CardContent, CardHeader, Grid2 } from '@mui/material';

import { CustomLineChart } from '../../../../../components/bar-chart/custom-line-chart';

export const FinancialPerformanceChart = ({ partner }) => {
  const data = [
    {
      name: 'ROI',
      pv: partner?.totalROI ?? 400,
      amt: partner?.totalROI ?? 1290,
    },
    {
      name: 'Post Views',
      pv: partner?.partnerPostViews ?? 200,
      amt: partner?.partnerPostViews ?? 990,
    },
    {
      name: 'Engagement',
      pv: partner?.totalContributedEngagementByContent ?? 840,
      amt: partner?.totalContributedEngagementByContent ?? 1110,
    },
    {
      name: 'Expense',
      pv: partner?.totalExpense ?? 1240,
      amt: partner?.totalExpense ?? 1290,
    },
    {
      name: 'COG Expense',
      pv: partner?.totalProductCOGExpense ?? 840,
      amt: partner?.totalProductCOGExpense ?? 1290,
    },
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
        <CardHeader title="Financial Performance" subheader="Financial performance metrics" />
        <CardContent>
          <CustomLineChart data={data} hideLegend={true} />
        </CardContent>
      </Card>
    </Grid2>
  );
};
