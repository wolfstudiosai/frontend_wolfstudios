import React from 'react';
import { Button, Checkbox, FormControl, ListItemText, MenuItem, TextField, useTheme } from '@mui/material';

import { FilterPopover, useFilterContext } from '../filter-button';

export function HideColumsPopover() {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const theme = useTheme();

  const handleChange = (fieldName) => {
    setValue((prevValue) => {
      if (prevValue.includes(fieldName)) {
        return prevValue.filter((name) => name !== fieldName);
      } else {
        return [...prevValue, fieldName];
      }
    });
  };

  const handleSearchChange = (event) => {
    event.stopPropagation();
    setSearch(event.target.value);
  };

  const handleFocus = (event) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape') {
      event.stopPropagation();
    }
  };
  React.useEffect(() => {
    const storedHiddenColumns = localStorage.getItem('hiddenColumns');
    if (storedHiddenColumns) {
      setValue(JSON.parse(storedHiddenColumns));
    } else if (initialValue) {
      setValue(initialValue.map((name) => name.field));
    }
  }, [initialValue]);

  React.useEffect(() => {
    if (value.length > 0) {
      localStorage.setItem('hiddenColumns', JSON.stringify(value));
    }
  }, [value]);

  const filteredOptions = initialValue.filter((name) => name.field.toLowerCase().includes(search.toLowerCase()));

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="*Selected columns will be visible">
      <FormControl
        sx={{
          height: 300,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#303030' : '#f0f0f0',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#606060' : '#c0c0c0',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#909090' : '#a0a0a0',
          },
          pr: 1,
        }}
      >
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          onKeyDown={handleKeyDown}
          sx={{ mb: 1 }}
        />
        {filteredOptions.map((name) => (
          <MenuItem key={name.field} value={name.field} onClick={() => handleChange(name.field)}>
            <Checkbox checked={value.includes(name.field)} />
            <ListItemText primary={name.field} />
          </MenuItem>
        ))}
      </FormControl>

      <Button
        onClick={() => {
          onApply(value);
        }}
        variant="contained"
      >
        Apply
      </Button>
    </FilterPopover>
  );
}
