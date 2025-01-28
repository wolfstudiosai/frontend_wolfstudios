'use client';

import React from 'react';
import Link from 'next/link';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { pxToRem, textShortner } from '@/utils/utils';
import { Box, IconButton, Pagination, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import useAuth from '@/hooks/useAuth';

import { deletePortfolioAsync } from '../_lib/portfolio.actions';
import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioFilter } from './portfolio-filter';

export const PortfolioGridView = ({ data, fetchList, loading, handlePagination }) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* <PortfolioSlider data={data || [defaultPortfolio]} /> */}
      <PageLoader loading={loading} error={null}>
        <PortfolioFilter />
        <Grid container spacing={2}>
          {data.map((portfolio, index) => (
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PortfolioCard portfolio={portfolio} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

const PortfolioCard = ({ portfolio, fetchList }) => {
  const { isLogin } = useAuth();
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);
  const handleDelete = async () => {
    const response = await deletePortfolioAsync([portfolio.id]);
    if (response.success) {
      fetchList();
    }
  };

  return (
    <Box>
      <Paper elevation={1} variant="outlined" sx={{ borderRadius: 1, p: 1, overflow: 'hidden' }}>
        <Box
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${portfolio.thumbnail}`}
          sx={{ height: 200, width: '100%', objectFit: 'cover' }}
        />
        <Box p={2}>
          <Typography variant="cardTitle" sx={{ display: 'block', marginBottom: '8px' }}>
            {portfolio.project_title}
          </Typography>
          <Typography variant="cardSubTitle" sx={{ display: 'block', marginBottom: '8px' }}>
            {textShortner(portfolio.short_description, 80)}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Link
              href={`portfolio/${portfolio.slug}`}
              style={{
                fontSize: '0.9rem',
                color: 'var(--mui-palette-text-secondary)',
                marginRight: pxToRem(5),
              }}
            >
              View Portfolio
            </Link>
            {isLogin && (
              <>
                <IconButton size="small" title="Edit" onClick={() => setOpenPortfolioRightPanel(portfolio)}>
                  <Iconify icon="mynaui:edit-one" />
                </IconButton>
                <DeleteConfirmationPopover title="Delete" onDelete={handleDelete} />
              </>
            )}
          </Stack>
        </Box>
      </Paper>

      <ManagePortfolioRightPanel
        fetchList={fetchList}
        width="50%"
        open={openPortfolioRightPanel ? true : false}
        data={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </Box>
  );
};
