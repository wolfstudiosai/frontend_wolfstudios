'use client';

import { Box, Button } from '@mui/material';
import React from 'react';

import { PageContainer } from '/src/components/container/PageContainer';
import { PageHeader } from '/src/components/core/page-header';

import { CustomBreadcrumbs } from '../../../components/custom-breadcumbs';
import { paths } from '../../../paths';
import { usePortfolioList } from '../../../services/portfolio/usePortfolioList';
import { PortfolioGridView } from './_components/portfolio-gridview';
import { PortfolioRightPanel } from './_components/portfolio-right-panel';
import { defaultPortfolio } from './_lib/portfolio.types';

export const PortfolioView = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [filters, setFilters] = React.useState({
    COL: 4.5,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
    ADD: false,
  });

  const { data, isLoading, isLoadingMore, error, totalRecords, hasMore, loadMore, mutate } = usePortfolioList();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <PageContainer>
      <CustomBreadcrumbs
        items={[
          { title: 'Dashboard', href: paths.private.overview },
          { title: 'Portfolio', href: '' },
        ]}
      />
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
        <PortfolioGridView data={data} loading={isLoading} fetchList={mutate} />
        {hasMore && (
          <Box textAlign="center" mt={2}>
            <Button size="small" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? 'Loading...' : 'Show More'}
            </Button>
          </Box>
        )}
      </Box>

      <PortfolioRightPanel
        fetchList={mutate}
        onClose={() => {
          setOpenPanel(false);
        }}
        open={openPanel}
        data={null}
        view="ADD"
      />
    </PageContainer>
  );
};
