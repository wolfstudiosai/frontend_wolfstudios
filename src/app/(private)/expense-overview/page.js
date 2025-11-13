'use client';

import React, { useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import {
    Box,
    Paper,
    Typography,
    NoSsr,
    useTheme,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

// ---- Different data views ----
// ---- Different data views ----
const monthlyData = [
    { name: "Jan", earnings: 4200, expenses: 2800, roi: 11 },
    { name: "Feb", earnings: 4600, expenses: 3000, roi: 12 },
    { name: "Mar", earnings: 5100, expenses: 3200, roi: 14 },
    { name: "Apr", earnings: 4900, expenses: 3500, roi: 13 },
    { name: "May", earnings: 5700, expenses: 3700, roi: 16 },
    { name: "Jun", earnings: 5300, expenses: 4100, roi: 12 },
    { name: "Jul", earnings: 6100, expenses: 3600, roi: 18 },
    { name: "Aug", earnings: 5800, expenses: 3950, roi: 15 },
    { name: "Sep", earnings: 6400, expenses: 4500, roi: 19 },
    { name: "Oct", earnings: 6000, expenses: 4700, roi: 17 },
    { name: "Nov", earnings: 6700, expenses: 4600, roi: 21 },
    { name: "Dec", earnings: 6250, expenses: 4900, roi: 16 },
];

const weeklyData = [
    { name: "Week 1", earnings: 1300, expenses: 950, roi: 8 },
    { name: "Week 2", earnings: 1100, expenses: 870, roi: 6 },
    { name: "Week 3", earnings: 1600, expenses: 1020, roi: 10 },
    { name: "Week 4", earnings: 1400, expenses: 1080, roi: 7 },
    { name: "Week 5", earnings: 1750, expenses: 1150, roi: 11 },
    { name: "Week 6", earnings: 1900, expenses: 1250, roi: 13 },
    { name: "Week 7", earnings: 1650, expenses: 1180, roi: 9 },
    { name: "Week 8", earnings: 2000, expenses: 1320, roi: 12 },
];

const yearlyData = [
    { name: "2020", earnings: 49500, expenses: 33000, roi: 13 },
    { name: "2021", earnings: 52000, expenses: 35500, roi: 14 },
    { name: "2022", earnings: 57500, expenses: 38000, roi: 16 },
    { name: "2023", earnings: 56000, expenses: 39000, roi: 15 },
    { name: "2024", earnings: 61000, expenses: 40500, roi: 17 },
    { name: "2025", earnings: 58500, expenses: 42000, roi: 15 },
];

export default function ExpenseOverview() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [filter, setFilter] = useState("month");

    // dynamically switch dataset
    const data =
        filter === "week"
            ? weeklyData
            : filter === "year"
                ? yearlyData
                : monthlyData;

    const textColor = isDark ? "#E0E0E0" : "#1a1a1a";
    const cardBg = isDark
        ? "rgba(255,255,255,0.06)"
        : "rgba(255,255,255,0.6)";
    const borderColor = isDark
        ? "rgba(255,255,255,0.2)"
        : "rgba(0,0,0,0.1)";
    const tooltipBg = isDark
        ? "rgba(25, 25, 25, 0.6)"
        : "rgba(255, 255, 255, 0.6)";

    const earningsColor = "#9233FF";
    const expensesColor = "#EA5526";
    const roiColor = "#66BB6A";

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 4,
                background: isDark
                    ? "linear-gradient(135deg, #0f0f10 0%, #1a1a1c 100%)"
                    : "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
                transition: "all 0.3s ease",
            }}
        >
            <Box
                sx={{
                    width: 220,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    ml: "auto",
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: textColor, mb: 1 }}
                >
                    Filter:
                </Typography>

                <FormControl fullWidth>
                    <Select
                        value={filter}
                        label="View"
                        onChange={(e) => setFilter(e.target.value)}
                        sx={{
                            background: isDark ? "#1f1f1f" : "#fff",
                            color: textColor,
                        }}
                    >
                        <MenuItem value="week">Weekly</MenuItem>
                        <MenuItem value="month">Monthly</MenuItem>
                        <MenuItem value="year">Yearly</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    gap: 4,
                    p: 4,
                    borderRadius: 0,
                    border: `1px solid ${borderColor}`,
                    background: cardBg,
                    boxShadow: isDark
                        ? "0 8px 32px rgba(0,0,0,0.5)"
                        : "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                }}
            >
                {/* ==== LEFT SIDE (CHART) ==== */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: textColor,
                            letterSpacing: 0.5,
                        }}
                    >
                        Earnings, Expenses & ROI Overview
                    </Typography>

                    <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                        <ResponsiveContainer width="100%" height={380}>
                            <AreaChart
                                data={data}
                                margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
                            >
                                <defs>
                                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={earningsColor} stopOpacity={1} />
                                        <stop offset="100%" stopColor={earningsColor} stopOpacity={0} />
                                    </linearGradient>

                                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={expensesColor} stopOpacity={1} />
                                        <stop offset="100%" stopColor={expensesColor} stopOpacity={0} />
                                    </linearGradient>

                                    <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={roiColor} stopOpacity={1} />
                                        <stop offset="100%" stopColor={roiColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <XAxis
                                    dataKey="name"
                                    stroke={textColor}
                                    tick={{ fill: textColor, fontSize: 13 }}
                                    axisLine={{ strokeOpacity: 0.3 }}
                                />
                                <YAxis
                                    yAxisId="left"
                                    stroke={textColor}
                                    tick={{ fill: textColor, fontSize: 13 }}
                                    axisLine={{ strokeOpacity: 0.3 }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke={textColor}
                                    tick={{ fill: textColor, fontSize: 13 }}
                                    domain={[0, "dataMax + 5"]}
                                    axisLine={{ strokeOpacity: 0.3 }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: tooltipBg,
                                        backdropFilter: "blur(10px) saturate(150%)",
                                        borderRadius: 12,
                                        border: `1px solid ${borderColor}`,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                        color: textColor,
                                    }}
                                    labelStyle={{ color: textColor, fontWeight: 500 }}
                                    itemStyle={{ color: textColor }}
                                />

                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    wrapperStyle={{
                                        paddingTop: 10,
                                        color: textColor,
                                        fontSize: 14,
                                    }}
                                />

                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="earnings"
                                    name="Earnings"
                                    stroke={earningsColor}
                                    fill="url(#colorEarnings)"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={800}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="expenses"
                                    name="Expenses"
                                    stroke={expensesColor}
                                    fill="url(#colorExpenses)"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={800}
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="roi"
                                    name="ROI (%)"
                                    stroke={roiColor}
                                    fill="url(#colorROI)"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={800}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </NoSsr>
                </Box>
            </Paper>
        </Box>
    );
}