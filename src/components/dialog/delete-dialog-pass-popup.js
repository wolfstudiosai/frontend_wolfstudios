import React, { useRef, useState } from 'react';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const DeleteConfirmationPasswordPopover = ({
  id,
  title,
  deleteFn,
  passwordInput = false,
  disabled,
  onDelete,
}) => {
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const anchorRef = useRef(null);

  const handleConfirm = async () => {
    if (passwordInput && !password) return;

    setLoading(true);
    setError('');
    try {
      const res = await deleteFn(id, passwordInput ? password : null);
      console.log(res);
      if (res.success) {
        setOpen(false);
        setPassword('');
        onDelete();
      } else {
        setError(res.error?.message || 'Deletion failed');
      }
    } catch (err) {
      console.log(err);
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)} title="Delete" disabled={disabled} color="error">
        <Iconify icon="ic:outline-delete" width={24} height={24} color="error" />
      </IconButton>

      <Popover
        open={open}
        onClose={() => {
          setOpen(false);
          setPassword('');
          setError('');
        }}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>

          {passwordInput && (
            <TextField
              fullWidth
              type="password"
              label="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              disabled={loading}
            />
          )}

          {error && (
            <Typography variant="caption" color="error" sx={{ mb: 1, display: 'block' }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="text" onClick={() => setOpen(false)} size="small" disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirm}
              disabled={(passwordInput && !password) || loading}
              size="small"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
