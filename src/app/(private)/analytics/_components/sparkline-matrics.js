'use client'

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid2 as Grid,
    useTheme,
    alpha
} from "@mui/material";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    ResponsiveContainer
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import PageLoader from '/src/components/loaders/PageLoader';
import { api } from '/src/utils/api';
import { formatCompactNumber } from '/src/utils/helper';

const SparklineMetricsCard = ({ title, value, data, percentage }) => {
    const theme = useTheme();
    const isIncrease = percentage >= 0;
    const ChangeIcon = isIncrease ? ArrowUpRight : ArrowDownRight;
    const chartData = data.map((d, i) => ({ value: d, index: i }));

    return (
        <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight={600}>
                        {formatCompactNumber(value)}
                    </Typography>
                    <Box display="flex" alignItems="center" color={isIncrease ? "success.main" : "error.main"}>
                        <ChangeIcon style={{ width: 18, height: 18, marginRight: 4 }} />
                        <Typography variant="body2">{Math.abs(percentage).toFixed(2)}%</Typography>
                    </Box>
                </Box>
                <ResponsiveContainer width="100%" height={50}>
                    {/* <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={theme.palette.primary.main}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart> */}

                    <AreaChart data={chartData}>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#003DF7"
                            fill={alpha("#003DF7", 0.15)}
                            strokeWidth={2}
                            dot={false}
                        />
                    </AreaChart>

                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const SparklineMetricsGrid = () => {
    const [loading, setLoading] = React.useState(true);
    const [sparkLineData, setSparkLineData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/analytics/sparkline-charts`);
                const data = response.data.data;
                setSparkLineData(data);
            } catch (error) {
                console.error('Error fetching sparkline data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    return (
        <PageLoader loading={loading} error={null}>
            <Grid container spacing={1} mb={1}>
                {sparkLineData.map((d) => (
                    <Grid size={{ xs: 6, md: 4, lg: 3, }} key={d.label}>
                        <SparklineMetricsCard
                            title={d.label}
                            value={d.value}
                            data={d.lastSixMonths}
                            percentage={d.percentageChangeFromLastMonth}
                        />
                    </Grid>
                ))}
            </Grid>
        </PageLoader>
    );
};

export default SparklineMetricsGrid;
