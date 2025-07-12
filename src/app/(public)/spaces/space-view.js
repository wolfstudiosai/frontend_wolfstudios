'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import { paths } from '../../../paths';
import { useSpaceList } from '../../../services/space/useSpaceList';
import { ManageSpaceRightPanel } from './_components/manage-space-right-panel';
import { SpaceGridView } from './_components/space-gridview';

export const SpaceView = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [filters, setFilters] = React.useState({
    COL: 4.5,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = useSpaceList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <PageContainer>
      <CustomBreadcrumbs
        items={[
          { title: 'Dashboard', href: paths.private.overview },
          { title: 'Spaces', href: '' },
        ]}
      />
      <PageHeader
        title="Spaces"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
        showAdd={true}
        setOpenPanel={setOpenPanel}
      />

      <Box>
        <SpaceGridView data={data} loading={isLoading} fetchList={mutate} />
        {hasMore && (
          <Box textAlign="center" mt={2}>
            <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? 'Loading...' : 'Show More'}
            </Button>
          </Box>
        )}
      </Box>

      <ManageSpaceRightPanel
        fetchList={mutate}
        onClose={() => {
          setOpenPanel(false);
        }}
        open={openPanel}
        data={null}
        view="ADD"
      />
    </PageContainer>
  );
};
