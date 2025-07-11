'use client';

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CustomSelect = ({ value, label, onChange, options, error, ...props }) => {
  return (
    <FormControl fullWidth error={Boolean(error)} variant="outlined">
      {label && <InputLabel>{label}</InputLabel>}
      <Select onChange={(e) => onChange?.(e.target.value)} value={value} sx={{ width: '100%' }} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
