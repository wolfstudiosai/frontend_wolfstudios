import React from 'react';
import { Button, FormControl, MenuItem, Select } from '@mui/material';

import { CustomSelect } from '/src/components/formFields/custom-select';

import { FilterPopover, useFilterContext } from '../filter-button';

export function StatusFilterPopover({ options }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by status">
      <CustomSelect value={value} onChange={(value) => setValue(value)} name="status" options={options} />

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
