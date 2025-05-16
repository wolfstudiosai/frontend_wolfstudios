'use client';

import { Box, Tab, Tabs } from '@mui/material';

export const CustomTab = ({ tabs, handleChange, value }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        aria-label="wrapped label tabs example"
        
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            // sx={{ textTransform: 'capitalize', fontWeight: 500, bgcolor: (theme) => theme.palette.primary.main }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
