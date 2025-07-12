'use client';

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CustomSelect = ({ value, label, onChange, options, error, ...props }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    //  ONLY "true"/"false" strings to booleans
    const processedValue = newValue.toLowerCase() === 'true' ? true : newValue === 'false' ? false : newValue;

    onChange?.(processedValue);
  };
  return (
    <FormControl fullWidth error={Boolean(error)} variant="outlined">
      {label && <InputLabel>{label}</InputLabel>}
      <Select onChange={handleChange} value={value} sx={{ width: '100%' }} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
