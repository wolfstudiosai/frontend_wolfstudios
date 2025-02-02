'use client';

import React from 'react';
import { getRandomColor, pxToRem } from '@/utils/utils';
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  IconButton,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const PageHeader = ({ title, values, tags = [], filters = [], sorting = [], onFilterChange }) => {
  const [currentSection, setCurrentSection] = React.useState('TAG');
  const [toggleButton, setToggleButton] = React.useState('grid');
  const handleFilter = (type, value) => {
    onFilterChange?.(type, value);
  };

  const handleToggle = (event, value) => {
    if (value !== null) {
      setToggleButton(value);
    }
  };
  return (
    <Stack direction={'column'} spacing={2} sx={{ backgroundColor: 'var(--mui-palette-background-level1)', p: 1 }}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Chip
          label={'1881'}
          color="inherit"
          size="small"
          sx={{ ml: 1, color: 'text.secondary', fontSize: pxToRem(8), padding: 0 }}
        />
        <IconButton size="small" variant="contained" color="error">
          <Iconify icon="material-symbols-light:bookmark-outline" width={16} height={16} />
        </IconButton>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: pxToRem(70) }}>
          <Slider
            size="small"
            aria-label="show-columns"
            value={values.COL}
            onChange={(e, value) => handleFilter('COL', value)}
            color="#fff"
            min={2}
            max={30}
            step={2}
          />
        </Stack>
        <ToggleButtonGroup
          size="small"
          value={toggleButton}
          exclusive
          onChange={handleToggle}
          aria-label="toggle buttons"
          sx={{
            display: 'inline-flex', 
            border: '1px solid var(--mui-palette-divider)', 
            boxShadow: 'none', 
            gap: '1px', 
            padding: '2px', 
            marginLeft: (theme) => theme.spacing(1), 
          }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <Iconify icon="ep:grid" width={8} height={8} />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <Iconify icon="solar:list-bold" width={8} height={8} />
          </ToggleButton>
          <ToggleButton value="add" aria-label="add new">
            <Iconify icon="mynaui:plus" width={8} height={8} />
          </ToggleButton>
        </ToggleButtonGroup>
        <Iconify icon="ri:more-line" width={20} height={20} sx={{ ml: 1 }} />
      </Stack>
      <Box>
        <Stack direction="row" alignItems="center" sx={{ gap: 1, mb: 1 }}>
          {['TAG', 'FILTER', 'SORTING'].map((section) => (
            <Typography
              key={section}
              onClick={() => setCurrentSection(section)}
              sx={{
                fontSize: pxToRem(10),
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
