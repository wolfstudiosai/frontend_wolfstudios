'use client';

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Chip, Box } from '@mui/material';

export const CustomMultipleSelect = ({ 
  value, 
  label, 
  onChange, 
  options, 
  error, 
  ...props 
}) => {
  return (
    <FormControl fullWidth error={Boolean(error)} variant="outlined">
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        onChange={(e) => onChange?.(e.target.value)}
        value={value || []}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              const option = options.find(opt => opt.value === value);
              return (
                <Chip 
                  key={value} 
                  label={option?.label || value} 
                  size="small" 
                />
              );
            })}
          </Box>
        )}
        sx={{ width: '100%' }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};