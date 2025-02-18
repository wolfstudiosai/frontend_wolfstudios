import { Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const IconWithText = ({ icon, text, sx = {} }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
      <Iconify icon={icon} />
      <Typography>{text || '-'}</Typography>
    </Stack>
  );
};
export const IconWithoutText = ({ icon, value, type, sx = {} }) => {
  const handleNavigate = () => {
    if (value && type === 'url') {
      window.open(value, '_blank');
    } else if (value && type === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (value && type === 'phone') {
      window.location.href = `tel: ${value}`;
    } else {
      return;
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
      <Iconify icon={icon} onClick={handleNavigate} />
    </Stack>
  );
};
