import React from 'react';
import PageLoader from '@/components/loaders/PageLoader';
import Grid from '@mui/material/Grid2';

import { ContentCard } from './content-card';
import { ManagePortfolioRightPanel } from '@/app/(public)/portfolio/_components/manage-portfolio-right-panel';
import { ManageContentRightPanel } from './manage-content-right-panel';

export const AllContentGridView = ({ data, loading, columns }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(null);
  return (
    <PageLoader loading={loading} error={null}>
      <Grid container spacing={2} columns={{ xs: 24 }}>
        {data?.map((content) => (
          <Grid key={content.id} size={{ xs: 12, md: columns }}>
            <ContentCard content={content} handleOpenRightPnale={setOpenRightPanel} />
          </Grid>
        ))}
      </Grid>
      <ManageContentRightPanel
        view={'QUICK'}
        width="70%"
        open={openRightPanel ? true : false}
        data={openRightPanel}
        onClose={() => setOpenRightPanel(false)}
      />
    </PageLoader>
  );
};
