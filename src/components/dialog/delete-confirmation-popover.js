import React from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';

export const DeleteConfirmationPopover = ({ onDelete, title, disabled = false }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={handleOpen} title="Delete" disabled={disabled}>
        <Delete />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 250 }}>
          <Typography variant="body2" gutterBottom >
            {title}
          </Typography>
          
          <Box display="flex" justifyContent="end" mt={1}>
          <Button size="small" variant="text" onClick={handleClose}>
            Cancel
          </Button>
            <Button size="small" variant="contained" color="error" onClick={handleConfirm}>
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
