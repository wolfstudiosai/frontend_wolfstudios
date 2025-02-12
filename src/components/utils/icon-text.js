import { Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const IconText = ({ icon, text, sx = {} }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
      <Iconify icon={icon} />
      <Typography>{text || '-'}</Typography>
    </Stack>
  );
};
