import { Box, Tab, Tabs } from '@mui/material';

export const TabContainer = ({ tabs, value, onTabChange }) => {
  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Tabs value={value} onChange={onTabChange} variant="scrollable" aria-label="custom reusable tabs">
        {tabs.map((label, index) => (
          <Tab key={index} label={label} sx={{ textTransform: 'none', fontWeight: 500 }} />
        ))}
      </Tabs>
    </Box>
  );
};
