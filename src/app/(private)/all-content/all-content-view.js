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

      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <ContentTags showTags={showTags} setShowTags={setShowTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <PageLoader loading={isLoading} error={error}>
          <Box sx={{ flex: 1, overflowX: 'hidden' }}>
            {featuredData?.length > 0 && featuredData[0] !== undefined && (
              <AllContentFeaturedView data={featuredData} />
            )}
            {data?.length > 0 && data[0] !== undefined ? (
              <>
                <AllContentGridView data={data} loading={isLoading} />
                {hasMore && (
                  <Box textAlign="center" mt={2}>
                    <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
                      {isLoadingMore ? 'Loading...' : 'Show More'}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Box textAlign="center" mt={2}>
                <Typography variant="h6">No Contents Found</Typography>
              </Box>
            )}
          </Box>
        </PageLoader>
      </Box>

      {openPanel && (
        <AllContentRightPanel onClose={() => setOpenPanel(false)} id={null} open={openPanel} view="ADD" />
      )}
    </PageContainer>
  );
};
