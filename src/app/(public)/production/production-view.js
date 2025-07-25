'use client';

import React from 'react';
import { Box, Button } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { paths } from '../../../paths';
import { useProductionList } from '../../../services/production/useProductionList';
import { ProductionGridView } from './_components/production-gridview';
import { ProductionRightPanel } from './_components/production-right-panel';
import { useSettings } from '/src/hooks/use-settings';

export const ProductionView = () => {
  const { setBreadcrumbs } = useSettings();
  const [openPanel, setOpenPanel] = React.useState(false);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = useProductionList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Production', href: '' },
    ]);
  }, []);

  return (
    <PageContainer>

      <PageHeader
        title="Production"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
        showAdd={true}
        setOpenPanel={setOpenPanel}
      />

      <ProductionGridView data={data} loading={isLoading} fetchList={mutate} />
      {hasMore && (
        <Box textAlign="center" mt={2}>
          <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Show More'}
          </Button>
        </Box>
      )}

      {openPanel && <ProductionRightPanel id={null} onClose={() => setOpenPanel(false)} open={openPanel} view="ADD" />}
    </PageContainer>
  );
};
