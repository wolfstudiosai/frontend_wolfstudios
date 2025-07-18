import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { CustomSelect } from '/src/components/formFields/custom-select';

import { updateCampaignAsync } from '../_lib/campaign.actions';
import { campaignProgressStatus } from '../_lib/campaign.constants';
import { isSupabaseUrl } from '/src/utils/helper';
import { CampaignRightPanel } from './campaign-right-panel';

export const CampaignTabCard = ({ campaign, refreshCampaignsStatus, refreshCampaigns }) => {
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  async function updateCampaign(value) {
    try {
      const finalCampaign = { ...campaign };

      const arrayFields = [
        'contentHQ',
        'stakeholders',
        'retailPartners',
        'proposedPartners',
        'contributedPartners',
        'spaces',
        'productionHQ',
        'products',
        'retailPartners2',
        'retailPartners3',
      ];

      for (const field of arrayFields) {
        const value = finalCampaign[field];
        if (value.length > 0) {
          const arrOfStr = value.map((item) => item.id);
          finalCampaign[field] = arrOfStr;
        }
      }

      const res = await updateCampaignAsync(campaign?.id, {
        ...finalCampaign,
        campaignStatus: value,
      });

      if (res.success) {
        refreshCampaignsStatus();
        refreshCampaigns();
      }
    } catch (e) {
      // console.log( e)
    }
  }

  const imageSrc = isSupabaseUrl(campaign?.campaignImage?.[0])
    ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${campaign?.campaignImage?.[0]}`
    : campaign?.campaignImage?.[0];

  const handleCampaignStatusChange = (value) => {
    if (campaign?.campaignStatus !== value) {
      updateCampaign(value);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        p={1}
        sx={{
          // borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Campaign Image */}
        <Box
          component="img"
          src={imageSrc || '/assets/image-placeholder.jpg'}
          sx={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
            border: '1px solid var(--mui-palette-divider)',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedItemId(campaign.id)
            setOpenCampaignRightPanel(true)
          }}
        />

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Stakeholder
          </Typography>
          <Stack direction="row" flexWrap="wrap">
            <Typography sx={{ fontSize: '14px' }} color="text.secondary">
              {campaign?.stakeholders?.map((item) => item?.name)
                .filter(Boolean)
                .join(', ') || '-'}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign Status
          </Typography>
          <Chip label={campaign.campaignStatus} size="small" color="primary" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Start Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.startDate ? dayjs(campaign.startDate).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            End Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.endDate ? dayjs(campaign.endDate).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Budget
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.budget || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Total Expense
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.totalExpense || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign ROI
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.campaignROI || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Change Status
          </Typography>
          <CustomSelect
            value={campaign?.campaignStatus}
            onChange={(value) => handleCampaignStatusChange(value)}
            name="status"
            options={campaignProgressStatus} label={undefined} error={undefined} />
        </Box>
      </Stack>

      {openCampaignRightPanel && (
        <CampaignRightPanel
          onClose={() => {
            setSelectedItemId(null)
            setOpenCampaignRightPanel(false)
          }}
          id={selectedItemId}
          open={openCampaignRightPanel}
          view="QUICK"
        />
      )}
    </>
  );
};
