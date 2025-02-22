'use client';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { CustomBarGraph } from '/src/components/bar-chart/custom-bar-graph';
import { CustomPieGraph } from '/src/components/bar-chart/custom-pie-graph';
import { pxToRem } from '/src/utils/helper';
import { colorPalette } from '/src/constants/constants';

export function DemographicOverview() {
  return (
    <Card sx={{ padding: { xs: 1, md: 2 }, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography color="text.primary" sx={{ fontWeight: 500, fontSize: pxToRem(20), mb: 1 }}>
            Demographic
          </Typography>
          <CustomPieGraph
            data={[
              { label: 'REVO Massage Gun', values: 258, color: colorPalette[0] },
              { label: 'REVO Oils & Creams', values: 29, color: colorPalette[1] },
              { label: 'REVO Smart Cupper', values: 725, color: colorPalette[2] },
              { label: 'REVO Walking Pad Pro', values: 136, color: colorPalette[3] },
              { label: 'REVO Walking Pad Max', values: 376, color: colorPalette[4] },
            ].map((item, index, array) => {
              const total = array.reduce((sum, current) => sum + current.values, 0);
              return { ...item, percent: Number((item.values / total) * 100).toFixed(2) };
            })}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography color="text.primary" sx={{ fontWeight: 500, fontSize: pxToRem(20), mb: 1, textAlign: 'center' }}>
            Demographic segmentation by campaign
          </Typography>
          <CustomBarGraph
            data={[
              {
                name: 'Age 18-25',
                campaign: 'REVO massage gun',
                total: 6680,
                color: colorPalette[0],
              },
              {
                name: 'Age 25-45',
                campaign: 'REVO UGC ARMY',
                total: 15245,
                color: colorPalette[1],
              },
              {
                name: 'Age 45-65',
                campaign: 'REVO Walking Pad',
                total: 2034,
                color: colorPalette[3],
              },
              {
                name: 'Age over 65',
                campaign: '50 Review Challenge',
                total: 792,
                color: colorPalette[4],
              },
            ]}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
