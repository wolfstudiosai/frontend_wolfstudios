'use client';

import { useState, useMemo } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    Popover,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const extractMeta = (metaArray) => {
    const map = {};
    metaArray.forEach((item) => {
        const key = Object.keys(item)[0];
        map[key] = item[key];
    });
    return map;
};



export default function TableFilterBuilder({ metaData, filters, setFilters, handleFilterApply }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const metaMap = useMemo(() => extractMeta(metaData), [metaData]);
    const columnOptions = useMemo(() => Object.keys(metaMap), [metaMap]);

    const handleFilterChange = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;

        if (field === 'key') {
            const type = metaMap[value]?.type || '';
            newFilters[index].type = type;
            newFilters[index].operator = '';
            newFilters[index].value = '';
        } else if (field === 'operator') {
            newFilters[index].value = '';
        }

        setFilters(newFilters);
    };


    const handleAddCondition = () => {
        const defaultKey = columnOptions[0];
        const defaultType = metaMap[defaultKey]?.type || 'string';

        setFilters([
            ...filters,
            { key: defaultKey, type: defaultType, operator: '', value: '', gate: 'and' },
        ]);
    };


    const handleRemoveCondition = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApply = () => {
        handleFilterApply(filters);
        handleClose();
    };
    const open = Boolean(anchorEl);

    const renderValueField = (filter) => {
        const meta = metaMap[filter.key];
        if (!meta || ['is empty', 'is not empty'].includes(filter.operator)) return null;

        switch (meta.type) {
            case 'boolean':
                return (
                    <Autocomplete
                        disableClearable
                        options={meta.values || ['true', 'false']}
                        value={filter.value || ''}
                        onChange={(_, val) => handleFilterChange(filters.indexOf(filter), 'value', val || '')}
                        renderInput={(params) => (
                            <TextField fullWidth size="small" {...params} placeholder="Enter a value" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, minWidth: 150 } }} />
                        )}
                        sx={{ flex: 1 }}
                        slotProps={{ popper: { sx: { minWidth: 250 } } }}
                    />
                );
            case 'string':
            case 'relation':
            case 'number':
                return (
                    <TextField
                        placeholder="Enter a value"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(filters.indexOf(filter), 'value', e.target.value)}
                        sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        type={meta.type === 'number' ? 'number' : 'text'}
                    />
                );
            default:
                return null;
        }
    };


    return (
        <>
            <Button
                endIcon={<FilterListIcon />}
                size="small"
                variant="text"
                // color='transparent'
                onClick={handleOpen}
            >
                Filter
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box p={1.5} minWidth={350} maxWidth={650} sx={{ overflow: 'auto' }}>
                    <Stack spacing={1}>
                        {filters.length > 0 ? (
                            filters.map((filter, index) => {
                                const operators = metaMap[filter.key]?.operators || [];
                                return (
                                    <Stack key={index} direction="row" spacing={0} alignItems="center">
                                        <Box width={80}>
                                            {index === 0 ? (
                                                <Typography component="div" sx={{ width: 80, fontSize: 12 }}>
                                                    WHERE
                                                </Typography>
                                            ) : (
                                                <Autocomplete
                                                    disableClearable
                                                    options={['and', 'or']}
                                                    value={filter.gate || 'and'}
                                                    onChange={(_, val) => handleFilterChange(index, 'gate', val)}
                                                    renderInput={(params) => (
                                                        <TextField size="small" {...params}
                                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                                    )}
                                                    sx={{ width: '100%' }}
                                                />
                                            )}
                                        </Box>

                                        <Autocomplete
                                            disableClearable
                                            options={columnOptions}
                                            value={filter.key}
                                            onChange={(_, val) => handleFilterChange(index, 'key', val)}
                                            renderInput={(params) => (
                                                <TextField size="small" {...params} placeholder="Select Column" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                            )}
                                            sx={{ minWidth: 150 }}
                                            slotProps={{ popper: { sx: { minWidth: 250 } } }}
                                        />

                                        <Autocomplete
                                            disableClearable
                                            options={operators}
                                            value={filter.operator}
                                            onChange={(_, val) => handleFilterChange(index, 'operator', val)}
                                            renderInput={(params) => (
                                                <TextField size="small" {...params} placeholder="Select Condition" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                            )}
                                            sx={{ minWidth: 150 }}
                                            disabled={!filter.key}
                                            slotProps={{ popper: { sx: { minWidth: 250 } } }}
                                        />

                                        {renderValueField(filter)}

                                        <IconButton color="error" onClick={() => handleRemoveCondition(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                );
                            })
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="body2" fontWeight="500">No filter conditions are applied</Typography>
                            </Box>
                        )}

                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                            <Button variant="text" onClick={handleAddCondition} size="small" sx={{ width: '120px', px: 1 }}>
                                + Add condition
                            </Button>
                            <Button variant="contained" onClick={handleApply} size="small" sx={{ width: '120px', px: 1 }}>Apply</Button>
                        </Box>
                    </Stack>
                </Box>
            </Popover>
        </>
    );
}
