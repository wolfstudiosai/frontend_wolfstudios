import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { CustomSelect } from '/src/components/formFields/custom-select';

import { updateCampaignAsync } from '../_lib/campaign.actions';
import { campaignProgressStatus } from '../_lib/campaign.constants';
import { ManageCampaignRightPanel } from './manage-campaign-right-panel';
import { isSupabaseUrl } from '/src/utils/helper';

export const CampaignTabCard = ({ campaign, fetchList }) => {
  const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);
  const [campaignProgress, setCampaignProgress] = React.useState('');
  console.log(campaignProgress, 'campaignProgress....');

  async function updateCampaign() {
    try {
      const res = await updateCampaignAsync(campaign?.id, {
        ...campaign,
        status: campaignProgress,
      });

      if (res.success) {
        fetchList();
      }
    } catch (e) {
      // console.log( e)
    }
  }

  React.useEffect(() => {
    if (campaign.status !== campaignProgress && campaignProgress) {
      updateCampaign();
    }
  }, [campaignProgress]);

  const imageSrc = isSupabaseUrl(campaign.CampaignImage[0])
    ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${campaign.CampaignImage[0]}`
    : campaign.CampaignImage[0];

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
            objectFit: 'contain',
            border: '1px solid var(--mui-palette-divider)',
            cursor: 'pointer',
          }}
          onClick={() => setOpenCampaignRightPanel(campaign)}
        />

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Stakeholder
          </Typography>
          <Stack direction="row" flexWrap="wrap">
            <Typography sx={{ fontSize: '14px' }} color="text.secondary">
              {campaign.ByCampaignsStakeholders?.map((item) => item?.Stakeholders?.Name)
                .filter(Boolean)
                .join(', ') || '-'}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign Status
          </Typography>
          <Chip label={campaign.CampaignStatus} size="small" sx={{ fontSize: '10px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Start Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.StartDate ? dayjs(campaign.StartDate).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            End Date
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.EndData ? dayjs(campaign.EndData).format('DD MMM YYYY') : '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Budget
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.Budget || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Total Expense
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.TotalExpense || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Campaign ROI
          </Typography>
          <Typography sx={{ fontSize: '14px' }} color="text.secodary">
            {campaign.CampaignROI || '-'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }} color="text.primary">
            Change Status
          </Typography>
          <CustomSelect
            value={campaignProgress}
            onChange={(value) => setCampaignProgress(value)}
            name="status"
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
