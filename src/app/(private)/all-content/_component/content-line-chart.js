import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box } from '@mui/material';
import { useColorScheme } from '@mui/material';

const data = [
    { name: 'Instagram', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Tiktok', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Youtube', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Twitter', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Facebook', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Instagram', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Youtube', uv: 3490, pv: 4300, amt: 2100 },
];

export const ContentLineChart = () => {
    const { mode } = useColorScheme();

    return (
        <Box height={350} width="100%" mt={2}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: mode === 'dark' ? '#1e1e1e' : '#fff' }} />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};
