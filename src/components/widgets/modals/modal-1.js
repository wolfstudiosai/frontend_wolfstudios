import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowsOutSimple as ArrowsOutSimpleIcon } from '@phosphor-icons/react/dist/ssr/ArrowsOutSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import * as React from 'react';


export function Modal1() {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          maxWidth: '100%',
          mx: 'auto',
          width: '600px',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex', p: 2 }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h6">New message</Typography>
          </Box>
          <IconButton>
            <ArrowsOutSimpleIcon />
          </IconButton>
          <IconButton>
            <XIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
}
