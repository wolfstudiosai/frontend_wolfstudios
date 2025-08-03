'use client';

import { useParams } from 'next/navigation';
import Grid from '@mui/material/Grid2';

import { useSettings } from '/src/hooks/use-settings';
import PageLoader from '/src/components/loaders/PageLoader';

import { useGetPartnerData } from '../../../../services/partner/usePartnerData';
import { LeftPartnerAnalytics } from './_components/left-partner-analytics';
import { RightPartnerAnalytics } from './_components/right-partner-analytics';

export const PartnerAnalyticsView = () => {
  const params = useParams();
  const id = params.id;
  const { isFeaturedCardVisible } = useSettings();

  const { data: partnerData, isLoading, mutate } = useGetPartnerData(id);

  return (
    <PageLoader loading={isLoading}>
      <Grid
        container
        spacing={1}
        sx={{
          pb: 2,
          alignItems: 'start',
          height: isFeaturedCardVisible ? 'calc(100vh - 78px)' : 'calc(100vh - 62px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Grid item size={{ xs: 12, md: 3 }} sx={{ position: { xs: 'static', md: 'sticky' }, top: 0, zIndex: 1 }}>
          <LeftPartnerAnalytics partner={partnerData?.data} />
        </Grid>
        <Grid item size={{ xs: 12, md: 9 }}>
          <RightPartnerAnalytics partner={partnerData?.data} />
        </Grid>
      </Grid>
    </PageLoader>
  );
};
