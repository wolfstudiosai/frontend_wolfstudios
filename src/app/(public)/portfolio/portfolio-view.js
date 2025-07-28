'use client';

import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useCallback } from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { paths } from '../../../paths';
import { usePortfolioList } from '../../../services/portfolio/usePortfolioList';
import { PortfolioGridView } from './_components/portfolio-gridview';
import { PortfolioRightPanel } from './_components/portfolio-right-panel';
import { useSettings } from '/src/hooks/use-settings';

export const PortfolioView = () => {
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

  const {
    data,
    isLoading,
    isLoadingMore,
    error,
    totalRecords,
    hasMore,
    loadMore,
  } = usePortfolioList();

  const observerRef = useRef(null);
  const bottomRef = useRef(null);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Portfolio', href: '' },
    ]);
  }, []);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  useEffect(() => {
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
        title="Portfolio"
        values={filters}
        onFilterChange={handleFilterChange}
        showFilters={false}
        showColSlider={false}
        totalRecords={totalRecords}
        showAdd={true}
        setOpenPanel={setOpenPanel}
      />

      <Box>
        <PortfolioGridView data={data} loading={isLoading} />

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

      {openPanel && (
        <PortfolioRightPanel
          onClose={() => setOpenPanel(false)}
          open={openPanel}
          id={null}
          view="ADD"
        />
      )}
    </PageContainer>
  );
};
