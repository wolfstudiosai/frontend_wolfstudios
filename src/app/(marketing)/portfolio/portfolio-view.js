'use client';

import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { QuickToolbar } from '@/components/toolbar/quick-toolbar';
import { Box, IconButton, Stack } from '@mui/material';

import { ManagePortfolioRightPanel } from './_components/manage-portfolio-right-panel';
import { PortfolioGridView } from './_components/portfolio-gridview';
import { PortfolioListView } from './_components/portfolio-listview';
import { getPortfolioListAsync } from './_lib/portfolio.actions';
import { defaultPortfolio } from './_lib/portfolio.types';

export const PortfolioView = () => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);

  console.log('data', data);

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleOpenPortfolioRightPanel = () => {
    setOpenPortfolioRightPanel(true);
  };

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getPortfolioListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      console.log('response', response);
      if (response.success) {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <QuickToolbar>
        <Stack direction="column" spacing={3} justifyContent={'center'} alignItems={'center'} p={1}>
          <IconButton variant="text" size="small" title="Add " onClick={handleOpenPortfolioRightPanel}>
            <Iconify icon="iconoir:plus" title="Add Portfolio" />
          </IconButton>
          <IconButton
            variant="text"
            size="small"
            title="Card View"
            onClick={() => handleToggleViewMode('grid')}
            sx={{
              backgroundColor: viewMode === 'grid' ? 'action.selected' : 'transparent',
              '&:hover': {
                backgroundColor: viewMode === 'grid' ? 'action.selected' : 'action.hover',
              },
            }}
          >
            <Iconify icon="fluent:grid-16-filled" />
          </IconButton>
          <IconButton
            variant="text"
            size="small"
            title="List View"
            onClick={() => handleToggleViewMode('list')}
            sx={{
              backgroundColor: viewMode === 'list' ? 'action.selected' : 'transparent',
              ':hover': { backgroundColor: viewMode === 'list' ? 'action.selected' : 'action.hover' },
            }}
          >
            <Iconify icon="fluent:list-16-regular" />
          </IconButton>
        </Stack>
      </QuickToolbar>
      {viewMode === 'list' ? (
        <PortfolioListView totalRecords={totalRecords} fetchList={fetchList} data={data} loading={loading} />
      ) : (
        <PortfolioGridView data={data} />
      )}

      <ManagePortfolioRightPanel
        id={''}
        data={null}
        open={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </Box>
  );
};
