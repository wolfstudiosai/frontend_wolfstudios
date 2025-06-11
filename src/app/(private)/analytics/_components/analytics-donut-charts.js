'use client'

import { FunnelDropOff } from './donut-chart/funnel-drop-off';
import { ContentFormatCampaign } from './donut-chart/content-format-campaign';
import { UsersEngagement } from './donut-chart/users-engagement';
import { AssetsStatusOverview } from './donut-chart/assets-status-overview';
import { AudienceDemographics } from './donut-chart/audience-demographics';
import { ClientPlatformUsages } from './donut-chart/client-platform-usages';
import { PartnerPlatformUsages } from './donut-chart/partner-platform-usages';
import { BudgetAllocationCampaign } from './donut-chart/budget-allocation-campaign';
import { CampaignBreakdown } from './donut-chart/campaign-breakdown';
import { useState, useEffect } from 'react';
import { api } from '/src/utils/api';
import PageLoader from '/src/components/loaders/PageLoader';

export default function AnalyticsDonutCharts() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const funnelDropOff = data.find(d => d.label === 'Funnel Drop-off');
    const contentFormatCampaign = data.find(d => d.label === 'Content Type per Campaign');
    const usersEngagement = data.find(d => d.label === 'User Engagement Status');
    const assetsStatusOverview = data.find(d => d.label === 'Asset Status Overview');
    const audienceDemographics = data.find(d => d.label === 'Audience Demographics');
    const clientPlatformUsages = data.find(d => d.label === 'Client Platform Usage');
    const partnerPlatformUsages = data.find(d => d.label === 'Partner Platform Usage');
    const budgetAllocationCampaign = data.find(d => d.label === 'Budget Allocation by Campaign');
    const campaignBreakdown = data.find(d => d.label === 'Campaign Type Breakdown');

    const fetchDonutChartData = async () => {
        try {
            const response = await api.get('/analytics/donut-charts');
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonutChartData();
    }, []);

    return (
        <>
            <PageLoader loading={loading} error={null}>
                <FunnelDropOff data={funnelDropOff} />
                <ContentFormatCampaign data={contentFormatCampaign} />
                <UsersEngagement data={usersEngagement} />
                <AssetsStatusOverview data={assetsStatusOverview} />
                <AudienceDemographics data={audienceDemographics} />
                <ClientPlatformUsages data={clientPlatformUsages} />
                <PartnerPlatformUsages data={partnerPlatformUsages} />
                <BudgetAllocationCampaign data={budgetAllocationCampaign} />
                <CampaignBreakdown data={campaignBreakdown} />
            </PageLoader>
        </>
    );
}