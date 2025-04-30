import React from 'react';
import Grid from '@mui/material/Grid2';

import { SectionLoader } from '/src/components/loaders/section-loader';
import { TabContainer } from '/src/components/tabs/tab-container';

import { CampaignTabCard } from '../_components/campaign-tab-card';
import { campaignProgressStatus } from '../_lib/campaign.constants';
import { getCampaignGroupListAsync } from '../_lib/campaign.actions';

export const CampaignTabView = ({ fetchList, loading }) => {
  const [selectedTab, setSelectedTab] = React.useState(campaignProgressStatus[0].value);
  const [filteredData, setFilteredData] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setFilteredData(data.filter((item) => item.CampaignStatus === selectedTab));
  }, [data, selectedTab]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getCampaignGroupListAsync();

      if (response.success) {
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TabContainer
        tabs={campaignProgressStatus.map(
          (tab) => `${tab.label} (${data.filter((item) => item.CampaignStatus === tab.value).length})`
        )}
        value={campaignProgressStatus.findIndex((tab) => tab.value === selectedTab)}
        onTabChange={(e, value) => setSelectedTab(campaignProgressStatus[value].value)}
      />

      <SectionLoader loading={loading} height={'300px'}>
        <Grid container spacing={0.5} mt={1}>
          {filteredData.map((item) => (
            <Grid
              key={item.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 2,
              }}
            >
              <CampaignTabCard campaign={item} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </SectionLoader>
    </>
  );
};
