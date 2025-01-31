'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getRandomColor, pxToRem } from '@/utils/utils';
import { Avatar, AvatarGroup, Box, Chip, IconButton, Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const PageHeader = ({ title, tags = [], filters = [], sorting = [], onFilterChange }) => {
  const [currentSection, setCurrentSection] = React.useState('TAG');
  const handleFilter = (type, value) => {
    onFilterChange?.(type, value);
  };

  return (
    <Box mb={3}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Chip
          label={'1881'}
          color="inherit"
          size="small"
          sx={{ ml: 1, color: 'text.secondary', fontSize: pxToRem(12) }}
        />
        <IconButton size="small" variant="contained" color="error">
          <Iconify icon="material-symbols-light:bookmark-outline" width={16} height={16} />
        </IconButton>
        <AvatarGroup
          spacing={'small'}
          total={42}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, mb: 0.5 } }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </AvatarGroup>
      </Stack>
      <Box>
        <Stack direction="row" alignItems="center" sx={{ gap: 2, mb: 1 }}>
          {['TAG', 'FILTER', 'SORTING'].map((section) => (
            <Typography
              key={section}
              onClick={() => setCurrentSection(section)}
              sx={{
                fontSize: pxToRem(14),
                fontWeight: '500',
                cursor: 'pointer',
                color: currentSection === section ? '#1976d2' : 'text.secondary',
                '&:hover': {
                  color: currentSection === section ? '#1565c0' : '#1976d2',
                },
              }}
            >
              {section}
            </Typography>
          ))}

          <Stack direction="row">
            {(currentSection === 'TAG' ? tags : currentSection === 'FILTER' ? filters : sorting).map((item) => (
              <Chip
                key={item.value}
                size="small"
                label={item.label}
                onClick={() => handleFilter(currentSection, item.value)}
                sx={{
                  ml: 1,
                  borderRadius: 0.5,
                  backgroundColor: getRandomColor(),
                  color: '#fff',
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
