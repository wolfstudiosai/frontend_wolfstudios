import React from 'react';
import { CustomSelect } from '@/components/formFields/custom-select';
import { isSupabaseUrl } from '@/utils/helper';
import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { campaignProgressStatus } from '../_lib/campaign.constants';
import { updateCampaignAsync } from '../_lib/portfolio.actions';
import { ManageCampaignRightPanel } from './manage-campaign-right-panel';

export const CampaignTabCard = ({ campaign, fetchList }) => {
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);
  const [campaignProgress, setCampaignProgress] = React.useState(campaign.campaign_progress || '');

  async function updateCampaign() {
    try {
      const res = await updateCampaignAsync(null, {
        ...campaign,
        campaign_progress: campaignProgress,
      });

      if (res.success) {
        fetchList();
      }
    } catch (e) {
      // console.log( e)
    }
  }

  React.useEffect(() => {
    if (campaign.campaign_progress !== campaignProgress) {
      updateCampaign();
    }
  }, [campaignProgress]);

  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        p={1}
        sx={{
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Campaign Image */}
        <Box
          component="img"
          src={
            isSupabaseUrl(campaign.campaign_image)
              ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${campaign.campaign_image}`
              : campaign.campaign_image
          }
          sx={{
            height: '100%',
            width: '100%',
            // width: pxToRem(200),
            objectFit: 'contain',
            borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
            border: '1px solid var(--mui-palette-divider)',
          }}
          onClick={() => setOpenCampaignRightPanel(campaign)}
        />
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Current Status
          </Typography>
          <Chip label={campaign.campaign_progress} size="small" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Stakeholder
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.stakeholder || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign Status
          </Typography>
          <Chip label={campaign.campaign_status} size="small" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Start Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.start_date ? dayjs(campaign.start_date).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            End Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.start_date ? dayjs(campaign.end_data).format('DD MMM YYYY') : '-'}
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
            {campaign.total_expense || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign ROI
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.campaign_ROI || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Change Status
          </Typography>
          <CustomSelect
            value={campaignProgress}
            onChange={(value) => setCampaignProgress(value)}
            name="campaign_status"
            options={campaignProgressStatus}
          />
        </Box>
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
