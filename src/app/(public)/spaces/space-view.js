'use client';

import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import PageLoader from '/src/components/loaders/PageLoader';

import { ManageSpaceRightPanel } from './_components/manage-space-right-panel';
import { SpaceGridView } from './_components/space-gridview';
import { SpaceListView } from './_components/space-listview';
import { spaceFilters, spaceSorting, spaceTags } from './_lib/constant';
import { getSpaceListAsync } from './_lib/space.actions';
import { defaultSpace } from './_lib/space.types';
import { sliderToGridColsCoverter } from '/src/utils/helper';

export const SpaceView = () => {
  const observerRef = useRef(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filters, setFilters] = React.useState({
    COL: 4.5,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  async function fetchList() {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getSpaceListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }

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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const refreshListView = async () => {
    const response = await getSpaceListAsync({
      page: 1,
      rowsPerPage: 20,
    });

    if (response.success) {
      setData(response.data);
      setTotalRecords(response.totalRecords);
    }
  };

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        <PageHeader
          title="Spaces"
          values={filters}
          tags={spaceTags}
          filters={spaceFilters}
          sorting={spaceSorting}
          totalRecords={totalRecords}
          onFilterChange={handleFilterChange}
        />
        {filters.VIEW === 'list' ? (
          <SpaceListView totalRecords={totalRecords} fetchList={fetchList} data={data} loading={loading} />
        ) : (
          <Box>
            <SpaceGridView
              data={data || [defaultSpace]}
              fetchList={refreshListView}
              loading={loading}
              colums={sliderToGridColsCoverter(filters.COL)}
            />

            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )}
        <ManageSpaceRightPanel
          view="EDIT"
          width="70%"
          data={null}
          fetchList={refreshListView}
          open={filters.ADD}
          onClose={() => setFilters((prev) => ({ ...prev, ADD: false }))}
        />
      </PageLoader>
    </PageContainer>
  );
};
