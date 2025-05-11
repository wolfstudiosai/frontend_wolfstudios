'use client';

import { useParams } from 'next/navigation';
import { getContentAsync } from '../_lib/all-content.actions';
import React from 'react';
import PageLoader from '/src/components/loaders/PageLoader'
import Grid2 from '@mui/material/Grid2';
import ContentOverview from './_components/content-overview';
import SocialMediaChart from './_components/social-media-chart';
import PlatformPerformance from './_components/platform-performance';
import ContentInfo from './_components/content-info';
import PlatformStatus from './_components/platform-status';
import PartnerYoutube from './_components/partner-youtube';
import RevoYoutube from './_components/revo-youtube';
import PartnerInstagram from './_components/partner-instagram';
import RevoInstagram from './_components/revo-instagram';
import PartnerTiktok from './_components/partner-tiktok';
import RevoTiktok from './_components/revo-tiktok';

export default function ContentAnalyticsView() {
    const params = useParams();
    const [loading, setLoading] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);
    const [content, setContent] = React.useState({});

    const fetchContent = React.useCallback(async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const response = await getContentAsync(params.id);

            if (response.success) {
                setContent(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    }, [params.id]);

    React.useEffect(() => {
        fetchContent();
    }, []);

    return (
        <PageLoader loading={loading}>
            <Grid2 container spacing={1} sx={{ pb: 2 }}>
                <ContentOverview content={content} />
                <SocialMediaChart content={content} />
                <PlatformPerformance content={content} />
                <ContentInfo content={content} />
                <PlatformStatus content={content} />
                <PartnerYoutube content={content} />
                <RevoYoutube content={content} />
                <PartnerInstagram content={content} />
                <RevoInstagram content={content} />
                <PartnerTiktok content={content} />
                <RevoTiktok content={content} />
            </Grid2>
        </PageLoader>
    );
}