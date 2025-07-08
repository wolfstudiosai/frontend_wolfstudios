'use client';

import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import { paths } from '../../../paths';
import { useContentList } from '../../../services/content/useContentList';
import AllContentGridView from './_component/all-content-grid-view';
import AllContentListView from './_component/all-content-list-view';
import { ManageContentRightPanel } from './_component/manage-content-right-panel';
import { defaultContent } from './_lib/all-content.types';
import { Box, Button } from '@mui/material';

export const AllContentView = () => {
  const observerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 100 });
  const [openPanel, setOpenPanel] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  // const [totalRecords, setTotalRecords] = React.useState(0);
  // const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = useContentList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <PageContainer>
      <CustomBreadcrumbs
        items={[
          { title: 'Dashboard', href: paths.private.overview },
          { title: 'Content', href: '' },
        ]}
      />
      <PageHeader
        title="Contents"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
        showAdd={true}
      />
      {filters.VIEW === 'grid' ? (
        <>
          <AllContentGridView data={data} loading={loading} fetchList={mutate} />
          {hasMore && (
            <Box textAlign="center" mt={2}>
              <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
                {isLoadingMore ? 'Loading...' : 'Show More'}
              </Button>
            </Box>
          )}
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
        view="ADD"
        width="70%"
        showAdd={false}
        id={selectedItemId}
        data={defaultContent}
        fetchList={mutate}
        open={openPanel}
        onClose={() => {
          setSelectedItemId(null);
          setOpenPanel(false);
        }}
      />
    </PageContainer>
  );
};
