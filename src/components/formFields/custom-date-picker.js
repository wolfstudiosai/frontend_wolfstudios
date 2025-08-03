'use client';

import { FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const CustomDatePicker = ({ format = 'YYYY-MM-DD', label, error, value, onChange }) => {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <DatePicker
        format={format}
        label={label}
        onChange={(newValue) => {
          if (newValue) {
            const formattedDate = newValue.format(format);
            onChange(formattedDate);
          }
        }}
        value={value ? dayjs(value, format) : null}
      />
    </FormControl>
  );
};
