'use client'

import { Autocomplete, Chip, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getContentListAsync } from '/src/app/(private)/all-content/_lib/all-content.actions';
import { getCampaignListAsync } from '/src/app/(public)/campaign/_lib/campaign.actions';
import { getPartnerListAsync } from '/src/app/(public)/partner/_lib/partner.actions';
import { getPortfolioCategoryListAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';
import { getProductionListAsync } from '../../app/(public)/production/_lib/production.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';
import { useDebounce } from '/src/hooks/use-debounce';
import {
    getCaseStudyListAsync,
    getCityListAsync,
    getCountryListAsync,
    getProductListAsync,
    getRetailPartnerListAsync,
    getStakeHolderListAsync,
    getStateListAsync,
    getTagListAsync
} from '../../actions/common.actions';

const fetchOptions = async (key, searchValue) => {
    const getNameMapping = (item) => ({ value: item.id, label: item.name });

    const configMap = {
        partnerHQ: {
            fetch: getPartnerListAsync,
            filterable: true
        },
        partners: {
            fetch: getPartnerListAsync,
            filterable: true
        },
        proposedPartners: {
            fetch: getPartnerListAsync,
            filterable: true
        },
        contributedPartners: {
            fetch: getPartnerListAsync,
            filterable: true
        },
        portfolioCategories: {
            fetch: getPortfolioCategoryListAsync,
            filterable: true
        },
        campaigns: {
            fetch: getCampaignListAsync
        },
        caseStudies: {
            fetch: getCaseStudyListAsync
        },
        cities: {
            fetch: getCityListAsync
        },
        country: {
            fetch: getCountryListAsync
        },
        contentHQ: {
            fetch: getContentListAsync,
            filterable: true
        },
        states: {
            fetch: getStateListAsync
        },
        stakeholders: {
            fetch: getStakeHolderListAsync
        },
        tags: {
            fetch: getTagListAsync
        },
        retailPartners: {
            fetch: getRetailPartnerListAsync
        },
        retailPartners2: {
            fetch: getRetailPartnerListAsync
        },
        retailPartners3: {
            fetch: getRetailPartnerListAsync
        },
        product: {
            fetch: getProductListAsync
        },
        products: {
            fetch: getProductListAsync
        },
        spaces: {
            fetch: getSpaceListAsync,
            filterable: true
        },
        productionHQ: {
            fetch: getProductionListAsync,
            filterable: true
        }
    };

    const config = configMap[key];
    if (!config) return [];

    const { fetch, filterable = false } = config;

    let response;
    const paging = { page: 1, rowsPerPage: 20 };

    if (filterable && searchValue) {
        const filters = [{ key: "Name", type: "string", operator: "contains", value: searchValue }];
        response = await fetch(paging, filters, 'and');
    } else {
        response = await fetch(paging, searchValue);
    }

    return response?.success ? response.data.map(getNameMapping) : [];
};


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
        let active = true;

        const getOptions = async () => {
            setLoading(true);
            const options = await fetchOptions(filterKey, debounceValue);

            if (active) {
                setOptions(options);
                setLoading(false);
            }
        };

        if (operators.includes(operator)) {
            getOptions();
        }

        return () => {
            active = false;
        };
    }, [filterKey, operator, debounceValue]);

    const normalizedValue = useMemo(() => {
        if (!value) return multiple ? [] : null;
        const ids = Array.isArray(value) ? value : [value];
        const matched = options.filter((opt) => ids.includes(opt.value));
        return multiple ? matched : matched[0] || null;
    }, [value, options, multiple]);

    const handleChange = (event, newValue) => {
        const result = multiple
            ? newValue.map((opt) => opt.value)
            : newValue?.value ?? null;
        onChange?.(event, result);
        setSearchValue('');
    };

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
            value={normalizedValue}
            onChange={handleChange}
            inputValue={searchValue}
            onInputChange={(event, newValue, reason) => {
                if (reason === 'input') {
                    setSearchValue(newValue);
                }
            }}
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
