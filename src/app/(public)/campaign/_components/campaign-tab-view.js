import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SectionLoader } from '/src/components/loaders/section-loader';
import { TabContainer } from '/src/components/tabs/tab-container';

import { CampaignTabCard } from '../_components/campaign-tab-card';
import { useCampaignStatusCount } from '../../../../services/campaign/useCampaignStatusCount';
import { useCampaignList } from '../../../../services/useCampaignList';

export const CampaignTabView = () => {
  const [selectedStatus, setSelectedStatus] = React.useState('');

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
    refresh: refreshCampaigns,
  } = useCampaignList(selectedStatus);

  React.useEffect(() => {
    if (statusTabs.length > 0 && !selectedStatus) {
      setSelectedStatus(statusTabs[0]?.value || '');
    }
  }, [statusTabs, selectedStatus]);

  console.log(statusTabs, 'status tab....');
  const handleTabChange = (_, index) => {
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
        loading={isStatusLoading}
      />

      <Box>
        <SectionLoader loading={isLoading} height="350px">
          {campaigns?.length > 0 ? (
            <Grid container spacing={0.5} mt={1}>
              {campaigns.map((campaign) => (
                <Grid key={campaign.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <CampaignTabCard
                    campaign={campaign}
                    refreshData={() => {
                      refreshCampaigns();
                      refreshStatus();
                    }}
                  />
                </Grid>
              ))}

              {hasMore && (
                <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
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
