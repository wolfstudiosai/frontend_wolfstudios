'use client'

import { CampaignAssetsDelivered } from "./bar-chart/campaign-assets-deliverd";
import { OnboardingByCreator } from "./bar-chart/onboarding-by-creator";
import { OnboardingByRegion } from "./bar-chart/onboarding-by-region";
import { TopInfluencers } from "./bar-chart/top-influencers";
import { ConversionByContent } from "./bar-chart/conversion-by-content";
import { UserDistribution } from "./bar-chart/user-distribution";
import { useState, useEffect } from "react";
import { api } from '/src/utils/api';
import PageLoader from '/src/components/loaders/PageLoader';



export default function AnalyticsBarCharts() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const onboardingByRegion = data.find(d => d.label === 'Onboarding by Region');
    const campaignAssetsDelivered = data.find(d => d.label === 'Campaign Asset Delivery Trend');
    const onboardingByCreator = data.find(d => d.label === 'Onboarding by Creator Tier');
    const topInfluencers = data.find(d => d.label === 'Top 5 Influencers by Conversions (Levanta)');
    const conversionByContent = data.find(d => d.label === 'Conversions by Content (Levanta)');
    const userDistribution = data.find(d => d.label === 'User Distribution by Partner Category');

    const fetchBarChartData = async () => {
        try {
            const response = await api.get('/analytics/bar-charts');
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarChartData();
    }, []);

    return (
        <PageLoader loading={loading} error={null}>
            <>
                <OnboardingByRegion data={onboardingByRegion} />
                <CampaignAssetsDelivered data={campaignAssetsDelivered} />
                <OnboardingByCreator data={onboardingByCreator} />
                <TopInfluencers data={topInfluencers} />
                <ConversionByContent data={conversionByContent} />
                <UserDistribution data={userDistribution} />
            </>
        </PageLoader>
    );
}