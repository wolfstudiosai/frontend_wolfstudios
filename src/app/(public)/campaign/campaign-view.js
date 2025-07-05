'use client';

import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignRightPanel } from './_components/campaign-right-panel';
import { CampaignTabView } from './_components/campaign-tab-view';
import { getCampaignGroupListAsync } from './_lib/campaign.actions';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';

export const CampaignView = () => {
  const observerRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [openPanel, setOpenPanel] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const fetchList = React.useCallback(async () => {
    if (isFetching) return;
    setLoading(true);

    try {
      const response = await getCampaignGroupListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, [isFetching, pagination]);

  const refetchList = React.useCallback(async () => {
    if (isFetching) return;
    setLoading(true);

    try {
      const response = await getCampaignGroupListAsync({
        page: 1,
        rowsPerPage: 10,
      });

      if (response.success) {
        setData(response.data);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: 1 }));
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, [isFetching]);

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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data.length < totalRecords) {
          fetchList();
        }
      },
      { rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, fetchList, isFetching, totalRecords]);

  return (
    <PageContainer>
      <Box>
        <PageHeader
          title="Campaigns"
          values={filters}
          tags={campaignTags}
          filters={campaignFilters}
          sorting={campaignSorting}
          onFilterChange={handleFilterChange}
          showFilters={false}
          showColSlider={false}
          totalRecords={totalRecords}
          setOpenPanel={setOpenPanel}
        />
        {filters.VIEW === 'grid' ? (
          <Box>
            <CampaignGridView loading={loading} data={data} fetchList={refreshListView} />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        ) : (
          <Box>
            <CampaignTabView data={data} />
          </Box>
        )}
      </Box>

      {openPanel && (
        <CampaignRightPanel
          onClose={() => {
            setSelectedItemId(null);
            setOpenPanel(false);
          }}
          fetchList={refetchList}
          id={selectedItemId}
          open={openPanel}
          view="ADD"
        />
      )}
    </PageContainer>
  );
};
