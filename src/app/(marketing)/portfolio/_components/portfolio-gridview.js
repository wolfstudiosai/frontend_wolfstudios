'use client';

import React from 'react';
import Link from 'next/link';
import { Iconify } from '@/components/iconify/iconify';
import { pxToRem, textShortner } from '@/utils/utils';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ManagePortfolioRightPanel } from './manage-portfolio-right-panel';
import { PortfolioFilter } from './portfolio-filter';
import PortfolioSlider from './portfolio-slider';

export const PortfolioGridView = ({ data }) => {
  return (
    <Box sx={{ p: 2 }}>
      <PortfolioSlider />
      {/* <Typography
        gutterBottom
        sx={{
          fontWeight: 300,
          fontSize: {
            xs: '1.4rem',
            md: '2rem',
            marginTop: '10px',
          },
          lineHeight: 1,
        }}
      >
        PORTFOLIOS
      </Typography> */}
      <PortfolioFilter />
      <Grid container spacing={2}>
        {data.map((portfolio, index) => (
          <Grid item size={{ xs: 12, md: 3 }} key={index}>
            <PortfolioCard portfolio={portfolio} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const PortfolioCard = ({ portfolio }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = React.useState(null);

  return (
    <Box>
      <Paper elevation={1} variant="outlined">
        <Box component="img" src={portfolio.thumbnail} sx={{ height: 200, width: '100%', objectFit: 'cover' }} />
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
            <IconButton size="small" title="Edit" onClick={() => setOpenPortfolioRightPanel(portfolio)}>
              <Iconify icon="mynaui:edit-one" />
            </IconButton>
            <IconButton color="error" size="small" title="Delete" onClick={() => setOpenPortfolioRightPanel(portfolio)}>
              <Iconify icon="ic:baseline-delete" />
            </IconButton>
          </Stack>
        </Box>
      </Paper>

      <ManagePortfolioRightPanel
        id={''}
        open={openPortfolioRightPanel ? true : false}
        data={openPortfolioRightPanel}
        onClose={() => setOpenPortfolioRightPanel(false)}
      />
    </Box>
  );
};
