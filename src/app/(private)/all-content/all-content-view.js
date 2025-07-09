'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import { paths } from '../../../paths';
import { useContentList } from '../../../services/content/useContentList';
import AllContentGridView from './_component/all-content-grid-view';
import { ManageContentRightPanel } from './_component/manage-content-right-panel';
import { defaultContent } from './_lib/all-content.types';

export const AllContentView = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
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
        setOpenPanel={setOpenPanel}
      />

      <>
        <AllContentGridView data={data} loading={isLoading} fetchList={mutate} />
        {hasMore && (
          <Box textAlign="center" mt={2}>
            <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? 'Loading...' : 'Show More'}
            </Button>
          </Box>
        )}
      </>

      <ManageContentRightPanel
        fetchList={mutate}
        onClose={() => {
          setOpenPanel(false);
        }}
        open={openPanel}
        data={defaultContent()}
        view="ADD"
      />
    </PageContainer>
  );
};
