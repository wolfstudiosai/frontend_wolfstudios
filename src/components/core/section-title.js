import { Box } from '@mui/material';

export const SectionTitle = ({ title }) => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-level3)',
        p: 2,
        fontSize: '18px',
        fontWeight: 500,
        color: 'text.primary',
      }}
    >
      {title}
    </Box>
  );
};
