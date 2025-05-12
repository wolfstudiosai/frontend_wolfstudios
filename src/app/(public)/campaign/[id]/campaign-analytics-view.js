'use client'

import React from 'react';
import { useParams } from "next/navigation";
import { getCampaignAsync } from '../_lib/campaign.actions';
import PageLoader from '/src/components/loaders/PageLoader'
import Grid from '@mui/material/Grid2';
import CampaignOverview from './_components/campaign-overview';
import FinancialInfo from './_components/financial-info';
import CampaignExpenseChart from './_components/campaign-expense-chart';
import CampaignImageSlider from './_components/campaign-image-slider';
import CampaignAssociations from './_components/campaign-associations';
import CampaignVideos from './_components/campaign-videos';

export default function CampaignAnalyticsView() {
    const params = useParams();
    const [loading, setLoading] = React.useState(true);
    const [isFetching, setIsFetching] = React.useState(false);
    const [campaign, setCampaign] = React.useState({});

    const fetchCampaign = React.useCallback(async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const response = await getCampaignAsync(params.id);

            if (response.success) {
                setCampaign(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    }, [isFetching]);

    React.useEffect(() => {
        fetchCampaign();
    }, []);


    return (
        <PageLoader loading={loading}>
            <Grid container spacing={1} pb={2}>
                <CampaignImageSlider campaign={campaign} />
                <CampaignVideos campaign={campaign} />
                <CampaignOverview campaign={campaign} />
                <CampaignExpenseChart campaign={campaign} />
                <FinancialInfo campaign={campaign} />
                <CampaignAssociations campaign={campaign} />
            </Grid>
        </PageLoader>
    );
}