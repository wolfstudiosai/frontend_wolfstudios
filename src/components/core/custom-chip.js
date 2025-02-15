import { Chip } from '@mui/material';

export const CustomChip = ({ label, sx, fontSize = '10px', size = 'small', color, variant }) => {
  return <Chip label={label} size={size} color={color} variant={variant} sx={{ fontSize: { fontSize }, ...sx }} />;
};
