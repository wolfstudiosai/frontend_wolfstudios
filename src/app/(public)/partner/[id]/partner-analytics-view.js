'use client';

import React from 'react';
import Grid from '@mui/material/Grid2';

import { RightPartnerAnalytics } from './_components/right-partner-analytics';
import { LeftPartnerAnalytics } from './_components/left-partner-analytics';
import { useParams } from 'next/navigation';
import { getPartnerAsync } from '../_lib/partner.actions';
import PageLoader from '/src/components/loaders/PageLoader'
import { useSettings } from '/src/hooks/use-settings';

export default function PartnerAnalyticsView() {
    const params = useParams();
    const { isFeaturedCardVisible } = useSettings();
    const [loading, setLoading] = React.useState(true);
    const [isFetching, setIsFetching] = React.useState(false);
    const [partner, setPartner] = React.useState({});

    const fetchPartner = React.useCallback(async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const response = await getPartnerAsync(params.id);

            if (response.success) {
                setPartner(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    }, [isFetching]);

    React.useEffect(() => {
        fetchPartner();
    }, []);


    return (
        <PageLoader loading={loading}>
            <Grid container spacing={1} sx={{
                pb: 2,
                alignItems: "start",
                height: isFeaturedCardVisible ? "calc(100vh - 78px)" : "calc(100vh - 62px)",
                overflow: "auto",
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                <Grid item size={{ xs: 12, md: 3 }} sx={{ position: { xs: 'static', md: 'sticky' }, top: 0, zIndex: 1 }}>
                    <LeftPartnerAnalytics partner={partner} />
                </Grid>
                <Grid item size={{ xs: 12, md: 9 }}>
                    <RightPartnerAnalytics partner={partner} />
                </Grid>
            </Grid>
        </PageLoader>
    );
};
