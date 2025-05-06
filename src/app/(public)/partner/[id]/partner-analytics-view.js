'use client';

import React from 'react';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { LeftPartnerAnalytics } from './_components/left-partner-analytics';
import { RightPartnerAnalytics } from './_components/right-partner-analytics';
import { useParams } from 'next/navigation';
import { getPartnerAsync } from '../_lib/partner.actions';
import PageLoader from '/src/components/loaders/PageLoader'

export default function PartnerAnalyticsView() {
    const params = useParams();
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

    console.log(partner);

    return (
        <PageLoader loading={loading}>
            <Grid container spacing={2} sx={{ alignItems: "start" }}>
                <Grid item size={{ xs: 12, md: 3 }}>
                    <Card>
                        <LeftPartnerAnalytics partner={partner} />
                    </Card>
                </Grid>
                <Grid item size={{ xs: 12, md: 9 }}>
                    <RightPartnerAnalytics partner={partner} />
                </Grid>
            </Grid>
        </PageLoader>
    );
};
