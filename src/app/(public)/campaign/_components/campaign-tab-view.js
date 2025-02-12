import React from 'react';
import { TabContainer } from '@/components/tabs/tab-container';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CampaignTabCard } from '../_components/campaign-tab-card';
import { getCampaignListAsync } from '../_lib/portfolio.actions';

const tabsArr = [
  { label: 'Gather Rates', value: 'GATHER_RATES' },
  { label: 'Review Rates', value: 'REVIEW_RATES' },
  { label: 'Approved For Campaign', value: 'APPROVED_FOR_CAMPAIGN' },
  { label: 'In Negotiation', value: 'IN_NEGOTIATION' },
  { label: 'Awaiting Shipment', value: 'AWAITING_SHIPMENT' },
  { label: 'Awaiting Deliverables', value: 'AWAITING_DELIVERABLES' },
  { label: 'Content Review', value: 'CONTENT_REVIEW' },
  { label: 'Awaiting Partner Post', value: 'AWAITING_PARTNER_POST' },
  { label: 'Approved For Payment', value: 'APPROVED_FOR_PAYMENT' },
  { label: 'Complete', value: 'COMPLETE' },
  { label: 'Not Approved', value: 'NOT_APPROVED' },
  { label: 'All Partners', value: 'ALL_PARTNERS' },
];

export const CampaignTabView = () => {
  const [selectedTab, setSelectedTab] = React.useState(tabsArr[0].value);
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
        tabs={tabsArr.map((tab) => tab.label)}
        value={tabsArr.findIndex((tab) => tab.value === selectedTab)}
        onTabChange={(e, value) => setSelectedTab(tabsArr[value].value)}
      />

      <Grid container>
        {filteredData.map((item) => (
          <Grid key={item.id} size={{ xs: 6, md: 2 }}>
            <CampaignTabCard campaign={item} options={tabsArr} fetchList={fetchList} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
