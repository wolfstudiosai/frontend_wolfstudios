'use client';

import { Box, Popover, Tooltip } from '@mui/material';
import React from 'react';

import { Iconify } from '../iconify/iconify';

export const QuickToolbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit">
        <Box
          component="button"
          onClick={handleToggle}
          sx={{
            background: 'var(--mui-palette-neutral-900)',
            border: 'none',
            borderRadius: '50%',
            bottom: 0,
            color: 'var(--mui-palette-common-white)',
            cursor: 'pointer',
            display: 'inline-flex',
            height: '40px',
            m: 4,
            p: '10px',
            position: 'fixed',
            right: 0,
            width: '40px',
            zIndex: 1200,
            '&:hover': { bgcolor: 'var(--mui-palette-neutral-700)' },
            '@keyframes spin': { '0%': { rotate: '0' }, '100%': { rotate: '360deg' } },
          }}
        >
          <Iconify icon="eva:edit-fill" height="var(--icon-fontSize-md)" width="var(--icon-fontSize-md)" />
        </Box>
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleToggle}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          mt: -1,
        }}
      >
        {children}
      </Popover>
    </React.Fragment>
  );
};
