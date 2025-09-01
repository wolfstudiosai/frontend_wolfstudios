'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useSettings } from '/src/hooks/use-settings';
import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';
import PageLoader from '/src/components/loaders/PageLoader';

import { Iconify } from '../../../components/iconify/iconify';
import { paths } from '../../../paths';
import { useContentList } from '../../../services/content/useContentList';
import AllContentFeaturedView from './_component/all-content-featured-view';
import AllContentGridView from './_component/all-content-grid-view';
import { AllContentRightPanel } from './_component/all-content-right-panel';
import ContentTags from './_component/content-tags';
import FeaturedSkeleton from './_component/featured-content-skelton';

const MOCK_DATA = [
  {
    id: 1,
    title: 'Sports Grid',
    description: 'Friday MLB Best Bets & Predictions for Tonights Games',
    icon: 'https://yt3.googleusercontent.com/bMHXmGrmT__If7T5MtiYTFMeYmhzKY-EbZnuLDHXtk3TbgjhtyvUN4ZUYtyC6VQSrapTQT7YE4c=s900-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://yt3.googleusercontent.com/bMHXmGrmT__If7T5MtiYTFMeYmhzKY-EbZnuLDHXtk3TbgjhtyvUN4ZUYtyC6VQSrapTQT7YE4c=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 2,
    title: 'Sports Grid',
    description: 'Friday MLB Best Bets & Predictions for Tonights Games',
    icon: 'https://yt3.googleusercontent.com/bMHXmGrmT__If7T5MtiYTFMeYmhzKY-EbZnuLDHXtk3TbgjhtyvUN4ZUYtyC6VQSrapTQT7YE4c=s900-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://yt3.googleusercontent.com/bMHXmGrmT__If7T5MtiYTFMeYmhzKY-EbZnuLDHXtk3TbgjhtyvUN4ZUYtyC6VQSrapTQT7YE4c=s900-c-k-c0x00ffffff-no-rj',
  },
];

export const AllContentView = () => {
  const theme = useTheme();
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
  const [search, setSearch] = React.useState('');

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore } = useContentList('', selectedTag);

  const { data: featuredData, isLoading: featuredLoading } = useContentList('featured');

  const observerRef = useRef(null);
  const bottomRef = useRef(null);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'All Content', href: paths.private.all_content },
    ]);
  }, []);

  // Infinite Scroll Intersection Observer
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
    const scrollContainer = document.querySelector('[data-scrollable-content]');

    if (!current || !scrollContainer) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: scrollContainer,
      rootMargin: '300px',
      threshold: 0,
    });

    observer.observe(current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  const renderContent = () => (
    <>
      <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Discover any software for any need</Typography>
      <Box sx={{ mb: 1, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.default' }}>
        <TextField
          fullWidth
          placeholder="Find tags..."
          variant="outlined"
          size="small"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch('')} edge="end">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Stack direction="column" gap={2}>
        {MOCK_DATA.map((i, index) => (
          <Stack key={index} direction="row" gap={1} alignItems="flex-start">
            <Box component="img" src={i.icon} alt={i.title} sx={{ width: 30, height: 30, borderRadius: 0.4 }} />
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>{i.title}</Typography>
                <Iconify icon="flowbite:badge-check-solid" />
                <Button variant="outlined" size="small">
                  Follow
                </Button>
              </Stack>
              <Typography sx={{ fontWeight: 500 }}>{i.description}</Typography>
              <Box
                component="img"
                src={i.thumbnail}
                alt={i.title}
                sx={{ width: '100%', height: 150, borderRadius: 0.4, objectFit: 'cover' }}
              />
            </Stack>
            <Stack direction="column" justifyContent="flex-end" sx={{ height: '100%' }}>
              <IconButton size="small">
                <Iconify icon="mdi:heart-outline" />
              </IconButton>
              <IconButton size="small">
                <Iconify icon="material-symbols:bookmark-outline" />
              </IconButton>
              <IconButton size="small">
                <Iconify icon="mdi:forward-outline" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );

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

        <Button variant="contained" size="small" sx={{ display: { lg: 'none' } }} onClick={() => setShowTags(true)}>
          Tags
        </Button>
      </Box>

      <Box
        data-scrollable-content
        sx={{
          display: 'flex',
          gap: 2,
          height: {
            xs: '100%',
            lg: 'calc(100vh - 170px)',
          },
          overflow: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <ContentTags
          showTags={showTags}
          setShowTags={setShowTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />

        {isLargeScreen && (
          <Stack direction="column" gap={1} sx={{ width: '300px' }}>
            {renderContent()}
          </Stack>
        )}

        <Box sx={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {featuredLoading ? (
            <FeaturedSkeleton />
          ) : featuredData?.length > 0 && featuredData[0] !== undefined ? (
            <>
              {!isLargeScreen && (
                <Stack direction="column" gap={1} sx={{ width: '300px' }}>
                  {renderContent()}
                </Stack>
              )}
              <AllContentFeaturedView data={featuredData} />
            </>
          ) : null}

          <PageLoader loading={isLoading} error={error}>
            {data?.length > 0 && data[0] !== undefined ? (
              <>
                <AllContentGridView data={data} />
                {/* Infinite Scroll Trigger Element */}
                {hasMore && <div ref={bottomRef} style={{ height: '1px' }} />}
                {isLoadingMore && (
                  <Typography textAlign="center" variant="body2" color="textSecondary" my={2}>
                    Loading more...
                  </Typography>
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

      {openPanel && <AllContentRightPanel onClose={() => setOpenPanel(false)} id={null} open={openPanel} view="ADD" />}
    </PageContainer>
  );
};
