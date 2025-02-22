'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '/src/components/core/no-ssr';

export function CustomPieGraph({ data }) {
  const chartSize = 240;
  const chartTickness = 100;

  const uniqueData = Array.from(new Map(data.map((item) => [item.label, item])).values());

  return (
    <Stack divider={<Divider />} spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
          <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
            <Pie
              animationDuration={300}
              cx={chartSize / 2}
              cy={chartSize / 2}
              data={data}
              dataKey="values"
              // innerRadius={chartSize / 2 - chartTickness}
              nameKey="percent"
              outerRadius={chartSize / 2}
              strokeWidth={0}
              label={renderCustomBarLabel}
            >
              {data.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <Tooltip animationDuration={50} content={<TooltipContent />} />
          </PieChart>
        </NoSsr>
      </Box>
      <Legend data={uniqueData} />
    </Stack>
  );
}

function Legend({ data }) {
  return (
    <Grid container spacing={1} paddingTop={2}>
      {data.map((bar) => (
        <Grid key={bar.label} item size={{ xs: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '8px', width: '16px' }} />
            <Typography color="text.secondary" variant="caption">
              {bar.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

function TooltipContent({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack direction="column" key={entry.name} spacing={1}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.color, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography color="text.secondary" variant="body2">
                label: {entry.payload.label}
              </Typography>
            </Stack>

            <Typography color="text.secondary" variant="body2">
              Values: {entry.payload.values}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Percent: {entry.payload.percent}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

const renderCustomBarLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: '10px', fontWeight: 'bold', fill: '#333' }}
    >
      {percent}%
    </text>
  );
};
