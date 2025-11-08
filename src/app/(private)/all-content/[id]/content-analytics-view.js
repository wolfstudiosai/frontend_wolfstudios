'use client';

import PageLoader from '/src/components/loaders/PageLoader';
import { StatisticsAreaChart } from '/src/components/statistics-area-chart';
import { Grid2 as Grid, Typography, Box, alpha } from '@mui/material';

import { CustomDonutChart } from '/src/components/bar-chart/custom-donut-chart';;
import { ContentBarChart } from './_components/content-bar-chart';
import { AnalyticsBanner } from './_components/analytics-banner';
import { AnalyticsMarquee } from './_components/analytics-marquee';
import { CustomAreaChart } from '/src/components/custom-area-chart';
import { useContentList } from '../../../../services/content/useContentList';
import AllContentFeaturedView from '../_component/all-content-featured-view';
import { NoSsr } from '/src/components/core/no-ssr';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { Iconify } from '/src/components/iconify/iconify';

const statistics = [
    {
        title: "Contents",
        value: "12,845",
        growth: "+6",
        icon: "streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow",
        color: "#01E4CC",
        data: [
            { name: 'Jan', uv: 4200 },
            { name: 'Feb', uv: 5100 },
            { name: 'Mar', uv: 3800 },
            { name: 'Apr', uv: 5400 },
            { name: 'May', uv: 4100 },
            { name: 'Jun', uv: 5900 },
            { name: 'Jul', uv: 4700 },
        ]
    },
    {
        title: "Views",
        value: "58,492",
        growth: "+11",
        icon: "streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow",
        color: "#0061FE",
        data: [
            { name: 'Jan', uv: 9800 },
            { name: 'Feb', uv: 8700 },
            { name: 'Mar', uv: 11200 },
            { name: 'Apr', uv: 9400 },
            { name: 'May', uv: 12500 },
            { name: 'Jun', uv: 10200 },
            { name: 'Jul', uv: 13600 },
        ]
    },
    {
        title: "Engagements",
        value: "9,745",
        growth: "-4",
        icon: "streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow",
        color: "#16A149",
        data: [
            { name: 'Jan', uv: 3100 },
            { name: 'Feb', uv: 2600 },
            { name: 'Mar', uv: 3700 },
            { name: 'Apr', uv: 2200 },
            { name: 'May', uv: 3400 },
            { name: 'Jun', uv: 2800 },
            { name: 'Jul', uv: 2500 },
        ]
    },
    {
        title: "Likes",
        value: "34,211",
        growth: "+9",
        icon: "streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow",
        color: "#FF5B27",
        data: [
            { name: 'Jan', uv: 5200 },
            { name: 'Feb', uv: 6600 },
            { name: 'Mar', uv: 4800 },
            { name: 'Apr', uv: 7000 },
            { name: 'May', uv: 5400 },
            { name: 'Jun', uv: 7500 },
            { name: 'Jul', uv: 6200 },
        ]
    },
    {
        title: "Comments",
        value: "4,678",
        growth: "-6",
        icon: "streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow",
        color: "#6B5B95",
        data: [
            { name: 'Jan', uv: 1200 },
            { name: 'Feb', uv: 800 },
            { name: 'Mar', uv: 1300 },
            { name: 'Apr', uv: 950 },
            { name: 'May', uv: 1400 },
            { name: 'Jun', uv: 870 },
            { name: 'Jul', uv: 1100 },
        ]
    },
];

// Sample Data
const data = [
    { name: 'Jan', uv: 4000, },
    { name: 'Feb', uv: 3000, },
    { name: 'Mar', uv: 2000, },
    { name: 'Apr', uv: 2780, },
    { name: 'May', uv: 1890, },
    { name: 'Jun', uv: 2390, },
    { name: 'Jul', uv: 3490, },
];

const donutData1 = [
    { label: 'Likes', values: 250, color: '#FF6F61' },
    { label: 'Comments', values: 150, color: '#6B5B95' },
    { label: 'Shares', values: 100, color: '#88B04B' },
    { label: 'Views', values: 300, color: '#FFA500' },
    { label: 'Reactions', values: 80, color: '#0096C7' },
    { label: 'Engagements', values: 50, color: '#FFB6C1' },
    { label: 'Clicks', values: 40, color: '#8A2BE2' },
    { label: 'Follows', values: 20, color: '#00FA9A' },
    { label: 'Saves', values: 10, color: '#FFD700' },
];

