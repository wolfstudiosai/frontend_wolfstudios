'use client';

import { Autocomplete, Chip, FormControl, InputLabel, TextField } from '@mui/material';

export const CustomAutoComplete = ({ value, label, size, multiple, placeholder, onChange, options, error, ...props }) => {
    return (
        <FormControl fullWidth error={Boolean(error)}>
            <InputLabel>{label}</InputLabel>
            <Autocomplete
                multiple={multiple}
                options={options}
                getOptionLabel={(option) => option.label}
                onChange={onChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const tagProps = getTagProps({ index });
                        const { key, ...rest } = tagProps;
                        return (
                            <Chip
                                key={key}
                                size="small"
                                color="inherit"
                                label={option.label}
                                {...rest}
                                sx={{ borderRadius: '20px' }}
                            />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField
                        sx={{ mt: 0.8 }}
                        {...params}
                    />
                )}
            />
        </FormControl>
    );
};
