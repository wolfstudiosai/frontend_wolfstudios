import { Chip } from '@mui/material';

export const CustomChip = ({ label, sx, fontSize = '10px', size = 'small' }) => {
  return <Chip label={label} size={size} sx={{ fontSize: { fontSize }, ...sx }} />;
};
