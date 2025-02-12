import React from 'react';
import { TabContainer } from '@/components/tabs/tab-container';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CampaignTabCard } from '../_components/campaign-tab-card';
import { getCampaignListAsync } from '../_lib/campaign.actions';
import { campaignProgressStatus } from '../_lib/campaign.constants';


export const CampaignTabView = () => {
  const [selectedTab, setSelectedTab] = React.useState(campaignProgressStatus[0].value);
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [isFetching, setIsFetching] = React.useState(false);

  async function fetchList() {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getCampaignListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData(response.data);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setFilteredData(data.filter((item) => item.campaign_progress === selectedTab));
  }, [data, selectedTab]);

  React.useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <TabContainer
        tabs={campaignProgressStatus.map((tab) => tab.label)}
        value={campaignProgressStatus.findIndex((tab) => tab.value === selectedTab)}
        onTabChange={(e, value) => setSelectedTab(campaignProgressStatus[value].value)}
      />

      <Grid container>
        {filteredData.map((item) => (
          <Grid key={item.id} size={{ xs: 6, md: 2 }}>
            <CampaignTabCard campaign={item} fetchList={fetchList} />
          </Grid>
        ))}
      </Grid>

      
    </>
  );
};
