'use client';

import { Autocomplete, Chip, FormControl, InputLabel, TextField } from '@mui/material';

export const CustomAutoComplete = ({
  value,
  label,
  name = '',
  size,
  multiple,
  placeholder,
  onChange,
  options,
  onFocus,
  error,
  ...props
}) => {

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={(option) => option.label || ''}
        value={value}
        onChange={(e, value) => onChange?.(value)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const tagProps = getTagProps({ index });
            const { key, ...rest } = tagProps;
            const label = options.find((o) => o.value === option)?.label || option;
            console.log(label);
            return (
              <Chip
                key={key}
                size="small"
                color="primary"
                label={option?.label}
                {...rest}
                sx={{ borderRadius: '20px' }}
              />
            );
          })
        }
        renderInput={(params) => <TextField sx={{ mt: 0.8 }} {...params} />}
        onFocus={() => {
          onFocus?.(name);
        }}
      />
    </FormControl>
  );
};