const donutData2 = [
    { label: 'Subscriptions', values: 180, color: '#FFB347' },
    { label: 'Downloads', values: 120, color: '#B19CD9' },
    { label: 'Feedback', values: 90, color: '#77DD77' },
    { label: 'Page Visits', values: 240, color: '#FDFD96' },
    { label: 'Messages', values: 110, color: '#AEC6CF' },
    { label: 'Reports', values: 70, color: '#FF6961' },
    { label: 'Mentions', values: 50, color: '#C23B22' },
    { label: 'Bookmarks', values: 40, color: '#779ECB' },
    { label: 'Downloads', values: 30, color: '#FFD1DC' },
];

const verticalBarChartData = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 2000 },
    { label: 'Apr', value: 2780 },
    { label: 'May', value: 1890 },
    { label: 'Jun', value: 2390 },
    { label: 'Jul', value: 3490 },
    { label: 'Aug', value: 2780 },
    { label: 'Sep', value: 1890 },
    { label: 'Oct', value: 2390 },
    { label: 'Nov', value: 3490 },
    { label: 'Dec', value: 2780 },
];

const quickStats = [
    { label: 'Likes', value: 250, icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow', color: '#FF6F61' },
    { label: 'Comments', value: 150, icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow', color: '#6B5B95' },
    { label: 'Shares', value: 100, icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow', color: '#88B04B' },
    { label: 'Views', value: 300, icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow', color: '#FFA500' },
];

export default function ContentAnalyticsView() {
    const { data: featuredData, isLoading: featuredLoading } = useContentList('featured');

    return (
        <PageLoader loading={featuredLoading}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <AnalyticsBanner
                    title="Content performance analytics"
                    description="A detailed overview of your performance and analytics."
                />
                <AnalyticsMarquee />
                <AllContentFeaturedView data={[...featuredData, ...featuredData]} />

                <Box>
                    <Typography variant="h5" gutterBottom>Quick Stats</Typography>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, lg: 8 }} sx={{ display: 'flex', gap: 1 }}>
                            {quickStats.map((statistic) => (
                                <Box
                                    key={statistic.label}
                                    flex={1}
                                    border={1}
                                    borderColor="divider"
                                    p={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="column"
                                    gap={1}
                                >
                                    <Box
                                        p={2}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        height={30}
                                        width={30}
                                        bgcolor={alpha(statistic.color, 0.3)}
                                        borderRadius={1}
                                    >
                                        <Iconify
                                            color={statistic.color}
                                            icon={statistic.icon}
                                        />
                                    </Box>
                                    <Typography variant="subtitle2" fontWeight={500} color="text.secondary">{statistic.label}</Typography>
                                    <Typography variant="h4">{statistic.value}</Typography>
                                </Box>
                            ))}
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }} p={2} border={1} borderColor="divider">
                            <Box display="flex" alignItems="start" gap={1}>
                                <Iconify color="#FF6F61" icon="ic:sharp-sports-volleyball" height={28} width={28} />
                                <Box>
                                    <Typography variant="h6">Sports Grid</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Friday MLB Best Bets & Predictions for Tonights Games
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="start" gap={1} mt={2}>
                                <Iconify color="#6B5B95" icon="solar:revote-bold" height={28} width={28} />
                                <Box>
                                    <Typography variant="h6">Revo ROI</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        12.5%
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={1} columns={{ xs: 2, md: 3, lg: 4, xl: 5 }}>
                    {statistics.map((statistic) => (
                        <Grid size={1}>
                            <StatisticsAreaChart
                                data={statistic.data}
                                dataKey="uv"
                                color={statistic.color}
                                icon={statistic.icon}
                                title={statistic.title}
                                value={statistic.value}
                                growth={statistic.growth}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Content Bar Chart</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <CustomDonutChart data={donutData1} chartHeight={280} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Content Bar Chart</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>

                        <Box pr={2}>
                            <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={verticalBarChartData}
                                        layout="vertical"
                                    >
                                        <XAxis type="number" axisLine={false} tickLine={false} />
                                        <YAxis
                                            type="category"
                                            dataKey="label"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Legend />
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#8253F2" stopOpacity={0.2} />
                                                <stop offset="100%" stopColor="#8253F2" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <Bar
                                            dataKey="value"
                                            barSize={20}
                                            fill="url(#barGradient)"
                                            radius={[0, 6, 6, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </NoSsr>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Content Bar Chart</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <CustomDonutChart data={donutData2} chartHeight={280} />
                    </Grid>

                </Grid>

                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Content Bar Chart</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <ContentBarChart />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Content Bar Chart</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <CustomAreaChart data={data} color="#0061FE" />
                    </Grid>
                </Grid>
            </Box>
        </PageLoader>
    );
}
