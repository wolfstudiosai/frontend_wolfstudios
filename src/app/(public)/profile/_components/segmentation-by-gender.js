import React from 'react';
import { pxToRem } from '/src/utils/helper';
import { Box, Stack, Typography } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';

export const SegmentationByGender = () => {
  return (
    <Stack direction={'column'} spacing={4}>
      <Typography color="text.primary" sx={{ fontWeight: 500, fontSize: pxToRem(20), mb: 1 }}>
        Segmentation by gender
      </Typography>
      <Stack direction="row" spacing={4} justifyContent={'space-between'}>
        <IconBox icon="ph:gender-female-bold" text="65" />
        <IconBox icon="tdesign:gender-male" text="32" />
        <IconBox icon="fa6-solid:genderless" text="3" />
      </Stack>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</Typography>
    </Stack>
  );
};

const IconBox = ({ icon, text }) => {
  return (
    <Box>
      <Iconify
        icon={icon}
        width={42}
        height={42}
        style={{
          cursor: 'pointer',
          color: 'var(--mui-palette-text-secondary)',
          backgroundColor: 'var(--mui-palette-background-level2)',
          borderRadius: '50%',
          padding: 4,
        }}
      />
      <Typography fontSize={pxToRem(26)} fontWeight={600}>{text}%</Typography>
    </Box>
  );
};
