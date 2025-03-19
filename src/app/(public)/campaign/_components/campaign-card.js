import React from 'react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';

import { ManageCampaignRightPanel } from './manage-campaign-right-panel';
import { isSupabaseUrl } from '/src/utils/helper';

export const CampaignCard = ({ item, fetchList }) => {
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);

  return (
    <>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        sx={{
          height: '265px',
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.09)',
          overflow: 'visible',
        }}
      >
        <Box
          component="img"
          src={
            isSupabaseUrl(item.campaign_image)
              ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.campaign_image}`
              : item.campaign_image
          }
          alt={item.Name}
          sx={{
            width: { sm: '100%', md: '30rem' },
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'calc(2* var(--mui-shape-borderRadius))',
            padding: 1.5,
          }}
        />
        <Stack direction="column" justifyContent="space-between" gap={1} sx={{ p: 2, width: '100%' }}>
          <Box>
            <Typography
              variant="caption"
              component="h4"
              sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'secondary.main' }}
            >
              {item?.Name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
              Content engagement: {item?.TotalContentEngagement}
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
              {item?.CampaignDescription ?? 'No description'}
            </Typography>
          </Box>
          <Stack direction={{ md: 'row', sm: 'column' }} justifyContent="space-between" gap={1}>
            <Stack
              direction="row"
              alignItems="center"
              divider={<Iconify icon="pepicons-pencil:line-y" sx={{ color: 'grey.400' }} />}
            >
              <CustomChip label={item.campaign_status} color="success" size="small" variant="soft" />
              <CustomChip
                label={`${dayjs(item.StartDate).isValid() ? dayjs(item.StartDate).format('DD MMM YYYY') : '-/-'} : ${dayjs(item.EndDate).isValid() ? dayjs(item.EndDate).format('DD MMM YYYY') : '-/-'}`}
                color="success"
                size="small"
                variant="soft"
              />
            </Stack>
            <Button variant="outlined" size="small" color="inherit" onClick={() => setOpenCampaignRightPanel(item)}>
              View details
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <ManageCampaignRightPanel
        view={'QUICK'}
        width="70%"
        fetchList={fetchList}
        open={openCampaignRightPanel ? true : false}
        data={openCampaignRightPanel}
        onClose={() => setOpenCampaignRightPanel(false)}
      />
    </>
  );
};
