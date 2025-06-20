'use client';

import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import PageLoader from '/src/components/loaders/PageLoader';

import { PartnerGridView } from './_components/partner-gridview';
import { PartnerListView } from './_components/partner-listview';
import { getPartnerListAsync } from './_lib/partner.actions';
import { defaultPartner } from './_lib/partner.types';

export const PartnerView = () => {
  const observerRef = useRef(null);
  const [data, setData] = React.useState([]);
  const [openPanel, setOpenPanel] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedContent, setSelectedContent] = React.useState(null);
  const [filters, setFilters] = React.useState({
    COL: 3,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const fetchList = React.useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getPartnerListAsync({
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
  }, [isFetching, pagination]);

  const handleFilterChange = (type, value) => {
    if (type === 'ADD') {
      setSelectedContent(value ? defaultPartner : null);
    }
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleContentCreated = () => {
    setFilters(prev => ({ ...prev, ADD: false }));
    refreshListView();
  };

  const refreshListView = async () => {
    const response = await getPartnerListAsync({
      page: 1,
      rowsPerPage: 40,
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
      <PageLoader loading={loading}>
        <PageHeader
          title="Partners"
          values={filters}
          totalRecords={totalRecords}
          onFilterChange={handleFilterChange}
          showFilters={false}
          showColSlider={false}
          setOpenPanel={setOpenPanel}
        />

        {filters.VIEW === 'list' ? (
          <PartnerListView />
        ) : (
          <Box>
            <PartnerGridView data={data || [defaultPartner]} fetchList={refreshListView} loading={loading} />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )}
      </PageLoader>
    </PageContainer>
  );
};
