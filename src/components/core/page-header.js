'use client';

import React from 'react';
import { Box, Chip, IconButton, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { SettingsContext } from '/src/contexts/settings';
import useAuth from '/src/hooks/useAuth';

import { Iconify } from '../iconify/iconify';
import { pxToRem } from '/src/utils/helper';

export const PageHeader = ({
  title,
  values,
  tags = [],
  filters = [],
  sorting = [],
  onFilterChange,
  totalRecords = 0,
  showFilters = true,
  showColSlider = true,
  showAdd = true,
  setOpenPanel,
  view = false,
}) => {
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);
  const [currentSection, setCurrentSection] = React.useState('TAG');
  const { isLogin } = useAuth();

  const handleFilter = (type, value) => {
    onFilterChange?.(type, value);
  };

  const handleToggle = (event, value) => {
    if (value !== null) {
      if (value === 'add') {
        handleFilter('ADD', !values.ADD);
      } else {
        handleFilter('VIEW', value);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        top: 0,
        background: 'var(--mui-palette-background-default)',
      }}
    >
      <Stack
        direction={'column'}
        sx={{
          py: 1,
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(30) } }}
          >
            {title}
          </Typography>
          <Chip
            label={totalRecords}
            color="inherit"
            size="small"
            sx={{ ml: 1, color: 'text.secondary', fontSize: pxToRem(12), padding: 0 }}
          />
          <IconButton size="small" variant="contained" color="error" sx={{ mr: 0.5 }}>
            <Iconify icon="material-symbols-light:bookmark-outline" width={22} height={22} />
          </IconButton>
          {showColSlider && (
            <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: pxToRem(100) }}>
              <Slider
                size="small"
                aria-label="show-columns"
                value={values.COL}
                onChange={(e, value) => handleFilter('COL', value)}
                color="#fff"
                min={1}
                max={7}
                step={1}
              />
            </Stack>
          )}
          {isLogin && (
            <ToggleButtonGroup
              size="small"
              value={values.VIEW}
              exclusive
              onChange={handleToggle}
              aria-label="toggle buttons"
              sx={{
                display: 'inline-flex',
                border: '1px solid var(--mui-palette-divider)',
                boxShadow: 'none',
                gap: '6px',
                padding: '4px',
                marginLeft: (theme) => theme.spacing(1),
              }}
            >
              {view && (
                <>
                  <ToggleButton value="grid" aria-label="grid view" sx={{ padding: '2px' }}>
                    <Iconify icon="ep:grid" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view" sx={{ padding: '2px' }}>
                    <Iconify icon="solar:list-bold" width={20} height={20} />
                  </ToggleButton>
                </>
              )}
              {showAdd && (
                <ToggleButton
                  value="add"
                  aria-label="add new"
                  sx={{ padding: '2px', backgroundColor: values.ADD ? 'grey.200' : '' }}
                  onClick={() => setOpenPanel(true)}
                >
                  <Iconify icon="mynaui:plus" width={20} height={20} />
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          )}
          <Iconify icon="ri:more-line" width={20} height={20} sx={{ ml: 1 }} />
        </Stack>
        {showFilters && (
          <Box>
            <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
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

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                  py: 0.5,
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {(currentSection === 'TAG' ? tags : currentSection === 'FILTER' ? filters : sorting).map((item) => (
                  <Chip
                    key={item.value}
                    color="text.secondary"
                    size="small"
                    label={item.label}
                    onClick={() => handleFilter(currentSection, item.value)}
                    sx={{
                      ml: 0.3,
                      borderRadius: 0.5,
                      fontSize: pxToRem(13),
                      height: '22px',
                      padding: '6px',
                      cursor: 'pointer',
                      flexShrink: 0, // prevents shrinking in horizontal scroll
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
