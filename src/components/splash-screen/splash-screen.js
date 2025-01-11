import { Box } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export function SplashScreen({ sx, ...other }) {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          right: 0,
          width: 1,
          bottom: 0,
          height: 1,
          zIndex: 9998,
          display: 'flex',
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            animation: 'spin 4s linear infinite',
          }}
        >
          <Iconify icon="lucide:loader" width={140} height={140} />
        </Box>
      </Box>
    </Box>
  );
}
