import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';

import { CampaignRightPanel } from './campaign-right-panel';
import { isSupabaseUrl } from '/src/utils/helper';

export const CampaignCard = ({ content, fetchList }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(null);

  return (
    <>
      <Stack
        direction="column"
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          minHeight: { lg: 600, md: 750, sm: 200, xs: 250 },
          backgroundColor: 'background.paper',
        }}
        onClick={() => setOpenRightPanel(content)}
      >
        <Box
          component="img"
          src={content?.thumbnailImage || '/assets/image-placeholder.jpg'}
          alt={content?.name}
          sx={{
            width: '100%',
            height: { lg: 350, md: 400, sm: 300, xs: 300 },
            objectFit: 'cover',
            borderRadius: 'calc(2* var(--mui-shape-borderRadius))',
            padding: 1.5,
            objectFit: 'cover',
          }}
        />
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            p: { xs: 1.5, md: 2 },
            width: '100%',
            flexGrow: 1,
            minHeight: '100%',
          }}
        >
          <Box>
            <Typography
              variant="caption"
              component="h4"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'secondary.main' }}
            >
              {content?.name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
              Content engagement: {content?.totalContentEngagement}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                color: 'text.secondary',
                mt: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {content?.campaignDescription || 'No description'}
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            divider={<Iconify icon="pepicons-pencil:line-y" sx={{ color: 'grey.400' }} />}
          >
            <CustomChip label={content.campaignStatus ?? '-'} size="small" variant="soft" />
            <CustomChip
              label={`${dayjs(content.startDate).isValid() ? dayjs(content.startDate).format('DD MMM YYYY') : '-/-'} : ${dayjs(content.endDate).isValid() ? dayjs(content.endDate).format('DD MMM YYYY') : '-/-'}`}
              size="small"
              variant="soft"
            />
          </Stack>
        </Stack>
      </Stack>

      {openRightPanel && (
        <CampaignRightPanel
          fetchList={fetchList}
          onClose={() => setOpenRightPanel(false)}
          open={openRightPanel ? true : false}
          data={content}
          view={'QUICK'}
        />
      )}
    </>
  );
};
