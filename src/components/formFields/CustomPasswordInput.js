import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export function CustomPasswordInput({ value, onChange, error, onBlur, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </InputAdornment>
            }
            {...props}
        />
    );
}

CustomPasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
};
