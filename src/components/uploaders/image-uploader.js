'use client';

import { Close, Visibility } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

import { Iconify } from '../iconify/iconify';

export const ImageUploader = ({ value, onFileSelect, onDelete, disabled = false }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handlePreviewFile = () => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      window.open(fileUrl, '_blank');
    }
  };
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
        py: .3,
        px: 2
      }}
    >
      {!selectedFile ? (
        <Button
          component="label"
          variant="text"
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
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
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
            {selectedFile.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={handlePreviewFile} size="small" color="primary">
              <Visibility />
            </IconButton>
            <IconButton onClick={handleRemoveFile} size="small" color="error">
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
