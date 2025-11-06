'use client';

import PageLoader from '/src/components/loaders/PageLoader';
import { StatisticsAreaChart } from '/src/components/statistics-area-chart';
import { Grid2 as Grid, Typography, Box } from '@mui/material';

import { CustomDonutChart } from '/src/components/bar-chart/custom-donut-chart';;
import { ContentBarChart } from './_components/content-bar-chart';
import { AnalyticsBanner } from './_components/analytics-banner';
import { AnalyticsMarquee } from './_components/analytics-marquee';
import { CustomAreaChart } from '/src/components/custom-area-chart';

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

const donutData = [
    { label: 'Likes', percent: 25, values: 250, color: '#FF6F61' },
    { label: 'Comments', percent: 15, values: 150, color: '#6B5B95' },
    { label: 'Shares', percent: 10, values: 100, color: '#88B04B' },
    { label: 'Views', percent: 30, values: 300, color: '#FFA500' },
    { label: 'Reactions', percent: 8, values: 80, color: '#0096C7' },
    { label: 'Engagements', percent: 5, values: 50, color: '#FFB6C1' },
    { label: 'Clicks', percent: 4, values: 40, color: '#8A2BE2' },
    { label: 'Follows', percent: 2, values: 20, color: '#00FA9A' },
    { label: 'Saves', percent: 1, values: 10, color: '#FFD700' },
];

const donutData2 = [
    { label: 'Likes', percent: 25, values: 250, color: '#FF6F61' },
    { label: 'Comments', percent: 15, values: 150, color: '#6B5B95' },
    { label: 'Shares', percent: 10, values: 100, color: '#88B04B' },
    { label: 'Views', percent: 30, values: 300, color: '#FFA500' },
    { label: 'Reactions', percent: 8, values: 80, color: '#0096C7' },
    { label: 'Engagements', percent: 5, values: 50, color: '#FFB6C1' },
    { label: 'Clicks', percent: 4, values: 40, color: '#8A2BE2' },
    { label: 'Follows', percent: 2, values: 20, color: '#00FA9A' },
    { label: 'Saves', percent: 1, values: 10, color: '#FFD700' },
];

export default function ContentAnalyticsView() {
    return (
        <PageLoader loading={false}>
            <AnalyticsBanner />
            <AnalyticsMarquee />
            <Grid container spacing={1} mt={1} columns={{ xs: 2, md: 3, lg: 4, xl: 5 }}>
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

            <Grid container spacing={1} mt={1}>
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
                    <CustomDonutChart data={donutData} />
                </Grid>
               
            </Grid>

            <Grid container spacing={1} mt={1}>
                 <Grid size={{ xs: 12, md: 6 }} sx={{ height: 450, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                    <Box p={2}>
                        <Typography variant="h5">Content Bar Chart</Typography>
                         <Typography variant="body1" color="text.secondary">
                             Visual summary of content metrics and campaign insights.
                        </Typography>
                        </Box>
                    <CustomDonutChart data={donutData2} />
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
        </PageLoader>
    );
}
