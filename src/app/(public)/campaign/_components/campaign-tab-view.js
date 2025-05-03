import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, CircularProgress } from '@mui/material';

import { SectionLoader } from '/src/components/loaders/section-loader';
import { TabContainer } from '/src/components/tabs/tab-container';
import { CampaignTabCard } from '../_components/campaign-tab-card';
import { getCampaignGroupListAsync, getCampainStatusListAsync } from '../_lib/campaign.actions';

export const CampaignTabView = ({ fetchList, loading }) => {
  const [statusTabs, setStatusTabs] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [campaigns, setCampaigns] = React.useState([]);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const observerRef = React.useRef(null);

  // Fetch campaign status tabs on mount
  React.useEffect(() => {
    const fetchStatusTabs = async () => {
      const res = await getCampainStatusListAsync();
      if (!res.success) return;

      const tabs = res.data.flatMap(obj =>
        Object.entries(obj).map(([key, count]) => ({
          label: `${key.replace(/_/g, ' ')} (${count})`,
          value: key,
          count
        }))
      );

      setStatusTabs(tabs);
      setSelectedStatus(tabs[0]?.value || '');
    };

    fetchStatusTabs();
  }, []);

  // Fetch campaign data when selected tab or pagination changes
  const fetchCampaigns = async () => {
    setIsFetching(true);
    const res = await getCampaignGroupListAsync({
      status: selectedStatus,
      page: pagination.pageNo,
      rowsPerPage: pagination.limit,
    });

    if (res.success) {
      setCampaigns(prev =>
        pagination.pageNo === 1 ? res.data : [...prev, ...res.data]
      );
      setTotalRecords(res.totalRecords);
    }

    setIsFetching(false);
  };

  React.useEffect(() => {
    if (!selectedStatus) return;

    fetchCampaigns();
  }, [selectedStatus, pagination.pageNo]);

  // Set up Intersection Observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && campaigns.length < totalRecords) {
          setPagination(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
        }
      },
      { rootMargin: '100px' }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [totalRecords, isFetching]);

  // Reset pagination and data when tab changes
  const handleTabChange = (_, index) => {
    const status = statusTabs[index]?.value;
    if (status !== selectedStatus) {
      setSelectedStatus(status);
      setPagination({ pageNo: 1, limit: 10 });
      setCampaigns([]);
      setTotalRecords(0);
    }
  };


  return (
    <>
      <TabContainer
        tabs={statusTabs.map(t => t.label)}
        value={statusTabs.findIndex(t => t.value === selectedStatus)}
        onTabChange={handleTabChange}
      />

      <Box>
        <SectionLoader loading={loading} height="350px">
          {campaigns?.length > 0 &&
            <Grid container spacing={0.5} mt={1}>
              {campaigns?.map(campaign => (
                <Grid key={campaign.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <CampaignTabCard campaign={campaign} campaigns={campaigns} setCampaigns={setCampaigns} statusTabs={statusTabs} setStatusTabs={setStatusTabs} fetchList={fetchList} />
                </Grid>
              ))}
            </Grid>
          }

          {!isFetching && campaigns?.length === 0 && <Box sx={{ textAlign: 'center', py: 4 }}>
            No campaigns found.
          </Box>}
        </SectionLoader>

        <div ref={observerRef} style={{ height: 10, textAlign: 'center', mt: 1 }}>
          {isFetching && <CircularProgress size={30} />}
        </div>
      </Box>
    </>
  );
};
