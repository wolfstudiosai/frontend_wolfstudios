'use client';

import React from 'react';
import { getRandomColor, pxToRem } from '@/utils/utils';
import { Avatar, AvatarGroup, Box, Chip, IconButton, Slider, Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const PageHeader = ({ title, colums = 4, tags = [], filters = [], sorting = [], onFilterChange }) => {
  const [currentSection, setCurrentSection] = React.useState('TAG');
  const handleFilter = (type, value) => {
    onFilterChange?.(type, value);
  };
  return (
    <Stack direction={'column'} spacing={2} mb={3}>
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
        <Box sx={{ width: '100px', mx: 2 }}>
          <Slider
          size='small'
            aria-label="show-columns"
            value={colums}
            onChange={(e, value) => handleFilter('COL', value)}
            color="#fff"
            min={2}
            max={30}
            step={2}
          />
        </Box>
        <AvatarGroup
          spacing={'small'}
          total={42}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, mb: 0.5 } }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </AvatarGroup>
        <Iconify icon="ri:more-line" width={20} height={20} sx={{ ml: 1 }} />
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
                color: currentSection === section ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  color: currentSection === section ? 'text.primary' : 'text.primary',
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
    </Stack>
  );
};
