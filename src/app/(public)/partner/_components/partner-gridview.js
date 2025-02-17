'use client';

import React from 'react';
import { CustomChip } from '@/components/core/custom-chip';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/loaders/PageLoader';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';

export const PartnerGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
  return (
    <Box>
      <PageLoader loading={loading} error={null}>
        {data.map((partner, index) => (
          <Grid key={index} container spacing={1}>
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
          </Grid>
        ))}
      </PageLoader>
    </Box>
  );
};

const PartnerCard = ({ item, fetchList }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={1}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}
      >
        <Box sx={{ position: 'relative', width: { xs: '100%', md: '50%' }, minHeight: '200px' }}>
          <Box
            component="img"
            // src={
            //   isSupabaseUrl(item?.profile_image)
            //     ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item?.profile_image}`
            //     : item?.profile_image
            // }
            src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg"
            alt={item?.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
            onClick={() => setOpenPartnerRightPanel(item)}
          />
          <Stack
            direction={'row'}
            spacing={0.5}
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              zIndex: 2,
              boxShadow: 1,
            }}
          >
            <CustomChip label={'Live Campaign'} color={'primary'} height="18px" />
            <CustomChip label={'Current Status'} color={'primary'} />
          </Stack>
        </Box>
        <Stack direction="column" sx={{ px: 2 }}>
          <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
            {item?.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
            // sx={{ mt: 0.4 }}
          >
            <Typography fontSize="14px">303M</Typography>
            <Typography fontSize="14px">$202</Typography>
          </Stack>
          <Stack direction="row" gap={1} mt={1}>
            <Typography fontSize="15px">Products</Typography>
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
          </Stack>
          <Stack direction="row" gap={1} mt={0.5}>
            <Typography fontSize="15px">Proposed</Typography>
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
          </Stack>
          <Stack direction="row" gap={1} mt={0.5}>
            <Typography fontSize="15px">Contributed</Typography>
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
            <CustomChip label={'Product 1'} height="18px" variant={'soft'} fontSize="14px" />
          </Stack>
          <Stack gap={1} sx={{ my: 1 }}>
            <SocialIconWithText
              icon="hugeicons:instagram"
              url={'https://www.instagram.com/'}
              text="100K"
              value={'400$'}
            />
            <SocialIconWithText
              icon="hugeicons:youtube"
              url={'https://www.instagram.com/'}
              text="100K"
              value={'400$'}
            />
            <SocialIconWithText
              icon="mingcute:facebook-line"
              url={'https://www.instagram.com/'}
              text="100K"
              value={'400$'}
            />
            <SocialIconWithText
              icon="hugeicons:new-twitter-ellipse"
              url={'https://www.instagram.com/'}
              text="100K"
              value={'400$'}
            />
            <SocialIconWithText icon="circum:linkedin" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
            <SocialIconWithText
              icon="hugeicons:pinterest"
              url={'https://www.instagram.com/'}
              text="100K"
              value={'400$'}
            />
          </Stack>
          <Stack direction={'row'} spacing={2} mb={2}>
            <SocialIconWithRedirectionUrl icon={'ri:drive-fill'} url={'https://www.instagram.com/'} />
            <SocialIconWithRedirectionUrl icon={'mage:email'} url={'https://www.instagram.com/'} />
            <SocialIconWithRedirectionUrl icon={'ri:amazon-fill'} url={'https://www.instagram.com/'} />
          </Stack>
        </Stack>
      </Stack>
      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        width="70%"
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </>
  );
};

const CopyIconText = ({ icon, text, sx = {} }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(), 1500);
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ cursor: 'pointer', ...sx }}>
      <Iconify icon={icon} />
      <Typography variant="body2">{text}</Typography>
      <Iconify
        icon={copied ? 'mdi:check' : 'mdi:content-copy'}
        sx={{ cursor: 'pointer', color: copied ? 'success.main' : 'text.secondary', width: 15, height: 15 }}
        onClick={handleCopy}
      />
    </Stack>
  );
};
export const SocialIconWithText = ({ icon, url, text, value, sx = {} }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
      <Iconify onClick={handleRedirect} sx={{ cursor: 'pointer' }} icon={icon} />
      <Typography variant="body2">{' - ' + text}</Typography>
      <Typography variant="body2">{' - ' + value}</Typography>
    </Stack>
  );
};

export const SocialIconWithRedirectionUrl = ({ icon, url, text }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Iconify onClick={handleRedirect} sx={{ cursor: 'pointer' }} icon={icon} />
      <Typography variant="body2">{text}</Typography>
    </Stack>
  );
};
