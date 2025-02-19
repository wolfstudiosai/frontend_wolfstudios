import React from 'react';
import { CustomChip } from '@/components/core/custom-chip';
import { Iconify } from '@/components/iconify/iconify';
import { IconWithoutText } from '@/components/utils/icon-text';
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
          src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg"
          alt="Partner name"
          sx={{
            width: '48%',
            height: '170px',
            objectFit: 'cover',
            borderRight: '1px solid var(--mui-palette-divider)',
            borderBottom: '1px solid var(--mui-palette-divider)',
            borderRadius: '0 0 calc(1* var(--mui-shape-borderRadius)) 0',
          }}
          onClick={() => setOpenPartnerRightPanel(item)}
        />
        <Stack sx={{ p: 2, flex: 1 }}>
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 900,
              color: 'text.primary',
            }}
          >
            Partner name
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              303M
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              $202
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={1.5} flexWrap="wrap" sx={{ py: 1.5 }}>
            <IconWithoutText icon="mage:email" value={'pDZKl@example.com'} type={'email'} />
            <IconWithoutText icon="proicons:call" value={'123456789'} type={'phone'} />
            <IconWithoutText icon="mynaui:globe" value={'www.example.com'} type={'url'} />
            <IconWithoutText icon="ri:drive-fill" value={'https://www.instagram.com'} type={'url'} />
            <IconWithoutText icon="ri:amazon-fill" value={'www.example.com'} type={'url'} />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <CustomChip label={'Live Campaign'} color={'primary'} height="18px" />
            <CustomChip label={'Current Status'} color={'primary'} />
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
        <Stack spacing={0.5}>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Products:
            </Typography>
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
            <CustomChip label={'Product 2'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Proposed:
            </Typography>
            <CustomChip label={'Product 3'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Contributed:
            </Typography>
            <CustomChip label={'Product 4'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={1} flexWrap={'wrap'} sx={{ mt: 1.5 }}>
          <SocialInfo icon="hugeicons:instagram" follower="123k" rate={100} />
          <SocialInfo icon="hugeicons:youtube" follower="123k" rate={100} />
          <SocialInfo icon="mingcute:facebook-line" follower="123k" rate={100} />
          <SocialInfo icon="hugeicons:new-twitter-ellipse" follower="123k" rate={100} />
          <SocialInfo icon="hugeicons:pinterest" follower="123k" rate={100} />
          <SocialInfo icon="mingcute:linkedin-line" follower="123k" rate={100} />
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
        width={"50vw"}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  );
};

const SocialInfo = ({ sx, icon, follower, rate }) => (
  <Stack direction="row" gap={0.7} alignItems="center" sx={{ color: 'text.secondary', ...sx }}>
    <Iconify icon={icon} sx={{ width: 22, height: 22, color: 'text.primary' }} />
    <Stack direction="row" divider={<Typography> -</Typography>}>
      <Typography fontSize="14px">{follower}</Typography>
      <Typography fontSize="14px">${rate}</Typography>
    </Stack>
  </Stack>
);
