'use client';

import { Box, Tab, Tabs } from '@mui/material';

export const CustomTab = ({ tabs, handleChange, value }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        variant="scrollable"
        scrollButtons="none"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            sx={{
              fontSize: '0.75rem',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
