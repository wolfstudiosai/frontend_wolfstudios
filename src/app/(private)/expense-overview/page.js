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
} from "@mui/material";

const PLATFORMS = [
    "TikTok Shop",
    "Amazon",
    "Meta Shop",
    "IG Shop",
    "Google Shop",
    "Shopify",
    "Levanta",
    "Impact",
    "Social Snowball",
    "Vibe.co",
    "Pinterest Shop",
];

const generateSampleData = (range) =>
    PLATFORMS.map((platform) => ({
        name: platform,
        earnings: Math.floor(Math.random() * range.earningsMax) + range.earningsMin,
        expenses: Math.floor(Math.random() * range.expensesMax) + range.expensesMin,
        roi: Number((Math.random() * range.roiMax + range.roiMin).toFixed(1)),
    }));

const data7Days = generateSampleData({
    earningsMin: 500,
    earningsMax: 2000,
    expensesMin: 300,
    expensesMax: 1200,
    roiMin: 5,
    roiMax: 15,
});

const data15Days = generateSampleData({
    earningsMin: 1000,
    earningsMax: 4000,
    expensesMin: 800,
    expensesMax: 2500,
    roiMin: 8,
    roiMax: 20,
});

const data30Days = generateSampleData({
    earningsMin: 2000,
    earningsMax: 7000,
    expensesMin: 1500,
    expensesMax: 4500,
    roiMin: 10,
    roiMax: 25,
});

const data90Days = generateSampleData({
    earningsMin: 5000,
    earningsMax: 20000,
    expensesMin: 3000,
    expensesMax: 12000,
    roiMin: 12,
    roiMax: 30,
});

export default function ExpenseOverview() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [filter, setFilter] = useState("7days");

    const data =
        filter === "7days"
            ? data7Days
            : filter === "15days"
                ? data15Days
                : filter === "30days"
                    ? data30Days
                    : data90Days;

    // Theme colors
    const textColor = isDark ? "#E0E0E0" : "#1a1a1a";
    const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)";
    const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
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
                    width: 240,
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
                        onChange={(e) => setFilter(e.target.value)}
                        sx={{
                            background: isDark ? "#1f1f1f" : "#fff",
                            color: textColor,
                        }}
                    >
                        <MenuItem value="7days">Last 7 Days</MenuItem>
                        <MenuItem value="15days">Last 15 Days</MenuItem>
                        <MenuItem value="30days">Last 30 Days</MenuItem>
                        <MenuItem value="90days">Last 90 Days</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Paper
                elevation={8}
                sx={{
                    width: "100%",
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
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: textColor,
                        letterSpacing: 0.5,
                    }}
                >
                    Earnings, Expenses & ROI by Platform
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
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                            />
                            <YAxis
                                yAxisId="left"
                                stroke={textColor}
                                tick={{ fill: textColor, fontSize: 13 }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke={textColor}
                                tick={{ fill: textColor, fontSize: 13 }}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: tooltipBg,
                                    borderRadius: 12,
                                    border: `1px solid ${borderColor}`,
                                    color: textColor,
                                }}
                                formatter={(value, name) => {
                                    if (name === "ROI (%)" || name === "roi") {
                                        return [`${value}%`, "ROI (%)"];
                                    }
                                    return [value, name];
                                }}
                            />
                            <Legend
                                margin={{ top: 5 }}
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: 25,
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
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="expenses"
                                name="Expenses"
                                stroke={expensesColor}
                                fill="url(#colorExpenses)"
                                strokeWidth={3}
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="roi"
                                name="ROI (%)"
                                stroke={roiColor}
                                fill="url(#colorROI)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </NoSsr>
            </Paper>
        </Box>
    );
}