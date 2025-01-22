"use client"
import Stack from '@mui/material/Stack';

import { Box } from '@mui/material';
import React from 'react';
import { NeedsApprovalSingleProfile } from './needs-approval-single-profile';
import { NeedOfferApprovalSideNav } from './side-navbar';

export default function ManageOfferApproval() {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleClickNeedsOffer = (item) => {
        setSelectedItem(item);
    }
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
            <NeedOfferApprovalSideNav handleClickNeedsOffer={handleClickNeedsOffer} />
            <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <NeedsApprovalSingleProfile selectedItem={selectedItem} />
            </Box>
        </Stack>
    );
}
