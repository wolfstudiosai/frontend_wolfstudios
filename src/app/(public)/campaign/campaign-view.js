'use client';

import React from 'react';
import { Box, Button } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import PageLoader from '../../../components/loaders/PageLoader';
import { useCampaignList } from '../../../services/useCampaignList';
import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignRightPanel } from './_components/campaign-right-panel';
import { CampaignTabView } from './_components/campaign-tab-view';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';

export const CampaignView = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, refresh } = useCampaignList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <PageLoader loading={isLoading} error={error}>
      <PageContainer>
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
          />

          {filters.VIEW === 'grid' ? (
            <Box>
              <CampaignGridView loading={isLoading} data={data} fetchList={refresh} />

              {hasMore && (
                <Box textAlign="center" mt={2}>
                  <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
                    {isLoadingMore ? 'Loading...' : 'Show More'}
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <CampaignTabView data={data} />
            </Box>
          )}
        </Box>

        {openPanel && (
          <CampaignRightPanel
            onClose={() => {
              setSelectedItemId(null);
              setOpenPanel(false);
            }}
            fetchList={refresh}
            id={selectedItemId}
            open={openPanel}
            view="ADD"
          />
        )}
      </PageContainer>
    </PageLoader>
  );
};
