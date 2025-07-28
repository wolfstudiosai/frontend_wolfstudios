'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

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
  const observerRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Production', href: '' },
    ]);
  }, []);

  const handleObserver = React.useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  React.useEffect(() => {
    const current = bottomRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '300px',
      threshold: 0,
    });

    observer.observe(current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

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

      <Box>
        <ProductionGridView data={data} loading={isLoading} fetchList={mutate} />
        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <Box ref={bottomRef} sx={{ height: '1px' }} />
        )}

        {isLoadingMore && (
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Loading more...
            </Typography>
          </Box>
        )}
      </Box>

      {openPanel && <ProductionRightPanel id={null} onClose={() => setOpenPanel(false)} open={openPanel} view="ADD" />}
    </PageContainer>
  );
};
