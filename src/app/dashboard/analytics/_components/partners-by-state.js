'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Devices as DevicesIcon } from '@phosphor-icons/react/dist/ssr/Devices';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function PartnersByState({ data }) {
  const chartSize = 240;
  const chartTickness = 100;

  const uniqueData = Array.from(
    new Map(data.map(item => [item.state, item])).values()
  );

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <DevicesIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Partners by State"
      />
      <CardContent>
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
                    <Cell fill={entry.color} key={entry.state} />
                  ))}
                </Pie>
                <Tooltip animationDuration={50} content={<TooltipContent />} />
              </PieChart>
            </NoSsr>
          </Box>
          <Legend data={uniqueData} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function Legend({ data }) {
  return (
    <Grid container spacing={1} paddingTop={2}>
      {data.map((bar) => (
        <Grid key={bar.state} item size={{ xs: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '8px', width: '16px' }} />
            <Typography color="text.secondary" variant="caption">
              {bar.state}
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
          <Stack direction="column" key={entry.state} spacing={1} >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.color, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography color="text.secondary" variant="body2">
                State: {entry.payload.product}
              </Typography>
            </Stack>

            <Typography color="text.secondary" variant="body2">
              Values: {entry.payload.values} records
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
  const x = cx + radius * Math.cos(-midAngle * RADIAN); // labe X position
  const y = cy + radius * Math.sin(-midAngle * RADIAN); // labe Y position

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle" // Center the text horizontally
      dominantBaseline="middle" // Center the text vertically
      style={{ fontSize: '10px', fontWeight: 'bold', fill: '#333' }}
    >
      {percent}%
    </text>
  );
};
