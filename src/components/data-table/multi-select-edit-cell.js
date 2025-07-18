'use client';

import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { CustomMultipleSelect } from '/src/components/formFields/custom-multiple-select';
import Box from '@mui/material/Box';

export const MultiSelectEditCell = (props) => {
    const { id, value, field, options, error } = props;
    const apiRef = useGridApiContext();

    const handleSelectChange = (newValue) => {
        apiRef.current.setEditCellValue({ id, field, value: newValue });

        setTimeout(() => {
            apiRef.current.stopCellEditMode({ id, field });
        }, 100);
    };

    return (
        <Box sx={{
            p: 1,
            minHeight: 150,
            width: '100%',
            bgcolor: 'background.default',
            position: 'relative',
            overflowY: 'auto',
            zIndex: 1000,
        }}>
            <CustomMultipleSelect
                name={field}
                label=''
                value={value}
                onChange={(value) => handleSelectChange(value)}
                options={options}
                error={error}
            />
        </Box>
    );
}