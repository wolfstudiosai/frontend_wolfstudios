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


export default function TableFilterBuilder({ metaMap, filters, setFilters }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const columnOptions = useMemo(() => Object.keys(metaMap), [metaMap]);

    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        // Reset dependent fields
        if (key === 'column') {
            newFilters[index].condition = '';
            newFilters[index].value = '';
        } else if (key === 'condition') {
            newFilters[index].value = '';
        }
        setFilters(newFilters);
    };

    const handleAddCondition = () => {
        setFilters([...filters, { column: columnOptions[0], condition: '', value: '' }]);
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

    const open = Boolean(anchorEl);

    const renderValueField = (filter) => {
        const meta = metaMap[filter.column];
        if (!meta || ['is empty', 'is not empty'].includes(filter.condition)) return null;

        switch (meta.type) {
            case 'boolean':
                return (
                    <Autocomplete
                        disableClearable
                        size='small'
                        options={meta.values || ['true', 'false']}
                        value={filter.value || ''}
                        onChange={(_, val) => handleFilterChange(filters.indexOf(filter), 'value', val || '')}
                        renderInput={(params) => <TextField size='small' {...params} placeholder="Enter a value" />}
                        sx={{ minWidth: 150 }}
                        slotProps={{
                            popper: {
                                sx: {
                                    minWidth: 220,
                                },
                            },
                        }}
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
                        sx={{ minWidth: 150 }}
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
                startIcon={<FilterListIcon />}
                size="small"
                variant="text"
                color='transparent'
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
                <Box p={1.5} minWidth={350} maxWidth={600} sx={{ overflow: 'auto' }}>
                    <Stack spacing={2}>
                        {filters.length > 0 ? filters.map((filter, index) => {
                            const operators = metaMap[filter.column]?.operators || [];
                            return (
                                <Stack
                                    key={index}
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Autocomplete
                                        disableClearable
                                        size='small'
                                        options={columnOptions}
                                        value={filter.column}
                                        onChange={(_, val) => handleFilterChange(index, 'column', val || '')}
                                        renderInput={(params) => <TextField size='small' {...params} placeholder="Select Column" />}
                                        sx={{ minWidth: 150 }}
                                        slotProps={{
                                            popper: {
                                                sx: {
                                                    minWidth: 220,
                                                },
                                            },
                                        }}
                                    />

                                    <Autocomplete
                                        disableClearable
                                        options={operators}
                                        value={filter.condition}
                                        onChange={(_, val) => handleFilterChange(index, 'condition', val || '')}
                                        renderInput={(params) => <TextField size='small' {...params} placeholder="Select Condition" />}
                                        sx={{ minWidth: 150 }}
                                        disabled={!filter.column}
                                        slotProps={{
                                            popper: {
                                                sx: {
                                                    minWidth: 220,
                                                },
                                            },
                                        }}
                                    />

                                    {renderValueField(filter)}

                                    {filters.length > 1 && (
                                        <IconButton color="error" onClick={() => handleRemoveCondition(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Stack>
                            );
                        }) : (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" fontWeight="500">No filter conditions are applied</Typography>
                            </Box>
                        )}

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Button variant="text" onClick={handleAddCondition} size="small" sx={{ width: '120px', px: 1 }}>
                                + Add condition
                            </Button>
                            <Button variant="contained" onClick={handleClose} size="small" sx={{ width: '120px', px: 1 }}>Apply</Button>
                        </Box>
                    </Stack>
                </Box>
            </Popover>
        </>
    );
}
