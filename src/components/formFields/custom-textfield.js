import { FormControl, TextField } from '@mui/material';

export const CustomTextField = ({ name, value, label, onChange, error, ...props }) => {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <TextField {...props} name={name} label={label} value={value} onChange={(e) => onChange?.(e.target.value)} />
    </FormControl>
  );
};
