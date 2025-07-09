import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import React from 'react';

import { IconWithText } from '/src/components/utils/icon-text';

import { ManageContentRightPanel } from './manage-content-right-panel';

export const ContentCard = ({ content, fetchList }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(null);
  return (
    <>
      <Card
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          borderRadius: '0',
        }}
        onClick={() => setOpenRightPanel(content)}
      >
        <Box
          component="img"
          src={content?.thumbnailImage ?? '/assets/image-placeholder.jpg'}
          alt={content?.name}
          sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
        />
        <Stack direction="column" justifyContent="space-between" gap={2} sx={{ p: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography
              variant="caption"
              component="h4"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'secondary.main' }}
            >
              {content?.name}
            </Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {content?.stakeholders?.map((stakeholder) => (
                <Chip key={stakeholder.Id} label={stakeholder.name} size="small" variant="outlined" />
              ))}
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={1}>
            <IconWithText icon="hugeicons:instagram" text={content?.partnerIGTotalViews} />
            <IconWithText icon="hugeicons:youtube" text={content?.ytPartnerTotalViews} />
            <IconWithText icon="basil:pinterest-outline" text={content?.pinterestTotalViews} />
          </Stack>
        </Stack>
      </Card>
      <ManageContentRightPanel
        fetchList={fetchList}
        onClose={() => setOpenRightPanel(false)}
        open={openRightPanel ? true : false}
        data={content}
        view={'QUICK'}
      />
    </>
  );
};
