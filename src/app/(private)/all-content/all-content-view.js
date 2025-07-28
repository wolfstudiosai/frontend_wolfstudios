'use client';

import React from 'react';
import { Box, Button } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { paths } from '../../../paths';
import { useContentList } from '../../../services/content/useContentList';
import AllContentGridView from './_component/all-content-grid-view';
import { AllContentRightPanel } from './_component/all-content-right-panel';
import ContentTags from './_component/content-tags';
import PageLoader from '/src/components/loaders/PageLoader';
import { Typography } from '@mui/material';
import AllContentFeaturedView from './_component/all-content-featured-view';
import { useSettings } from '/src/hooks/use-settings';
import FeaturedSkeleton from './_component/featured-content-skelton';

export const AllContentView = () => {
  const { setBreadcrumbs } = useSettings();
  const [selectedTag, setSelectedTag] = React.useState([]);
  const [showTags, setShowTags] = React.useState(false);
  const [openPanel, setOpenPanel] = React.useState(false);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore } = useContentList('', selectedTag);
  const { data: featuredData, isLoading: featuredLoading } = useContentList('featured');

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'All Content', href: paths.private.all_content },
    ]);
  }, []);

  return (
    <PageContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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

        <Button variant="contained" size="small" sx={{ display: { lg: 'none' } }} onClick={() => setShowTags(true)}>Tags</Button>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: 2,
        height: {
          xs: '100%',
          lg: 'calc(100vh - 170px)',
        },
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <ContentTags showTags={showTags} setShowTags={setShowTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {featuredLoading ? (
            <FeaturedSkeleton />
          ) : featuredData?.length > 0 && featuredData[0] !== undefined && (
            <AllContentFeaturedView loading={featuredLoading} data={featuredData} />
          )}

          <PageLoader loading={isLoading} error={error}>
            {data?.length > 0 && data[0] !== undefined ? (
              <>
                <AllContentGridView data={data} loading={isLoading} />
                {hasMore && (
                  <Box textAlign="center">
                    <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
                      {isLoadingMore ? 'Loading...' : 'Show More'}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Box textAlign="center">
                <Typography variant="h6">No Contents Found</Typography>
              </Box>
            )}
          </PageLoader>

        </Box>
      </Box>

      {openPanel && (
        <AllContentRightPanel onClose={() => setOpenPanel(false)} id={null} open={openPanel} view="ADD" />
      )}
    </PageContainer>
  );
};
