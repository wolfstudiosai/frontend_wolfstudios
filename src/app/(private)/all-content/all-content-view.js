'use client';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import { sliderToGridColsCoverter } from '/src/utils/helper';
import React from 'react';
import AllContentGridView from './_component/all-content-grid-view';

import { CircularProgress } from '@mui/material';
import AllContentListView from './_component/all-content-list-view';
import { ManageContentRightPanel } from './_component/manage-content-right-panel';
import { getContentList } from './_lib/all-content.actions';

export const AllContentView = () => {
  const observerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 100 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  async function fetchList(paginateData = pagination) {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getContentList({
        page: paginateData.pageNo,
        rowsPerPage: paginateData.limit,
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
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, isFetching, totalRecords]);

  return (
    <PageContainer>
      <PageHeader
        title="Contents"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
      />
      {filters.VIEW === 'grid' ? (
        <>
          <AllContentGridView data={data} loading={loading} columns={sliderToGridColsCoverter(filters.COL)} />
          <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
            {isFetching && <CircularProgress size="30px" />}
          </div>
        </>
      ) : (
        <AllContentListView
          setPagination={setPagination}
          totalRecords={totalRecords}
          data={data}
          setData={setData}
          loading={loading}
          fetchList={fetchList}
        />
      )}
      <ManageContentRightPanel
        view="QUICK"
        width="70%"
        showAdd={false}
        // data={defaultCampaign}
        fetchList={refreshListView}
        open={filters.ADD}
        onClose={() => setFilters((prev) => ({ ...prev, ADD: false }))}
      />
    </PageContainer>
  );
};
