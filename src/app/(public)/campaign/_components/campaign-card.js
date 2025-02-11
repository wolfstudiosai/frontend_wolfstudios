import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { ManageCampaignRightPanel } from './manage-campaign-right-panel';

export const CampaignCard = ({ item }) => {
  console.log(item, 'item....');
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          height: '260px',
          borderRadius: 2,
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box
          component="img"
          src={item.campaign_image}
          alt={item.title}
          sx={{ width: '26%', height: '100%', objectFit: 'cover', borderRadius: '16px 0px 0px 16px' }}
        />
        <Stack direction="column" justifyContent="space-between" gap={1} sx={{ p: 2, width: '74%' }}>
          <Box>
            <Typography
              variant="caption"
              component="h4"
              sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'secondary.main' }}
            >
              {item.name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>{item.description}</Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
              Content engagement: {item.content_engagement}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              divider={<Iconify icon="pepicons-pencil:line-y" sx={{ color: 'grey.400' }} />}
            >
              <Stack direction="row" alignItems="center" gap="4px">
                <Iconify icon="mdi:camera-outline" />
                <Typography sx={{ textTransform: 'capitalize' }}>{item.campaign_status}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="4px">
                <Iconify icon="solar:calendar-outline" />
                <Typography>
                  {dayjs(item.start_date).format('DD MMM YYYY')} - {dayjs(item.end_date).format('DD MMM YYYY')}
                </Typography>
              </Stack>
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
        open={openCampaignRightPanel ? true : false}
        data={openCampaignRightPanel}
        onClose={() => setOpenCampaignRightPanel(false)}
      />
    </>
  );
};
