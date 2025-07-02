'use client';

import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import PageLoader from '/src/components/loaders/PageLoader';

import { ManagePortfolioRightPanel } from './_components/manage-portfolio-right-panel';
import { PortfolioGridView } from './_components/portfolio-gridview';
import { PortfolioListView } from './_components/portfolio-listview';
import { portfolioFilters, portfolioSorting, portfolioTags } from './_lib/constants';
import { getPortfolioListAsync } from './_lib/portfolio.actions';
import { defaultPortfolio } from './_lib/portfolio.types';
import { sliderToGridColsCoverter } from '/src/utils/helper';

export const PortfolioView = () => {
  const observerRef = useRef(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
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
      const response = await getPortfolioListAsync({
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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const refreshListView = async () => {
    const response = await getPortfolioListAsync({
      page: 1,
      rowsPerPage: 20,
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
      <PageLoader loading={loading}>
        <PageHeader
          title="Portfolio"
          values={filters}
          tags={portfolioTags}
          filters={portfolioFilters}
          sorting={portfolioSorting}
          totalRecords={totalRecords}
          onFilterChange={handleFilterChange}
          setOpenPanel={setOpenPortfolioRightPanel}
        />

        {/* {filters.VIEW === 'list' ? (
          <PortfolioListView totalRecords={totalRecords} fetchList={fetchList} data={data} loading={loading} />
        ) : (
          <Box>
            <PortfolioGridView
              data={data || [defaultPortfolio]}
              fetchList={refreshListView}
              loading={loading}
              colums={sliderToGridColsCoverter(filters.COL)}
              openPortfolioRightPanel={openPortfolioRightPanel}
              setOpenPortfolioRightPanel={setOpenPortfolioRightPanel}
            />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )} */}
      </PageLoader>

      <ManagePortfolioRightPanel
        view={'EDIT'}
        fetchList={fetchList}
        width="70%"
        open={openPortfolioRightPanel ? true : false}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </PageContainer>
  );
};
