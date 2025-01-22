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
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const bars = [
  { name: 'Sessions', dataKey: 'v1', color: 'var(--mui-palette-primary-main)' },
  { name: 'Bounce rate', dataKey: 'v2', color: 'var(--mui-palette-primary-100)' },
];

export function NumberOfAssestsByCampaign({ data }) {
  const chartHeight = 370;

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
            <ShareNetworkIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Number of assests by campaign"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={12} data={data} margin={{ top: 0, right: 0, bottom: 70, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis
                  dataKey="campaign"
                  interval={0}
                  tick={{ angle: -45, textAnchor: 'end' }}
                />
                <YAxis />
                <Bar
                  animationDuration={300}
                  barSize={50}
                  radius={[5, 5, 0, 0]}
                  dataKey="no_of_contents"
                  shape={(props) => {
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
                  label={{ position: 'top' }}
                />
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          {/* <Legend /> */}
        </Stack>
      </CardContent>
    </Card>
  );
}

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
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
          <Stack direction="column" key={entry.name} spacing={1} >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.color, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography color="text.secondary" variant="body2">
                Campaign: {entry.payload.campaign}
              </Typography>
            </Stack>

            <Typography color="text.secondary" variant="body2">
              No of contents: {entry.payload.no_of_contents}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
