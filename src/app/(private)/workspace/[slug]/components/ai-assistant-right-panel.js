'use client';

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { DrawerContainer } from '../../../../../components/drawer/drawer';
import { Iconify } from '../../../../../components/iconify/iconify';

const recommended = [
  'Find the Levanta Performance report for John Hozjan on December 27, 2023',
  'What are the key themes in the Creative Briefs notes?',
  'Create an interface page for Levanta Performance to visualize sales and commission trends by Partner HQ',
];

export const AIAssistantRightPanel = ({ onClose, open }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} width="30vw">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" p={3}>
        {/* Top Loader */}
        <Box display="flex" justifyContent="center" mt={5} mb={3}>
          {/* <CircularProgress size={50} thickness={4} color="primary" /> */}
        </Box>

        {/* Heading */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
          How can I help?
        </Typography>

        {/* Search Input */}
        <Box width="100%" maxWidth="600px" mb={3}>
          <TextField
            fullWidth
            placeholder="Ask or build anything..."
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 1, py: 1 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" sx={{ bgcolor: grey[500], borderRadius: 9999, color: 'white' }}>
                    <Iconify icon="mingcute:arrow-up-fill" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%',
            mb: 2,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              minHeight: '40px',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: '40px',
                padding: '8px',
                fontSize: '0.75rem',
                color: 'var(--SideNav-color)',
                transition: 'color 0.2s ease-in-out',
                '& .MuiTab-iconWrapper': {
                  fontSize: '16px',
                  color: 'var(--SideNav-color)',
                },
              },
              '& .Mui-selected': {
                fontWeight: 'bold',
                color: 'var(--SideNav-color) !important',
                '& .MuiTab-iconWrapper': {
                  color: 'var(--SideNav-color)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'grey.800',
                height: '2px',
                borderRadius: 0,
              },
            }}
          >
            <Tab label="Recomended" />
            <Tab label="Ask" />
            <Tab label="Analyze" />
            <Tab label="Build" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Stack direction="column" gap={2} divider={<Divider />}>
            {recommended.map((item, index) => (
              <Typography>{item}</Typography>
            ))}
          </Stack>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ border: '1px solid', borderColor: 'divider', p: 2, borderRadius: 1, width: '100%', mt: 4 }}
        >
          <Stack direction="column">
            <Typography fontWeight="bold">Explore field agents</Typography>
            <Typography>Research, summerize and analyze with AI</Typography>
          </Stack>
          <IconButton>
            <Iconify icon="icon-park-outline:arrow-right-up" />
          </IconButton>
        </Stack>
      </Box>
    </DrawerContainer>
  );
};
