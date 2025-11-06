import { NoSsr } from '/src/components/core/no-ssr';
import { Box } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const chartHeight = 300;

const bars = [
  { name: 'This year', dataKey: 'v1', color: 'var(--mui-palette-primary-400)' },
  { name: 'Last year', dataKey: 'v2', color: 'var(--mui-palette-primary-600)' },
];


export const ContentBarChart = () => {
  return (
    <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
      <ResponsiveContainer height={chartHeight}>
        <BarChart barGap={-32} data={[
          { name: 'Jan', v1: 36, v2: 19 },
          { name: 'Feb', v1: 45, v2: 23 },
          { name: 'Mar', v1: 26, v2: 12 },
          { name: 'Apr', v1: 39, v2: 20 },
          { name: 'May', v1: 26, v2: 12 },
          { name: 'Jun', v1: 42, v2: 31 },
          { name: 'Jul', v1: 38, v2: 19 },
          { name: 'Aug', v1: 39, v2: 20 },
          { name: 'Sep', v1: 37, v2: 18 },
          { name: 'Oct', v1: 41, v2: 22 },
          { name: 'Nov', v1: 45, v2: 24 },
          { name: 'Dec', v1: 23, v2: 17 },
        ]} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          {/* <CartesianGrid strokeDasharray="2 4" vertical={false} /> */}
          <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" xAxisId={0} />
          <XAxis axisLine={false} dataKey="name" hide type="category" xAxisId={1} />
          <YAxis axisLine={false} domain={[0, 50]} hide tickCount={6} type="number" />
          {bars.map((bar, index) => (
            <Bar
              animationDuration={300}
              barSize={32}
              dataKey={bar.dataKey}
              fill={bar.color}
              key={bar.name}
              name={bar.name}
              radius={[5, 5, 5, 5]}
              xAxisId={index}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </NoSsr>
  );
};