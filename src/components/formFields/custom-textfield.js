import React from 'react';
import { FormControl, TextField } from '@mui/material';

export const CustomTextField = React.memo(({ name, value, label, onChange, error, ...props }) => {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <TextField {...props} name={name} label={label} value={value} onChange={onChange} />
    </FormControl>
  );
});
