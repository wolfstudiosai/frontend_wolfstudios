'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { paths } from '../../../paths';
import { useSpaceList } from '../../../services/space/useSpaceList';
import { SpaceRightPanel } from './_components/space-right-panel';
import { SpaceGridView } from './_components/space-gridview';
import { useSettings } from '/src/hooks/use-settings';

export const SpaceView = () => {
  const { setBreadcrumbs } = useSettings();
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

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Spaces', href: '' },
    ]);
  }, []);

  return (
    <PageContainer>
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
        <SpaceGridView data={data} loading={isLoading} />
        {hasMore && (
          <Box textAlign="center" mt={2}>
            <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? 'Loading...' : 'Show More'}
            </Button>
          </Box>
        )}
      </Box>

      {openPanel && (
        <SpaceRightPanel
          onClose={() => setOpenPanel(false)}
          open={openPanel}
          id={null}
          view="ADD"
        />
      )}
    </PageContainer>
  );
};
