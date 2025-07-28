'use client';

import { Box, Typography } from '@mui/material';
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
  const observerRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Spaces', href: '' },
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
        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <Box ref={bottomRef} sx={{ height: '1px' }} />
        )}

        {isLoadingMore && !isLoading && (
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Loading more...
            </Typography>
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
