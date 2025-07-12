'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import PageLoader from '../../../components/loaders/PageLoader';
import { paths } from '../../../paths';
import { useCampaignList } from '../../../services/campaign/useCampaignList';
import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignRightPanel } from './_components/campaign-right-panel';
import { CampaignTabView } from './_components/campaign-tab-view';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';
import { defaultCampaign } from './_lib/campaign.types';

export const CampaignView = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = useCampaignList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <PageContainer>
      <PageLoader loading={isLoading} error={error}>
        <CustomBreadcrumbs
          items={[
            { title: 'Dashboard', href: paths.private.overview },
            { title: 'Campaign', href: '' },
          ]}
        />
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
              <CampaignGridView data={data} fetchList={mutate} />

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
              <CampaignTabView />
            </Box>
          )}
        </Box>

        {openPanel && (
          <CampaignRightPanel
            fetchList={mutate}
            onClose={() => {
              setOpenPanel(false);
            }}
            open={openPanel}
            data={defaultCampaign()}
            view="ADD"
          />
        )}
      </PageLoader>
    </PageContainer>
  );
};
