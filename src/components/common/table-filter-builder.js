'use client';

import { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Autocomplete, Box, Button, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';
import TableAutoComplete from './table-auto-complete';

const extractMeta = (metaArray) => {
  const map = {};
  metaArray.forEach((item) => {
    const key = Object.keys(item)[0];
    map[key] = item[key];
  });
  return map;
};

export default function TableFilterBuilder(
  {
    metaData,
    filters,
    setFilters,
    gate,
    setGate,
    handleFilterApply,
    handleFilterClear
  }
) {
  const [anchorEl, setAnchorEl] = useState(null);
  const metaMap = useMemo(() => extractMeta(metaData), [metaData]);
  const columnOptions = useMemo(() => Object.keys(metaMap), [metaMap]);

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;

    // Normalize value based on type or operator
    if (field === 'value' && newFilters[index].type === 'relation') {
      newFilters[index][field] = Array.isArray(value) ? value : value ? [value] : [];
    } else {
      newFilters[index][field] = value;
    }

    if (field === 'key') {
      const type = metaMap[value]?.type || '';
      newFilters[index].type = type;
      newFilters[index].operator = '';
      if (type === 'relation') {
        newFilters[index].value = [];
        newFilters[index].depth = columnOptions[index].depth || '';
      } else {
        newFilters[index].value = '';
      }
    } else if (field === 'operator') {
      newFilters[index].value = '';
    }

    setFilters(newFilters);
  };

  const handleAddCondition = () => {
    const defaultKey = columnOptions[0];
    const defaultType = metaMap[defaultKey]?.type || 'string';

    setFilters([...filters, { key: defaultKey, type: defaultType, operator: '', value: '', depth: '' }]);
  };

  const handleRemoveCondition = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (newFilters.length === 0) {
      handleClearFilters();
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Apply filters and close the popover
  const handleApply = () => {
    handleFilterApply();
    handleClose();
  };

  // Clear all filters and close the popover
  const handleClearFilters = () => {
    handleFilterClear();
    handleClose();
  };

  const open = Boolean(anchorEl);

  const renderValueField = (filter) => {
    const meta = metaMap[filter.key];
    if (!meta) return null;

    switch (meta.type) {
      case 'boolean':
        return (
          <Autocomplete
            disableClearable
            options={meta.values || ['true', 'false']}
            value={filter.value || ''}
            onChange={(_, val) => handleFilterChange(filters.indexOf(filter), 'value', val || '')}
            renderInput={(params) => (
              <TextField
                fullWidth
                size="small"
                {...params}
                placeholder="Enter a value"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, minWidth: 150 } }}
              />
            )}
            sx={{ flex: 1 }}
            slotProps={{ popper: { sx: { minWidth: 250 } } }}
          />
        );
      case 'string':
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

      case 'relation':
        return <TableAutoComplete
          multiple={true}
          value={Array.isArray(filter.value) ? filter.value : filter.value ? [filter.value] : []}
          operator={filter.operator}
          onChange={(_, val) => {
            // Ensure value is always an array
            handleFilterChange(filters.indexOf(filter), 'value', val ?? []);
          }}
        />
      default:
        return null;
    }
  };

  const renderGateField = (index) => {
    switch (index) {
      case 0:
        return (
          <Typography component="div" sx={{ width: 80, fontSize: 12 }}>
            WHERE
          </Typography>
        );
      case 1:
        return (
          <Autocomplete
            disableClearable
            options={['and', 'or']}
            value={gate}
            onChange={(_, val) => setGate(val)}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              />
            )}
            sx={{ width: '100%' }}
          />
        );
      default:
        return <Typography component="div" sx={{ width: 80, fontSize: 14 }}>
          {gate}
        </Typography>
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
        <Box p={1.5} minWidth={400} maxWidth={650} sx={{ overflow: 'auto' }}>
          <Stack spacing={1}>
            {filters.length > 0 ? (
              filters.map((filter, index) => {
                const operators = metaMap[filter.key]?.operators || [];
                return (
                  <Stack key={index} direction="row" spacing={0} alignItems="center">
                    <Box width={80}>
                      {renderGateField(index)}
                    </Box>

                    <Autocomplete
                      disableClearable
                      options={columnOptions}
                      value={filter.key}
                      onChange={(_, val) => handleFilterChange(index, 'key', val)}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Select Column"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />
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
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Select Condition"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />
                      )}
                      sx={{ minWidth: 150 }}
                      disabled={!filter.key}
                      slotProps={{ popper: { sx: { minWidth: 250 } } }}
                    />

                    {renderValueField(filter)}

                    <IconButton onClick={() => handleRemoveCondition(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                );
              })
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body2" fontWeight="500">
                  No filter conditions are applied
                </Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <Button variant="text" onClick={handleAddCondition} size="small" sx={{ width: '120px', px: 1 }}>
                + Add condition
              </Button>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Button
                  disabled={filters.length < 1}
                  variant="text"
                  color="error"
                  size="small"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
                <Button
                  disabled={filters.length < 1}
                  variant="contained"
                  onClick={handleApply}
                  size="small"
                  sx={{ width: '120px', px: 1 }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
