'use client'

import { Autocomplete, Chip, TextField } from '@mui/material';
import { getPartnerListAsync } from '/src/app/(public)/partner/_lib/partner.actions';
import { getPortfolioCategoryListAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';
import { getCampaignListAsync } from '/src/app/(public)/campaign/_lib/campaign.actions';
import { useEffect, useState } from 'react';
import {
    getCountryListAsync,
    getStateListAsync,
    getCaseStudyListAsync,
    getStakeHolderListAsync,
    getRetailPartnerListAsync,
    getProductListAsync,
    getCityListAsync,
    getTagListAsync
} from '/src/lib/common.actions';
import { useDebounce } from '/src/hooks/use-debounce';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';
import { getContentList } from '/src/app/(private)/all-content/_lib/all-content.actions';

const fetchOptions = async (key, searchValue) => {
    const getNameMapping = (item) => ({ value: item.id, label: item.Name });

    const configMap = {
        partnerHQ: {
            fetch: getPartnerListAsync,
            filterable: true
        },
        partners: {
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
            fetch: getContentList,
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
        product: {
            fetch: getProductListAsync
        },
        products: {
            fetch: getProductListAsync
        },
        spaces: {
            fetch: getSpaceListAsync
        },
        // proposedPartners: {
        //     fetch: getProposedPartnerListAsync
        // }
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
