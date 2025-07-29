import { Card, CardContent, CardHeader, Grid2 } from '@mui/material';

import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';

import { colorPalette } from '/src/constants/constants';

export const SocialMediaGraph = ({ partner }) => {
  const data = [
    { label: 'REVO Massage Gun', values: partner?.socialMedia?.massageGun ?? 10, color: colorPalette[0] },
    { label: 'REVO Oils & Creams', values: partner?.socialMedia?.oilsCreams ?? 30, color: colorPalette[1] },
    { label: 'REVO Smart Cupper', values: partner?.socialMedia?.smartCupper ?? 60, color: colorPalette[2] },
    { label: 'REVO Walking Pad Pro', values: partner?.socialMedia?.walkingPadPro ?? 20, color: colorPalette[3] },
    { label: 'REVO Walking Pad Max', values: partner?.socialMedia?.walkingPadMax ?? 70, color: colorPalette[4] },
  ].map((item, index, array) => {
    const total = array.reduce((sum, current) => sum + current.values, 0);
    return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
  });

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
        <CardHeader title="Social Media" subheader="Social media metrics" />
        <CardContent>
          <CustomPieGraph data={data} />
        </CardContent>
      </Card>
    </Grid2>
  );
};
