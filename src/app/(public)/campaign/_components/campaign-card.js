import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';

import { ManageCampaignRightPanel } from './manage-campaign-right-panel';
import { isSupabaseUrl } from '/src/utils/helper';

export const CampaignCard = ({ item, fetchList }) => {
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);
  const imageSrc = isSupabaseUrl(item.CampaignImage[0])
    ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.CampaignImage[0]}`
    : item.CampaignImage[0];

  return (
    <>
      <Stack
        direction="column"
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          minHeight: { lg: 600, md: 750, sm: 200, xs: 250 },
        }}
      >
        <Box
          component="img"
          src={imageSrc || '/assets/image-placeholder.jpg'}
          alt={item.Name}
          sx={{
            width: '100%',
            height: {lg: 350, md: 400, sm: 300, xs: 300 },
            objectFit: 'cover',
            borderRadius: 'calc(2* var(--mui-shape-borderRadius))',
            padding: 1.5,
            objectFit: 'cover',
          }}
        />
        <Stack direction="column" spacing={4} sx={{ p: 2 }}>
          <Box>
            <Typography
              variant="caption"
              component="h4"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'secondary.main' }}
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
              {item?.CampaignDescription || 'No description'}
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => setOpenCampaignRightPanel(item)}
              sx={{
                textDecoration: 'underline',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary', background: 'transparent', textDecoration: 'underline' },
              }}
            >
              View details
            </Button>
          </Box>
          <Stack direction={{ md: 'row', sm: 'column' }} justifyContent="space-between" gap={1}>
            <Stack
              direction="row"
              alignItems="center"
              divider={<Iconify icon="pepicons-pencil:line-y" sx={{ color: 'grey.400' }} />}
            >
              <CustomChip label={item.campaign_status ?? '-'} color="success" size="small" variant="soft" />
              <CustomChip
                label={`${dayjs(item.StartDate).isValid() ? dayjs(item.StartDate).format('DD MMM YYYY') : '-/-'} : ${dayjs(item.EndDate).isValid() ? dayjs(item.EndDate).format('DD MMM YYYY') : '-/-'}`}
                color="success"
                size="small"
                variant="soft"
              />
            </Stack>
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
