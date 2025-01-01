'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import Grid from '@mui/material/Grid2';


export function IgViewsByPost({ data }) {
  const chartHeight = 300;

  const ticks = [0, 20000, 40000, 60000, 10000];

  const uniqueData = Array.from(
    new Map(data.map(item => [item.campaign, item])).values()
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
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Over 20,000 IG Views by Post"
      />
      <CardContent sx={{ pr: 4 }}>
        <Stack divider={<Divider />} >
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={1} data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 100 }}>
                <CartesianGrid horizontal={false} strokeDasharray="2 4" syncWithTicks />
                <XAxis axisLine={false} tickLine={false} type="number" />
                <YAxis axisLine={false} dataKey="name" tick={<Tick />} tickLine={false} type="category" />

                <Bar
                  dataKey="total"
                  barSize={8} shape={(props) => {
                    const { x, y, width, height, payload } = props;
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={payload.color}
                      />
                    );
                  }}
                  label={renderCustomBarLabel}
                />

                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend data={uniqueData} />
        </Stack>

      </CardContent>
    </Card>
  );
}

function Tick({ height, payload, width, x, y }) {
  const name = payload?.value ?? "Unknown";
  const adjustedX = Math.max(x - 150, 0);

  return (
    <foreignObject height={width} width={150} x={adjustedX} y={(y - 10)}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'end' }}>

        <Typography noWrap color="text.secondary" variant="inherit" sx={{ fontSize: "12px" }}>
          {name}
        </Typography>
      </Stack>
    </foreignObject>
  );
}

function Legend({ data }) {
  return (
    <Grid container spacing={1} paddingTop={2}>
      {data.map((bar) => (
        <Grid key={bar.campaign} item size={{ xs: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '8px', width: '16px' }} />
            <Typography color="text.secondary" variant="caption">
              {bar.campaign}
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
      <Stack >
        {payload?.map((entry) => (
          <Stack direction="column" key={entry.name} spacing={1} >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.color, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography color="text.secondary" variant="h6">{entry.payload.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Campaign: {entry.payload.campaign}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Sum: {entry.payload.sum}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Total: {entry.payload.total}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}


const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text
    x={x + width + 5}
    y={y + 12}
    fill="#666"
    textAnchor="start"
    dy={-4}
    style={{ fontSize: '12px', fontWeight: 'bold' }}
  >
    {value}
  </text>

};