'use client'

import { useState } from 'react';
import { Typography } from '@mui/material'
import { PageContainer } from '/src/components/container/PageContainer'
import { CustomTab } from '../../../components/core/custom-tab';
import { PortfolioListView } from '../../(public)/portfolio/_components/portfolio-listview';
import { ProductionListView } from '../../(public)/production/_components/production-listview';
import { PartnerListView } from '../../(public)/partner/_components/partner-listview';

const tabs = [
    { label: 'Campaign', value: 'campaign' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Production', value: 'production' },
    { label: 'Partner', value: 'partner' },
];

export default function RecordPageView() {
    const [tab, setTab] = useState('campaign');
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <PageContainer>
            <Typography>Record Page View</Typography>
            <CustomTab tabs={tabs} handleChange={handleChange} value={tab} />
            {tab === 'portfolio' && (
                <PortfolioListView />
            )}

            {tab === 'production' && (
                <ProductionListView />
            )}

            {tab === 'partner' && (
                <PartnerListView />
            )}
        </PageContainer>
    )
}