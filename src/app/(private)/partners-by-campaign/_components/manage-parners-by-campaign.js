"use client"
import Stack from '@mui/material/Stack';

import { Box } from '@mui/material';
import React from 'react';
import { PartnersByCampaignProfile } from './partners-by-campaign-profile';
import { PartnersByCampaignSideNav } from './side-navbar';

export default function ManagePartnerByCampaign() {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleSelectItem = (item) => {
        setSelectedItem(item);
    }
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
            <PartnersByCampaignSideNav handleSelectItem={handleSelectItem} />
            <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <PartnersByCampaignProfile selectedItem={selectedItem} />
            </Box>
        </Stack>
    );
}
