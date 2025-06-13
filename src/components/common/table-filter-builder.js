'use client';

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

export default function FilterBuilder({ columns, conditions, children, anchorEl, setAnchorEl, filters, setFilters }) {
    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        setFilters(newFilters);
    };

    const handleAddCondition = () => {
        setFilters([...filters, { column: '', condition: '', value: '' }]);
    };

    const handleRemoveCondition = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {/* Filter button */}
            {children}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box p={2} maxWidth={600} sx={{ overflow: 'auto' }}>
                    <Stack spacing={2}>
                        {filters.length > 0 ? filters.map((filter, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                alignItems="flex-end"
                            >
                                <Autocomplete
                                    options={columns}
                                    value={filter.column}
                                    onChange={(e, newValue) => handleFilterChange(index, 'column', newValue || '')}
                                    renderInput={(params) => <TextField {...params} label="Where" sx={{ minWidth: 150 }} />}
                                    disableClearable
                                    freeSolo={false}
                                    slotProps={{
                                        popper: {
                                            sx: {
                                                minWidth: 200,
                                            },
                                        },
                                    }}
                                />

                                <Autocomplete
                                    options={conditions}
                                    value={filter.condition}
                                    onChange={(e, newValue) => handleFilterChange(index, 'condition', newValue || '')}
                                    renderInput={(params) => <TextField {...params} label="Condition" sx={{ minWidth: 150 }} />}
                                    disableClearable
                                    freeSolo={false}
                                    slotProps={{
                                        popper: {
                                            sx: {
                                                minWidth: 200,
                                            },
                                        },
                                    }}
                                />

                                <TextField
                                    label="Enter a value"
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                                    sx={{ minWidth: 150 }}
                                    disabled={['is empty', 'is not empty'].includes(filter.condition)}
                                />

                                <IconButton color="error" onClick={() => handleRemoveCondition(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        )) : (
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
