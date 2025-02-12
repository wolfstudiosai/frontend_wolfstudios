'use client';

import { PageContainer } from '@/components/container/PageContainer';
import { PageHeader } from '@/components/core/page-header';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import React from 'react';

import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignTabView } from './_components/campaign-tab-view';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';
import { getCampaignGroupListAsync } from './_lib/campaign.actions';

export const CampaignView = () => {

  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
  });

  async function fetchList() {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getCampaignGroupListAsync({
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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };


  const refreshListView = async () => {
    const response = await getCampaignGroupListAsync({
      page: 1,
      rowsPerPage: 10,
    });

    if (response.success) {
      setData(response.data);
      setTotalRecords(response.totalRecords);
    }
  };

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        <PageHeader
          title="Campaign"
          values={filters}
          tags={campaignTags}
          filters={campaignFilters}
          sorting={campaignSorting}
          onFilterChange={handleFilterChange}
          showFilters={false}
          showColSlider={false}
        />
        {filters.VIEW === 'grid' ? <CampaignGridView data={data} fetchList={refreshListView} /> : <CampaignTabView data={data} />}
      </PageLoader>
    </PageContainer>
  );
};
