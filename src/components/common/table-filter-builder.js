'use client';

import { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Autocomplete, Box, Button, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';
import TableAutoComplete from './table-auto-complete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { validateFilters } from '/src/utils/helper';

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
    handleRemoveFilterCondition,
    handleClearFilters,
  }
) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');
  const metaMap = useMemo(() => extractMeta(metaData), [metaData]);
  const columnOptions = useMemo(() => metaData.map(item => {
    const columnName = Object.keys(item)[0];
    const label = item[columnName].label;
    return { label, columnName };
  }), [metaData]);

  const handleFilterChange = (index, field, value) => {
    const updatedFilters = [...filters];
    const currentFilter = { ...updatedFilters[index] };

    if (field === 'value') {
      if (currentFilter.type === 'relation') {
        currentFilter.value = Array.isArray(value)
          ? value
          : value
            ? [value]
            : [];
      } else {
        currentFilter.value = value;
      }
    }

    if (field === 'key') {
      const type = metaMap[value]?.type || '';
      currentFilter.key = value;
      currentFilter.type = type;
      currentFilter.value = type === 'relation' ? [] : '';
      currentFilter.depth = type === 'relation' ? metaMap[value]?.depth || '' : '';

      const validOperatorsByType = {
        string: ["contains", "does not contain", "is", "is not", 'is empty', 'is not empty'],
        number: [
          "equal to",
          "not equal to",
          "is empty",
          "is not empty",
          "greater than",
          "less than",
          "greater than equal to",
          "less than equal to"
        ],
        date: [
          "is",
          "is not",
          "is empty",
          "is not empty"
        ],
        images: ['is empty', 'is not empty'],
        boolean: ['is', 'is not'],
        relation: ['has any of', 'has none of', 'is empty', 'is not empty'],
      };

      const allowedOperators = validOperatorsByType[type] || [];
      currentFilter.operator = allowedOperators.includes(currentFilter.operator) ? currentFilter.operator : '';
    }

    if (field === 'operator') {
      currentFilter.operator = value;
      currentFilter.value = '';
    }

    if (field !== 'key' && field !== 'value' && field !== 'operator') {
      currentFilter[field] = value;
    }

    updatedFilters[index] = currentFilter;
    setFilters(updatedFilters);
  };


  const handleAddCondition = () => {
    const defaultKey = columnOptions[0].columnName;
    const defaultType = metaMap[defaultKey]?.type || 'string';
    const defaultOperator = metaMap[defaultKey]?.operators[0] || '';

    const newFilters = [...filters, { key: defaultKey, type: defaultType, operator: defaultOperator, value: '' }];

    setFilters(newFilters);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickApply = () => {
    const validFilters = validateFilters(filters);
    if (validFilters.valid) {
      handleFilterApply();
      handleClose();
      setError('');
    } else {
      setError(validFilters.message);
    }
  };

  const open = Boolean(anchorEl);

  // Render value field based on the type of the filter
  const renderValueField = (filter) => {
    const meta = metaMap[filter.key];
    if (!meta) return null;

    const isEmpty = filter.operator === 'is empty' || filter.operator === 'is not empty';
    if (meta.type === 'string' || meta.type === 'number') {
      if (meta.values) {
        return (
          <Autocomplete
            disableClearable
            options={meta.values}
            value={filter.value}
            onChange={(_, val) => handleFilterChange(filters.indexOf(filter), 'value', val)}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 }, }}
              />
            )}
            sx={{
              minWidth: 150,
              width: '100%',
              '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                right: 0,
              }
            }}
          />
        );
      } else {
        return (
          <TextField
            placeholder={isEmpty ? '' : 'Enter a value'}
            value={filter.value}
            disabled={isEmpty}
            onChange={(e) => handleFilterChange(filters.indexOf(filter), 'value', e.target.value)}
            sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            type={meta.type === 'number' ? 'number' : 'text'}
          />
        );
      }
    } else if (meta.type === 'relation') {
      return (
        <TableAutoComplete
          multiple={true}
          value={Array.isArray(filter.value) ? filter.value : filter.value ? [filter.value] : []}
          operator={filter.operator}
          filterKey={filter.key}
          onChange={(_, val) => handleFilterChange(currentFilters.indexOf(filter), 'value', val ?? [])}
        />

      );
    } else if (meta.type === 'images') {
      return (
        <TextField
          disabled
          sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
        />
      );
    } else if (meta.type === 'array') {
      return (
        <Autocomplete
          disableClearable
          multiple
          options={meta?.values || []}
          value={Array.isArray(filter.value) ? filter.value : []}
          disabled={isEmpty}
          onChange={(_, val) => handleFilterChange(currentFilters.indexOf(filter), 'value', val)}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 }, }}
            />
          )}
          sx={{
            minWidth: 150,
            width: '100%',
            '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
              right: 0,
            }
          }}
        />
      );
    } else if (meta.type === 'boolean') {
      return (
        <Autocomplete
          disableClearable
          options={["true", "false"]}
          value={filter.value}
          disabled={isEmpty}
          onChange={(_, val) => handleFilterChange(currentFilters.indexOf(filter), 'value', val)}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 }, }}
            />
          )}
          sx={{
            minWidth: 150,
            width: '100%',
            '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
              right: 0,
            }
          }}
        />
      );
    } else if (meta.type === 'date') {
      return (
        <DatePicker
          value={isEmpty ? null : dayjs(filter.value)}
          format={meta.format.toUpperCase()}
          disabled={isEmpty}
          onChange={(e) => handleFilterChange(currentFilters.indexOf(filter), 'value', dayjs(e).format(meta.format.toUpperCase()))}
          sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
      );
    } else {
      return null;
    }

  };

  // Render gate field based on the index
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 }, }}
              />
            )}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                right: 0,
              }
            }}
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
        startIcon={<FilterListIcon />}
        size="small"
        variant="text"
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
                      value={columnOptions.find(opt => opt.columnName === filter.key) || null}
                      onChange={(_, val) => handleFilterChange(index, 'key', val?.columnName)}
                      getOptionLabel={(option) => option.label || ''}
                      isOptionEqualToValue={(option, value) => option.columnName === value.columnName}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Select Column"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 }, }}
                        />
                      )}
                      sx={{
                        minWidth: 150,
                        '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                          right: 0,
                        }
                      }}
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
                          sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 0 },
                          }}
                        />
                      )}
                      sx={{
                        minWidth: 150,
                        '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                          right: 0,
                        }
                      }}
                      disabled={!filter.key}
                      slotProps={{ popper: { sx: { minWidth: 250 } } }}
                    />

                    {renderValueField(filter)}

                    <IconButton onClick={() => handleRemoveFilterCondition(index)}>
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
              <Button disabled={metaData.length < 1} variant="text" onClick={handleAddCondition} size="small" sx={{ width: '120px', px: 1 }}>
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
                  onClick={handleClickApply}
                  size="small"
                  sx={{ width: '120px', px: 1 }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
          </Stack>
        </Box>
      </Popover>
    </>
  );
}