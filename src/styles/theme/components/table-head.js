import { tableCellClasses } from '@mui/material/TableCell';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--mui-palette-background-paper)',
        color: 'var(--mui-palette-text-secondary)',
        lineHeight: 1,
      },
    },
  },
};
