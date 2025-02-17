import { Chip } from '@mui/material';

export const CustomChip = ({ label, sx, fontSize = '10px', size = 'small', color, variant, height = '20px' }) => {
  return (
    <Chip
      label={label}
      size={size}
      color={color}
      variant={variant}
      sx={{
        fontSize: fontSize,
        height: { height },
        lineHeight: '1',
        padding: '0 0px',
        ...sx,
      }}
    />
  );
};
