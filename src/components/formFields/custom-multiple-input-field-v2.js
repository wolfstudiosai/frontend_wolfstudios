import React from 'react';
import { Icon } from '@iconify/react';
import { Box, Chip, IconButton, InputAdornment, TextField } from '@mui/material';

export const CustomMultipleInputFieldV2 = ({ name, label, value, setFieldValue, placeholder = '' }) => {
  const [currentValue, setCurrentValue] = React.useState('');
  const handleAdd = () => {
    if (!value?.includes(currentValue)) {
      setFieldValue(name, [...value, currentValue], { shouldValidate: true });
      setCurrentValue('');
    }
  };

  const handleRemove = (itemToRemove) => {
    setFieldValue(
      name,
      value?.filter((item) => item !== itemToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box>
      <TextField
        name={name}
        label={label}
        value={currentValue || ''}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAdd} disabled={!currentValue}>
                <Icon icon="mingcute:add-line" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
        {value?.map((item, index) => (
          <Chip key={index} label={item} onDelete={() => handleRemove(item)} color="primary" size="small" />
        ))}
      </Box>
    </Box>
  );
};
