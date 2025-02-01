'use client';

import React, { useRef } from 'react';
import { PageContainer } from '@/components/container/PageContainer';
import { Iconify } from '@/components/iconify/iconify';
import PageLoader from '@/components/PageLoader/PageLoader';
import { QuickToolbar } from '@/components/toolbar/quick-toolbar';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';

import useAuth from '@/hooks/useAuth';

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
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const { isLogin } = useAuth();
  const observerRef = useRef(null);

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleOpenPortfolioRightPanel = () => {
    setOpenPortfolioRightPanel(true);
  };

  async function fetchList() {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getPortfolioListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchList();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data.length < totalRecords) {
          fetchList();
        }
      },
      { rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, isFetching, totalRecords]);

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        {isLogin && (
          <QuickToolbar closePopover={openPortfolioRightPanel}>
            <Stack direction="column" spacing={3} justifyContent="center" alignItems="center" p={1}>
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
        )}
        {viewMode === 'list' ? (
          <PortfolioListView totalRecords={totalRecords} fetchList={fetchList} data={data} loading={loading} />
        ) : (
          <Box>
            <PortfolioGridView data={data || [defaultPortfolio]} fetchList={fetchList} loading={loading} />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )}

        <ManagePortfolioRightPanel
          view="EDIT"
          width="70%"
          data={null}
          open={openPortfolioRightPanel}
          onClose={() => setOpenPortfolioRightPanel(false)}
        />
      </PageLoader>
    </PageContainer>
  );
};
