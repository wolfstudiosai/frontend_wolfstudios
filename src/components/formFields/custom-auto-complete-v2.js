'use client';

import { Autocomplete, Chip, FormControl, InputLabel, TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from '/src/hooks/use-debounce';

export const CustomAutoCompleteV2 = ({
    value,
    label,
    name = '',
    size = 'medium',
    multiple = false,
    placeholder,
    onChange,
    onFocus,
    error,
    fetchOptions,
    defaultOptions,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const debounceValue = useDebounce(searchValue, 500);
    const [loading, setLoading] = useState(false);
    const [autoCompleteOptions, setAutoCompleteOptions] = useState(defaultOptions);

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await fetchOptions(debounceValue);
                if (active) {
                    setAutoCompleteOptions(results);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (active) setLoading(false);
            }
        };

        if (debounceValue) {
            fetchData();
        } else {
            setAutoCompleteOptions(defaultOptions || []);
        }

        return () => {
            active = false;
        };
    }, [debounceValue, fetchOptions, defaultOptions]);



    return (
        <FormControl fullWidth error={Boolean(error)}>
            {label && <InputLabel shrink>{label}</InputLabel>}
            <Autocomplete
                multiple={multiple}
                options={autoCompleteOptions}
                getOptionLabel={(option) => option.label || ''}
                filterOptions={(x) => x}
                value={value}
                onChange={onChange}
                loading={loading}
                onInputChange={(event, newInputValue) => setSearchValue(newInputValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const tagProps = getTagProps({ index });
                        const { key, ...rest } = tagProps;
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
                renderInput={(params) => {
                    const { InputProps, ...rest } = params;
                    const { endAdornment, ...otherInputProps } = InputProps;

                    return (
                        <TextField
                            {...rest}
                            placeholder={placeholder}
                            variant="outlined"
                            size={size}
                            InputProps={{
                                ...otherInputProps,
                                endAdornment: (
                                    <>
                                        {loading && <CircularProgress color="inherit" size={16} />}
                                    </>
                                ),
                            }}
                            sx={{ mt: 0.8 }}
                        />
                    );
                }}
                onFocus={() => {
                    onFocus?.(name);
                }}
            />
        </FormControl>
    );
};
