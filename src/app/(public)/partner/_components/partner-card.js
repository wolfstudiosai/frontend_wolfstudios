import React from 'react';
import { CustomChip } from '@/components/core/custom-chip';
import { Iconify } from '@/components/iconify/iconify';
import { IconWithoutText } from '@/components/utils/icon-text';
import { formatCompactNumber, formatViewCount, isSupabaseUrl } from '@/utils/helper';
import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, Typography } from '@mui/material';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';

export const PartnerCard = ({ item, fetchList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);
  const handleOpenAddToPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddToPopover = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        overflow: 'hidden',
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row">
        <Box
          component="img"
          src={
            isSupabaseUrl(item.profile_image)
              ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.profile_image}`
              : item.profile_image
          }
          alt="Partner name"
          sx={{
            width: '48%',
            height: '170px',
            objectFit: 'contain',
            borderRight: '1px solid var(--mui-palette-divider)',
            borderBottom: '1px solid var(--mui-palette-divider)',
            borderRadius: '0 0 calc(1* var(--mui-shape-borderRadius)) 0',
          }}
          onClick={() => setOpenPartnerRightPanel(item)}
        />
        <Stack sx={{ p: 2, flex: 1 }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {item?.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {formatCompactNumber(item?.total_audience)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {'$' + formatCompactNumber(item?.hourly_rate)}
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={1.5} flexWrap="wrap" sx={{ py: 1.5 }}>
            <IconWithoutText icon="mage:email" value={item?.email} type={'email'} />
            <IconWithoutText icon="proicons:call" value={item?.phone} type={'phone'} />
            <IconWithoutText icon="mynaui:globe" value={item?.website} type={'url'} />
            <IconWithoutText icon="ri:drive-fill" value={item?.google_drive_files} type={'url'} />
            <IconWithoutText icon="ri:amazon-fill" value={item?.amazon_review_link} type={'url'} />
          </Stack>
          <Stack direction={'row'} gap={1}>
            {item?.current_status && <CustomChip key="item" label={item.current_status} color={'primary'} />}
          </Stack>
          <Box>
            <Button
              endIcon={<Iconify icon="icon-park-solid:down-one" />}
              variant="text"
              onClick={handleOpenAddToPopover}
              size="small"
              sx={{ textTransform: 'none', borderRadius: '8px', px: 2, padding: '0' }}
            >
              Add to
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ px: 2 }}>
        <Stack spacing={0.5} pt={1}>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Products:
            </Typography>
            {item?.products?.split(',').map((product) => (
              <CustomChip key={product} label={product} variant={'soft'} fontSize="12px" />
            ))}
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Proposed:
            </Typography>
            {item?.proposals?.split(',').map((item) => (
              <CustomChip key={item} label={item} variant={'soft'} fontSize="12px" />
            ))}
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Contributed:
            </Typography>
            {item?.contributed_campaigns?.split(',').map((item) => (
              <CustomChip key={item} label={item} variant={'soft'} fontSize="12px" />
            ))}
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={1} flexWrap={'wrap'} sx={{ mt: 1.5 }}>
          <SocialInfo
            icon="hugeicons:instagram"
            follower={formatCompactNumber(item?.instagram_following)}
            url={item?.instagram}
            rate={100}
          />
          <SocialInfo
            icon="hugeicons:youtube"
            follower={formatCompactNumber(item?.youtube_following)}
            url={item?.youtube}
            rate={100}
          />
          <SocialInfo
            icon="mingcute:facebook-line"
            follower={formatCompactNumber(item?.facebook_following)}
            url={item?.facebook}
            rate={100}
          />
          <SocialInfo
            icon="hugeicons:new-twitter-ellipse"
            follower={formatCompactNumber(item?.x_following)}
            url={item?.x}
            rate={100}
          />
          <SocialInfo
            icon="hugeicons:pinterest"
            follower={formatCompactNumber(item?.pinterest_following)}
            url={item?.pinterest}
            rate={100}
          />
          <SocialInfo
            icon="mingcute:linkedin-line"
            follower={formatCompactNumber(item?.linkedin_connection)}
            url={item?.linkedin}
            rate={100}
          />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorEl)}
            onClose={handleCloseAddToPopover}
            anchorEl={anchorEl}
          >
            <MenuList sx={{ minWidth: '160px' }}>
              <MenuItem>
                <Typography>Partner</Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Typography>Partner</Typography>
              </MenuItem>
            </MenuList>
          </Popover>
        </Box>
      </Box>

      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        width={'50vw'}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  );
};

const SocialInfo = ({ sx, icon, follower, rate, url }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" gap={1} alignItems="center" sx={{ color: 'text.secondary', ...sx }}>
      <Iconify
        icon={icon}
        sx={{ width: 22, height: 22, color: 'text.primary', '&:hover': { color: 'primary.main' } }}
        onClick={handleRedirect}
      />
      <Stack direction="row" divider={<Typography> -</Typography>}>
        <Typography fontSize="14px">{follower}</Typography>
        <Typography fontSize="14px">${rate}</Typography>
      </Stack>
    </Stack>
  );
};
