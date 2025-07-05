import { Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { SectionLoader } from '/src/components/loaders/section-loader';
import { TabContainer } from '/src/components/tabs/tab-container';

import { CampaignTabCard } from '../_components/campaign-tab-card';
import { getCampaignStatusListAsync } from '../_lib/campaign.actions';
// import { getCampainStatusListAsync } from '../_lib/campaign.actions';
import { useCampaignList } from '../../../../services/useCampaignList';

export const CampaignTabView = () => {
  const [statusTabs, setStatusTabs] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Use the campaign list hook
  const {
    data: campaigns,
    isLoading: isCampaignsLoading,
    isLoadingMore,
    totalRecords,
    hasMore,
    loadMore,
    refresh,
  } = useCampaignList(selectedStatus);

  // Fetch campaign status tabs on mount
  React.useEffect(() => {
    const fetchStatusTabs = async () => {
      try {
        setLoading(true);
        const res = await getCampaignStatusListAsync();
        if (!res.success) return;

        const tabs = res.data.flatMap((obj) =>
          Object.entries(obj).map(([key, count]) => ({
            label: key ? `${key.replace(/_/g, ' ')} (${count})` : `Others (${count})`,
            value: key,
            count,
          }))
        );

        setStatusTabs(tabs);
        setSelectedStatus(tabs[0]?.value || '');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusTabs();
  }, []);

  // Reset and refresh when tab changes
  const handleTabChange = (_, index) => {
    const status = statusTabs[index]?.value;
    if (status !== selectedStatus) {
      setSelectedStatus(status);
      refresh(); // Use the refresh function from hook
    }
  };

  return (
    <>
      <TabContainer
        tabs={statusTabs.map((t) => t.label)}
        value={statusTabs.findIndex((t) => t.value === selectedStatus)}
        onTabChange={handleTabChange}
      />

      <Box>
        <SectionLoader loading={loading} height="350px">
          {campaigns?.length > 0 && (
            <Grid container spacing={0.5} mt={1}>
              {campaigns?.map((campaign) => (
                <Grid key={campaign.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <CampaignTabCard
                    campaign={campaign}
                    campaigns={campaigns}
                    setCampaigns={refresh} // Use refresh to update after changes
                    statusTabs={statusTabs}
                    setStatusTabs={setStatusTabs}
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
          )}

          {!isCampaignsLoading && campaigns?.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>No campaigns found.</Box>
          )}
        </SectionLoader>
      </Box>
    </>
  );
};
