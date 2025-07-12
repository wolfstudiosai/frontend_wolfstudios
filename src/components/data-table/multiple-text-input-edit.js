import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { CustomMultipleInputField } from '/src/components/formFields/custom-mulitple-input-field';

export const MultipleTextInputEditCell = (props) => {
    const { id, field, value = '', colDef } = props;
    const apiRef = useGridApiContext();
    const [currentData, setCurrentData] = React.useState('');

    const handleAdd = () => {
        if (!currentData.trim()) return;
        const newValue = Array.isArray(value)
            ? [...value, currentData.trim()]
            : [currentData.trim()];
        apiRef.current.setEditCellValue({ id, field, value: newValue });
        setCurrentData('');
    };

    const handleRemove = (removedItem) => {
        const newValue = Array.isArray(value)
            ? value.filter((item) => item !== removedItem)
            : [];
        apiRef.current.setEditCellValue({ id, field, value: newValue });
        setCurrentData('');
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
            <CustomMultipleInputField
                name={colDef?.inputProps?.name}
                label={colDef?.inputProps?.label}
                value={currentData}
                onchange={(e) => setCurrentData(e.target.value)}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                currentData={currentData}
                isSubmitting={colDef?.inputProps?.isSubmitting}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {value.map((item, index) => (
                    <Chip
                        key={index}
                        label={item}
                        onDelete={() => handleRemove(item)}
                        color="primary"
                        size="small"
                    />
                ))}
            </Box>
        </Box>
    );
};
