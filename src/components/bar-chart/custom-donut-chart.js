'use client'

import { Stack, Box } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { NoSsr } from '/src/components/core/no-ssr';

export function CustomDonutChart({ data, chartHeight = 250 }) {

    return (
        <Stack>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="values"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={20} />
                    </PieChart>
                </ResponsiveContainer>
            </NoSsr>
        </Stack>
    )
}
