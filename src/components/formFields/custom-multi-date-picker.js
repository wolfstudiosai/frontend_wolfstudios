'use client';

import React from 'react';
import { Box, Button, FormControl, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export const CustomMultiDatePicker = ({
    label,
    value = [],
    format = 'MMMM YYYY',
    onChange,
    error,
}) => {
    const handleDateChange = (newDate, index) => {
        if (newDate && newDate.isValid()) {
            const updatedDates = [...value];
            updatedDates[index] = newDate.format(format);
            onChange(updatedDates);
        }
    };

    const handleAddDate = () => {
        const newDate = dayjs();
        if (newDate.isValid()) {
            onChange([...value, newDate.format(format)]);
        }
    };

    const handleRemoveDate = (index) => {
        const updatedDates = [...value];
        updatedDates.splice(index, 1);
        onChange(updatedDates);
    };

    return (
        <FormControl fullWidth error={Boolean(error)}>
            <Typography fontSize={14} fontWeight={500} gutterBottom>
                {label}
            </Typography>

            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                {value?.length > 0 && value?.map((val, idx) => {
                    return (
                        <Box key={idx} display="flex" alignItems="center" gap={1}>
                            <DatePicker
                                format={format}
                                value={dayjs(val, format)}
                                onChange={(newDate) => handleDateChange(newDate, idx)}
                                slotProps={{
                                    textField: {
                                        sx: { width: 200 },
                                    },
                                }}
                            />
                            <IconButton onClick={() => handleRemoveDate(idx)} color="error">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    );
                })}

                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddDate}
                    color="primary"
                >
                    Add Date
                </Button>
            </Box>
        </FormControl>
    );
};