import React from 'react';
import Grid from '@mui/material/Grid2';

import PageLoader from '/src/components/loaders/PageLoader';

import { ContentCard } from './content-card';
import { ManageContentRightPanel } from './manage-content-right-panel';

export default function AllContentGridView({ data, loading, columns }) {
  const [openRightPanel, setOpenRightPanel] = React.useState(null);
  return (
    <PageLoader loading={loading} error={null}>
      <Grid container spacing={0.5} columns={{ xs: 24 }}>
        {data?.map((content) => (
          <Grid key={content.id} size={{ xs: 12, md: columns }}>
            <ContentCard content={content} handleOpenRightPanel={setOpenRightPanel} />
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
}
