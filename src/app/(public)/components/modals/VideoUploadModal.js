import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

export const VideoUploadModal = ({ open, onClose, onSave, title, existingVideoUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(existingVideoUrl || '');

  useEffect(() => {
    if (existingVideoUrl && open) {
      setVideoPreview(existingVideoUrl);
    }
  }, [existingVideoUrl, open]);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleRemoveVideo = () => {
    setSelectedFile(null);
    setVideoPreview('');
  };

  const handleClose = () => {
    setSelectedFile(null);
    setVideoPreview('');
    onClose();
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
    } else if (videoPreview) {
      onSave(videoPreview); // fallback
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: isMobile ? '90%' : 500,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          mx: 'auto',
          mt: '5%',
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>

        <Box
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 1,
            p: 2,
            height: 250,
            textAlign: 'center',
            cursor: 'pointer',
            mb: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f9f9f9',
          }}
        >
          {!videoPreview && (
            <Typography variant="body2">
              Drag and drop your video here or{' '}
              <label htmlFor="upload-video" style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>
                browse
              </label>
              .
            </Typography>
          )}

          <input
            type="file"
            accept="video/*"
            id="upload-video"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {videoPreview && (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <video
                src={videoPreview}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 4,
                }}
              />
              <IconButton
                size="small"
                onClick={handleRemoveVideo}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!videoPreview} variant="contained">
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
