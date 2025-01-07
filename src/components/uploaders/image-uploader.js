'use client';

import React from 'react';
import { Close, Visibility } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify/iconify';

export const ImageUploader = ({ value, onFileSelect, onDelete, disabled = false }) => {
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [fileInfo, setSelectedFileInfo] = React.useState({ name: '', size: 0 });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setSelectedFileInfo({ name: file.name, size: file.size });
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFileInfo({ name: '', size: 0 });
    setPreviewUrl(null);
    onDelete?.();
  };

  const handlePreviewFile = () => {
    if (previewUrl) {
      // const fileUrl = URL.createObjectURL(previewUrl);
      window.open(previewUrl, '_blank');
    }
  };

  React.useEffect(() => {
    if (!previewUrl) {
      if (typeof value === 'string') {
        setPreviewUrl(value);
      } else if (value instanceof File) {
        const imageUrl = URL.createObjectURL(value);
        setPreviewUrl(imageUrl);
      }
    }
  }, [value]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: 1,
        width: '100%',
        position: 'relative',
        py: 0.3,
        px: 2,
      }}
    >
      {!previewUrl ? (
        <Button
          component="label"
          variant="text"
          disabled={disabled}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            color: '#888',
            px: 2,
          }}
        >
          <Stack direction="row" gap={1}>
            <Iconify icon="akar-icons:cloud-upload" width={24} height={24} />
            <Typography>Upload Image</Typography>
          </Stack>
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </Button>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fileInfo.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={handlePreviewFile} size="small" color="primary">
              <Visibility />
            </IconButton>
            {onDelete && (
              <IconButton onClick={handleRemoveFile} size="small" color="error">
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
