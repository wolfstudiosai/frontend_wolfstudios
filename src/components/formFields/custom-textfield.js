import { FormControl, TextField } from '@mui/material';

export const CustomTextField = ({ name, value, label, onChange, error, type = 'text', ...props }) => {
  const displayValue = type === 'number' && (value === 0 || value === '0') ? '' : value;

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <TextField
        {...props}
        name={name}
        type={type}
        label={label}
        value={displayValue}
        onChange={onChange}
        slotProps={{
          input: {
            ...(type === 'number' && {
              inputMode: 'numeric',
              pattern: '[0-9]*',
              style: {
                MozAppearance: 'textfield',
              },
            }),
          },
        }}
        sx={
          type === 'number'
            ? {
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            }
            : {}
        }
      />
    </FormControl>
  );
};
