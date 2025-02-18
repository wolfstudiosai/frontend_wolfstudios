import React from 'react';
import { CustomChip } from '@/components/core/custom-chip';
import { Iconify } from '@/components/iconify/iconify';
import { IconWithoutText } from '@/components/utils/icon-text';
import { ContentCopy, ContentCut, ContentPaste } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Divider,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { usePopover } from '@/hooks/use-popover';

export const PartnerCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenAddToPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddToPopover = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: '8px' }}>
      <Stack direction="row">
        <Box
          component="img"
          src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg"
          alt="Partner name"
          sx={{ width: '48%', height: '200px', objectFit: 'cover', borderRadius: '8px 0px 8px 0px' }}
        />
        <Stack spacing={1} sx={{ p: 2 }}>
          <Typography variant="h5">Partner name</Typography>
          <Stack direction="row" divider={<Iconify icon="radix-icons:divider-vertical" sx={{ color: 'grey.400' }} />}>
            <Typography sx={{ color: 'text.secondary' }}>303M</Typography>
            <Typography sx={{ color: 'text.secondary' }}>$202</Typography>
          </Stack>
          <Stack direction={'row'} gap={1} pb={0.5}>
            <IconWithoutText
              icon="mage:email"
              value={'pDZKl@example.com'}
              type={'email'}
              sx={{ color: 'text.secondary' }}
            />
            <IconWithoutText icon="line-md:phone" value={'123456789'} type={'phone'} sx={{ color: 'text.secondary' }} />
            <IconWithoutText
              icon="mynaui:globe"
              value={'www.example.com'}
              type={'url'}
              sx={{ color: 'text.secondary' }}
            />
            <IconWithoutText
              icon="ri:drive-fill"
              value={'https://www.instagram.com'}
              type={'url'}
              sx={{ color: 'text.secondary' }}
            />
            <IconWithoutText
              icon="ri:amazon-fill"
              value={'www.example.com'}
              type={'url'}
              sx={{ color: 'text.secondary' }}
            />
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
            >
              Add to
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Stack direction={'column'} gap={1}>
        <Box>
          <Stack direction="row" flexWrap={'wrap'} gap={1} mt={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Products:
            </Typography>
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} mt={0.5} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Proposed:
            </Typography>
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} mt={0.5} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Contributed:
            </Typography>
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
            <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
          </Stack>
        </Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="hugeicons:instagram" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="mingcute:facebook-line" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="mingcute:facebook-line" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="hugeicons:instagram" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="mingcute:facebook-line" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SocialInfo icon="mingcute:facebook-line" follower="123k" rate={100} sx={{ width: '50%' }} />
          </Grid>
        </Grid>
        <Box>
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
      </Stack>
    </Box>
  );
};

const SocialInfo = ({ sx, icon, follower, rate }) => (
  <Stack direction="row" gap={0.7} alignItems="center" sx={{ color: 'text.secondary', ...sx }}>
    <Iconify icon={icon} sx={{ width: 22, height: 22 }} />
    <Stack direction="row" divider={<Iconify icon="radix-icons:divider-vertical" sx={{ color: 'grey.400' }} />}>
      <Typography>{follower}</Typography>
      <Typography>${rate}</Typography>
    </Stack>
  </Stack>
);
