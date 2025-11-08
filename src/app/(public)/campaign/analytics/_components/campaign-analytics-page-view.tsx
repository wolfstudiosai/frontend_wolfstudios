'use client';

import { Box, Grid2 as Grid, Typography } from "@mui/material";
import PageLoader from "../../../../../components/loaders/PageLoader";
import { AnalyticsBanner } from "../../../../(private)/all-content/[id]/_components/analytics-banner";
import { AnalyticsMarquee } from "../../../../(private)/all-content/[id]/_components/analytics-marquee";
import { useCampaignList } from "../../../../../services/campaign/useCampaignList";
import { FeaturedCampaign } from "./featured-campaign";
import { StatisticsAreaChart } from '../../../../../components/statistics-area-chart';
import { NoSsr } from '../../../../../components/core/no-ssr';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { ContentLineChart } from "../../../../(private)/all-content/_component/content-line-chart";

const statistics = [
    {
        title: "Expense",
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
        title: "Revenue",
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
        title: "Profit",
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
        title: "ROI",
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
        title: "CPC",
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

const campaignExpenseByStatus = [
    { label: 'Upcoming', value: 10 },
    { label: 'Onboarding Partners', value: 20 },
    { label: 'Needs Case Study', value: 150 },
    { label: 'Closed', value: 70 },
    { label: 'Archived', value: 120 },
];

const campaignExpenseByGoal = [
    { label: 'Content Generation', value: 10 },
    { label: 'Lead Generation', value: 20 },
    { label: 'Brand Awareness', value: 150 },
    { label: 'Conversions', value: 70 },
    { label: 'Amazon Reviews', value: 120 },
    { label: 'Social Engagement', value: 120 },
];

const campaignExpenseByCategory = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export const CampaignAnalyticsPageView = () => {
    const { data: campaignData, isLoading } = useCampaignList('', 'featured');

    return (
        <PageLoader loading={isLoading}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <AnalyticsBanner
                    title="Campaign performance analytics"
                    description="A detailed overview of your performance and analytics."
                />
                <AnalyticsMarquee />
                <FeaturedCampaign data={campaignData} />

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
                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 400, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Campaigns Expense by Category</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <ContentLineChart />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 400, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Campaigns Expense by Golas</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>

                        <Box pr={3}>
                            <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        barGap={4}
                                        data={campaignExpenseByGoal}
                                        layout="vertical"
                                        margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                                    >
                                        <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 4" />
                                        <XAxis type="number" axisLine={false} tickLine={false} />
                                        <YAxis
                                            type="category"
                                            dataKey="label"
                                            axisLine={false}
                                            tickLine={false}
                                            width={130}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip animationDuration={50} cursor={false} />
                                        <Legend />
                                        <Bar
                                            dataKey="value"
                                            barSize={25}
                                            fill="#455de6ff"
                                            radius={[0, 6, 6, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </NoSsr>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 400, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Campaigns Expense by Status</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>

                        <Box pr={3}>
                            <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        barGap={4}
                                        data={campaignExpenseByStatus}
                                        layout="vertical"
                                        margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                                    >
                                        <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 4" />
                                        <XAxis type="number" axisLine={false} tickLine={false} />
                                        <YAxis
                                            type="category"
                                            dataKey="label"
                                            axisLine={false}
                                            tickLine={false}
                                            width={130}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip animationDuration={50} cursor={false} />
                                        <Legend />
                                        <Bar
                                            dataKey="value"
                                            barSize={25}
                                            fill="#455de6ff"
                                            radius={[0, 6, 6, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </NoSsr>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ height: 400, borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                        <Box p={2}>
                            <Typography variant="h5">Campaigns Expense by Category</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Visual summary of content metrics and campaign insights.
                            </Typography>
                        </Box>
                        <NoSsr fallback={<Box sx={{ height: 300 }} />}>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                                    data={campaignExpenseByCategory}
                                    margin={{
                                        top: 20,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#FF5B27" fill="#FF5B27" fillOpacity={0.5} />
                                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#0061FE" fill="#0061FE" fillOpacity={0.5} />
                                    <Area type="monotone" dataKey="amt" stackId="1" stroke="#6B5B95" fill="#6B5B95" fillOpacity={0.5} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </NoSsr>
                    </Grid>
                </Grid>
            </Box>
        </PageLoader>
    );
}