'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import PageLoader from '../../../components/loaders/PageLoader';
import { paths } from '../../../paths';
import { useCampaignList } from '../../../services/campaign/useCampaignList';
import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignRightPanel } from './_components/campaign-right-panel';
import { CampaignTabView } from './_components/campaign-tab-view';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';
import { useSettings } from '/src/hooks/use-settings';
import { Typography } from '@mui/material';

export const CampaignView = () => {
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

  const observerRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore } = useCampaignList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Campaign', href: '' },
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
      <PageLoader loading={isLoading} error={error}>
        <Box>
          <PageHeader
            title="Campaigns"
            values={filters}
            tags={campaignTags}
            filters={campaignFilters}
            sorting={campaignSorting}
            onFilterChange={handleFilterChange}
            showFilters={false}
            showColSlider={false}
            totalRecords={totalRecords}
            setOpenPanel={setOpenPanel}
            view={true}
          />

          {filters.VIEW === 'grid' ? (
            <Box>
              <CampaignGridView data={data} loading={isLoading} />

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
          ) : (
            <Box>
              <CampaignTabView />
            </Box>
          )}
        </Box>

        {openPanel && (
          <CampaignRightPanel
            onClose={() => setOpenPanel(false)}
            open={openPanel}
            id={null}
            view={'ADD'}
          />
        )}
      </PageLoader>
    </PageContainer>
  );
};
