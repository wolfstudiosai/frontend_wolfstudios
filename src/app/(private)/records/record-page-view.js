'use client'

import { useState } from 'react';
import { Typography } from '@mui/material'
import { PageContainer } from '/src/components/container/PageContainer'
import { CustomTab } from '../../../components/core/custom-tab';
import { PortfolioListView } from '../../(public)/portfolio/_components/portfolio-listview';

const tabs = [
    { label: 'Production', value: 'production' },
    { label: 'Partner', value: 'partner' },
    { label: 'Campaign', value: 'campaign' },
    { label: 'Portfolio', value: 'portfolio' },
];

export default function RecordPageView() {
    const [tab, setTab] = useState('production');
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <PageContainer>
            <Typography>Record Page View</Typography>
            <CustomTab tabs={tabs} handleChange={handleChange} value={tab} />
            {tab === 'portfolio' && (
                <PortfolioListView />
                // <PortfolioRecord />
            )}
            {/* {
                tab === 'production' && (
                    <ProductionRightPanel />
                )
            }
            {
                tab === 'partner' && (
                    <PartnerRightPanel />
                )
            }
            {
                tab === 'campaign' && (
                    <CampaignRightPanel />
                )
            } */}
        </PageContainer>
    )
}