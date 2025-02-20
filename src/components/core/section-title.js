import { Box } from '@mui/material';

export const SectionTitle = ({ title, sx }) => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-level3)',
        p: 2,
        fontSize: '18px',
        fontWeight: 500,
        color: 'text.primary',
        ...sx
      }}
    >
      {title}
    </Box>
  );
};
