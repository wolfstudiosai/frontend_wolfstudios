'use client';

import { useState, useMemo } from 'react';
import {
    Button,
    IconButton,
    Popover,
    Box,
    Stack,
    Autocomplete,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Iconify } from '/src/components/iconify/iconify';

const TableSortBuilder = ({ allColumns, sort, setSort }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchColumns, setSearchColumns] = useState(allColumns);

    const columns = useMemo(
        () =>
            allColumns.filter(
                (col) => col.type === 'string' || col.type === 'number' || col.type === 'date'
            ),
        [allColumns]
    );

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSortChange = (value, key) => {
        if (!sort[0]) return;
        const updated = { ...sort[0], [key]: key === 'key' ? value.columnName : value.value };
        setSort([updated]);
    };

    const handleRemoveSort = () => {
        setSort([]);
    };

    console.log(sort);

    const handleColumnSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredColumns = columns.filter((col) => col.label.toLowerCase().includes(searchValue));
        setSearchColumns(filteredColumns);
    };

    return (
        <>
            <Button
                startIcon={<Iconify icon="si:swap-vert-duotone" width={16} height={16} />}
                variant="text"
                size="small"
                onClick={handleOpen}
            >
                Sort
            </Button>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box minWidth={300} maxWidth={570} sx={{ overflow: 'auto' }}>
                    {sort.length > 0 ? (
                        <Typography variant="body2" fontWeight="500" sx={{ p: 2, pb: 0, color: 'text.secondary' }}>
                            Sort by
                        </Typography>
                    ) : (
                        <Box sx={{ p: 1.5, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
                            <TextField
                                fullWidth
                                placeholder="Find fields..."
                                variant="outlined"
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                                onChange={(e) => handleColumnSearch(e)}
                            />
                        </Box>
                    )}
                    <Stack spacing={1}>
                        {sort.length > 0 ? (
                            <Stack p={2} width={570} direction="row" spacing={0} alignItems="center">
                                <Autocomplete
                                    disableClearable
                                    options={columns}
                                    value={columns.find((col) => col.columnName === sort[0].key) || null}
                                    onChange={(_, val) => handleSortChange(val, 'key')}
                                    getOptionLabel={(option) => option.label || ''}
                                    isOptionEqualToValue={(option, value) =>
                                        option.columnName === value.columnName
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            size="small"
                                            {...params}
                                            placeholder="Select Column"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                                        />
                                    )}
                                    sx={{
                                        minWidth: 250,
                                        '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                                            right: 0
                                        }
                                    }}
                                />

                                <Autocomplete
                                    disableClearable
                                    options={[
                                        { label: 'Ascending', value: 'asc' },
                                        { label: 'Descending', value: 'desc' }
                                    ]}
                                    value={
                                        sort[0].order
                                            ? { label: sort[0].order === 'asc' ? 'Ascending' : 'Descending', value: sort[0].order }
                                            : null
                                    }
                                    onChange={(_, val) => handleSortChange(val, 'order')}
                                    getOptionLabel={(option) => option.label || ''}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    renderInput={(params) => (
                                        <TextField
                                            size="small"
                                            {...params}
                                            placeholder="Select Order"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                                        />
                                    )}
                                    sx={{
                                        minWidth: 250,
                                        '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                                            right: 0
                                        }
                                    }}
                                />
                                <IconButton onClick={handleRemoveSort}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        ) : (
                            <Stack sx={{ width: '100%', maxHeight: 350, overflowY: 'auto', scrollbarWidth: 'thin' }}>
                                {searchColumns.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="text"
                                        size="small"
                                        color="inherit"
                                        sx={{
                                            width: '100%',
                                            justifyContent: 'start',
                                            px: 2,
                                            '&:hover': { backgroundColor: 'action.hover' }
                                        }}
                                        onClick={() => setSort([{ key: item.columnName, order: 'asc' }])}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Box>
            </Popover>
        </>
    );
};

export default TableSortBuilder;
