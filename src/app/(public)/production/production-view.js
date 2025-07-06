'use client';

import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import PageLoader from '/src/components/loaders/PageLoader';

import { ManageProductionRightPanel } from './_components/manage-production-right-panel';
import { ProductionGridView } from './_components/production-gridview';
import { ProductionListView } from './_components/production-listview';
import { productionFilters, productionSorting, productionTags } from './_lib/constant';
import { getProductionListAsync } from './_lib/production.action';
import { defaultProduction } from './_lib/production.types';
import { sliderToGridColsCoverter } from '/src/utils/helper';
import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import { paths } from '../../../paths';

export const ProductionView = () => {
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
      const response = await getProductionListAsync({
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
    const response = await getProductionListAsync({
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
        <CustomBreadcrumbs
          items={[
            { title: 'Dashboard', href: paths.private.overview },
            { title: 'Production', href: '' },
          ]}
        />
        <PageHeader
          title="Production"
          values={filters}
          tags={productionTags}
          filters={productionFilters}
          sorting={productionSorting}
          totalRecords={totalRecords}
          onFilterChange={handleFilterChange}
        />
        {filters.VIEW === 'list' ? (
          <ProductionListView totalRecords1={totalRecords} fetchList1={fetchList} data={data} loading1={loading} />
        ) : (
          <Box>
            <ProductionGridView
              data={data || [defaultProduction]}
              fetchList={refreshListView}
              loading={loading}
              colums={sliderToGridColsCoverter(filters.COL)}
            />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )}
        {/* <ManageProductionRightPanel
          view="EDIT"
          width="70%"
          data={null}
          fetchList={refreshListView}
          open={filters.ADD}
          onClose={() => setFilters((prev) => ({ ...prev, ADD: false }))}
        /> */}
      </PageLoader>
    </PageContainer>
  );
};
