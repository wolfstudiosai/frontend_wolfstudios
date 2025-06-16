'use client'

import { Autocomplete, Chip, TextField } from '@mui/material';
import { getPartnerListAsync } from '/src/app/(public)/partner/_lib/partner.actions';
import { useEffect, useState } from 'react';

const fetchOptions = async (key) => {
    let options = [];
    if (key === "partnerHQ") {
        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
        if (partnerResponse?.success) {
            options = partnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
        }
    }
    return options;
}

const operators = ["has any of", "has none of"];

export default function TableAutoComplete({
    multiple,
    value,
    filterKey,
    operator,
    onChange,
}) {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getOptions = async () => {
            const options = await fetchOptions(filterKey);
            setOptions(options);
        };
        if (operators.includes(operator)) {
            getOptions();
        }
    }, [filterKey, operator]);

    // console.log(options);

    return (
        <Autocomplete
            disableClearable
            multiple={multiple}
            options={options}
            disabled={!operators.includes(operator)}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option?.label || ''
            }
            isOptionEqualToValue={(option, value) => option.value === value.value}
            value={multiple ? (value || []) : value || null}
            onChange={(event, newValue) => onChange?.(event, newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    return (
                        <Chip
                            key={option.value}
                            size="small"
                            color="inherit"
                            label={option.label}
                            {...tagProps}
                            sx={{ borderRadius: '2px' }}
                        />
                    );
                })
            }
            renderInput={(params) => <TextField {...params} />}
            sx={{
                width: 250,
                '& .MuiOutlinedInput-root': { borderRadius: 0 },
                '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': { right: 0 },
            }}
        />
    );
}
