'use client'

import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { PageContainer } from '/src/components/container/PageContainer'
import { CustomTab } from '../../../components/core/custom-tab';
import { PortfolioListView } from '../../(public)/portfolio/_components/portfolio-listview';
import { ProductionListView } from '../../(public)/production/_components/production-listview';
import { PartnerListView } from '../../(public)/partner/_components/partner-listview';
import { CampaignListView } from '../../(public)/campaign/_components/campaign-listview';
import AllContentListView from '../../(private)/all-content/_component/all-content-list-view';
import { useSearchParams, useRouter } from 'next/navigation';

const tabs = [
    { label: 'Campaign', value: 'campaign' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Production', value: 'production' },
    { label: 'Partner', value: 'partner' },
    { label: 'Content', value: 'content' },
];

export default function RecordPageView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [tab, setTab] = useState(searchParams.get('tab') || 'campaign');

    const handleChange = (event, newValue) => {
        setTab(newValue);
        router.push(`?tab=${newValue}`);
    };


    useEffect(() => {
        const tab = searchParams.get('tab');
        if (!tab) {
            setTab('campaign');
            router.push(`?tab=campaign`);
        }
    }, [searchParams]);

    return (
        <PageContainer>
            <Box mb={1}>
                <CustomTab tabs={tabs} handleChange={handleChange} value={tab} />
            </Box>

            {tab === 'campaign' && (
                <CampaignListView />
            )}
            {tab === 'portfolio' && (
                <PortfolioListView />
            )}

            {tab === 'production' && (
                <ProductionListView />
            )}

            {tab === 'partner' && (
                <PartnerListView />
            )}

            {tab === 'content' && (
                <AllContentListView />
            )}
        </PageContainer>
    )
}