import { Box, Button, CircularProgress } from '@mui/material';
import {Grid2 as Grid} from '@mui/material';
import React from 'react';

import { SectionLoader } from '/src/components/loaders/section-loader';
import { TabContainer } from '/src/components/tabs/tab-container';

import { useCampaignStatusCount } from '../../../../services/campaign/useCampaignStatusCount';
import { useCampaignList } from '../../../../services/campaign/useCampaignList';
import { CampaignTabCard } from '../_components/campaign-tab-card';

export const CampaignTabView = () => {
  const [selectedStatus, setSelectedStatus] = React.useState('ACTIVE');

  const {
    statusTabs,
    isLoading: isStatusLoading,
    error: statusError,
    mutate: refreshStatus,
  } = useCampaignStatusCount();

  const {
    data: campaigns,
    isLoading: isCampaignsLoading,
    isLoadingMore,
    totalRecords,
    hasMore,
    loadMore,
    mutate: refreshCampaigns,
  } = useCampaignList(selectedStatus);

  const handleTabChange = (e, index) => {
    const status = statusTabs[index]?.value;
    if (status !== selectedStatus) {
      setSelectedStatus(status);
      refreshCampaigns();
    }
  };

  const isLoading = isStatusLoading || isCampaignsLoading;

  if (statusError) {
    return <Box sx={{ textAlign: 'center', py: 4 }}>Error loading status tabs: {statusError.message}</Box>;
  }

  return (
    <>
      <TabContainer
        tabs={statusTabs.map((t) => t.label)}
        value={statusTabs.findIndex((t) => t.value === selectedStatus)}
        onTabChange={handleTabChange}
      />

      <Box>
        <SectionLoader loading={isLoading} height="350px">
          {campaigns?.length > 0 ? (
            <Grid container spacing={0.5} mt={1}>
              {campaigns.map((campaign) => (
                <Grid key={campaign.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <CampaignTabCard
                    campaign={campaign}
                    fetchList={refreshCampaigns}
                    // refreshData={() => {
                    //   refreshCampaigns();
                    //   refreshStatus();
                    // }}
                  />
                </Grid>
              ))}

              {hasMore && (
                <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    startIcon={isLoadingMore ? <CircularProgress size={16} /> : null}
                  >
                    {isLoadingMore ? 'Loading...' : 'Show More'}
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              {isCampaignsLoading ? 'Loading campaigns...' : 'No campaigns found'}
            </Box>
          )}
        </SectionLoader>
      </Box>
    </>
  );
};
