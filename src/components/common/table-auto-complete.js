'use client'

import { Autocomplete, Chip, TextField } from '@mui/material';
import { getPartnerListAsync } from '/src/app/(public)/partner/_lib/partner.actions';
import { getPortfolioCategoryListAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';
import { useEffect, useState } from 'react';
import { getCountryListAsync, getStateListAsync, getCaseStudyListAsync } from '/src/lib/common.actions';
import { useDebounce } from '/src/hooks/use-debounce';

const fetchOptions = async (key, searchValue) => {
    let options = [];
    if (key === "partnerHQ") {
        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 20 });
        if (partnerResponse?.success) {
            options = partnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
        }
    }

    if (key === "portfolioCategories") {
        const categoryResponse = await getPortfolioCategoryListAsync({ page: 1, rowsPerPage: 20 });
        if (categoryResponse?.success) {
            options = categoryResponse.data.map((item) => ({ value: item.id, label: item.Name }));
        }
    }

    if (key === "country") {
        const countryResponse = await getCountryListAsync({ page: 1, rowsPerPage: 20 }, searchValue);
        if (countryResponse?.success) {
            options = countryResponse.data.map((item) => ({ value: item.id, label: item.Name }));
        }
    }

    if (key === "states") {
        const stateResponse = await getStateListAsync({ page: 1, rowsPerPage: 20 }, searchValue);
        if (stateResponse?.success) {
            options = stateResponse.data.map((item) => ({ value: item.id, label: item.Name }));
        }
    }

    if (key === "caseStudies") {
        const caseStudyResponse = await getCaseStudyListAsync({ page: 1, rowsPerPage: 100 }, searchValue);
        if (caseStudyResponse?.success) {
            options = caseStudyResponse.data.map((item) => ({ value: item.id, label: item.Name }));
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
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const getOptions = async () => {
            setLoading(true);
            const options = await fetchOptions(filterKey, debounceValue);
            setOptions(options);
            setLoading(false);
        }
        if (operators.includes(operator)) {
            getOptions();
        }
    }, [filterKey, operator, debounceValue]);

    return (
        <Autocomplete
            disableClearable
            multiple={multiple}
            options={options}
            disabled={!operators.includes(operator)}
            loading={loading}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option?.label || ''
            }
            isOptionEqualToValue={(option, value) => option.value === value.value}
            value={multiple ? (value || []) : value || null}
            onChange={(event, newValue) => onChange?.(event, newValue)}
            onInputChange={(event, newValue) => setSearchValue(newValue)}
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
