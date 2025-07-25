'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { paths } from '../../../paths';
import { usePartnerList } from '../../../services/partner/usePartnerList';
import { PartnerGridView } from './_components/partner-gridview';
import { PartnerRightPanel } from './_components/partner-right-panel';
import { useSettings } from '/src/hooks/use-settings';

export const PartnerView = () => {
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

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = usePartnerList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Partner', href: '' },
    ]);
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Partners"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
        showAdd={true}
        setOpenPanel={setOpenPanel}
      />

      <PartnerGridView data={data} loading={isLoading} />
      {hasMore && (
        <Box textAlign="center" mt={2}>
          <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Show More'}
          </Button>
        </Box>
      )}

      {openPanel && (
        <PartnerRightPanel
          onClose={() => setOpenPanel(false)}
          open={openPanel}
          view="ADD"
          id={null}
        />
      )}
    </PageContainer>
  );
};
