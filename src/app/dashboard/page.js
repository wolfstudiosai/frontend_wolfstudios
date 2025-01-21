import Box from '@mui/material/Box';

import { config } from '/src/config';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      homepage content will be here
    </Box>
  );
}
