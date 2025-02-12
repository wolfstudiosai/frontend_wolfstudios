'use client';

import React from 'react';
import { CustomChip } from '@/components/core/custom-chip';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { IconText } from '@/components/utils/icon-text';
import { capitalizeFirstLetter, isSupabaseUrl } from '@/utils/helper';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';

export const PartnerGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
  return (
    <Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={1} columns={{ xs: 24 }}>
          {data.map((partner, index) => (
            <Grid item size={{ xs: 6, md: colums }} key={index}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

const PartnerCard = ({ item, fetchList }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);

  return (
    <>
      <Stack
        direction="row"
        gap={1}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, cursor: 'pointer', overflow: 'hidden' }}
        onClick={() => setOpenPartnerRightPanel(item)}
      >
        <Box
          component="img"
          src={
            isSupabaseUrl(item?.profile_image)
              ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item?.profile_image}`
              : item?.profile_image
          }
          alt={item?.name}
          sx={{ width: '30%', minHeight: '200px', objectFit: 'cover' }}
        />
        <Stack direction="column" sx={{ p: 2 }}>
          <Box>
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="h5">{item?.name}</Typography>
              <CustomChip label={item?.profile_category} />
            </Stack>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
              sx={{ mt: 1 }}
            >
              <Typography>{capitalizeFirstLetter(item?.profile_category)}</Typography>
              <Typography>{item?.state}</Typography>
            </Stack>
          </Box>
          <Stack direction="column" gap={0.5} sx={{ mt: 2 }}>
            <IconText icon="proicons:call" text={item?.phone} sx={{ color: 'text.secondary' }} />
            <IconText icon="clarity:email-line" text={item?.email} sx={{ color: 'text.secondary' }} />
            <IconText icon="mynaui:globe" text={item?.website} sx={{ color: 'text.secondary' }} />
            <IconText icon="fluent:status-48-regular" text={item?.current_status} sx={{ color: 'text.secondary' }} />
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
