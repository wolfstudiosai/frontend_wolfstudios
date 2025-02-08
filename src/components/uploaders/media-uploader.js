import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { api } from '@/utils/api';
import { isVideoContent, pxToRem } from '@/utils/helper';
import { Iconify } from '../iconify/iconify';

export const MediaUploader = ({ open, onClose, onSave, multiple = true }) => {
  const [tab, setTab] = React.useState(0);
  const [urls, setUrls] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [videoUrls, setVideoUrls] = React.useState([]);


  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleAddUrl = () => {
    if (isVideoContent(url)) {
      if (url.trim() && !videoUrls.includes(url.trim())) {
        setVideoUrls([...videoUrls, url.trim()]);
      }
    } else {
      if (url.trim() && !urls.includes(url.trim())) {
        setUrls([...urls, url.trim()]);
      }
    }
    setUrl('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isVideoContent(url)) {
        if (url.trim() && !videoUrls.includes(url.trim())) {
          setVideoUrls([...videoUrls, url.trim()]);
        }
      } else {
        if (url.trim() && !urls.includes(url.trim())) {
          setUrls([...urls, url.trim()]);
        }
      }
      setUrl('');
    }
  };

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    setFiles(multiple ? [...files, ...Array.from(event.target.files)] : Array.from(event.target.files));
  };

  const handleRemoveFile = (item) => {
    if (typeof item === 'string') {
      if (isVideoContent(item)) {
        setVideoUrls(videoUrls.filter((url) => url !== item));
      } else {
        setUrls(urls.filter((url) => url !== item));
      }
    } else {
      setFiles(files.filter((file) => file?.name !== item?.name));
    }
  };

  const handleSave = async () => {
    setUploading(true)
    try {
      const uploadedPaths = [];
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });
        const res = await api.post('/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res?.data?.success && res?.data?.data?.length > 0) {
          res?.data?.data?.forEach((item) => {
            uploadedPaths.push(item?.path);
          })
        }
      }
      onSave([...uploadedPaths, ...urls, ...videoUrls]);
      handleClose();
      setUploading(false)
    } catch (err) {
      console.error(err);
      setUploading(false)
    }
    setUploading(false)
  };

  const handleClose = () => {
    setUrls([]);
    setFiles([]);
    setVideoUrls([]);
    setUrl('');
    setUploading(false);
    onClose();
  };

  const uploadFileToServer = async (file) => {
    // Placeholder for API call
    return new Promise((resolve) => setTimeout(() => resolve(URL.createObjectURL(file)), 1000));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add image/video</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Image" />
          <Tab label="Video" />
        </Tabs>
        <Box mt={2}>
          {tab === 0 && (
            <>
              <Stack direction='row' gap={2}>
                <Button
                  component="label"
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '50%',
                    color: '#888',
                    px: 2,
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                >
                  <Stack direction="row" gap={1}>
                    <Iconify icon="akar-icons:cloud-upload" width={24} height={24} />
                    <Typography>Upload Image</Typography>
                  </Stack>
                  <input type="file" accept='image/*' hidden multiple={multiple} onChange={handleFileChange} />
                </Button>
                <TextField
                  value={url || ''}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleAddUrl()} edge="end">
                          <Iconify icon="ic:round-plus" width={24} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '50%' }}
                />
              </Stack>
              <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
                {
                  [...files, ...urls].map((item, index) => (
                    <Box key={index} sx={{ width: '19.2%', position: 'relative' }}>
                      <Box component='img' src={typeof item === 'string' ? item : URL.createObjectURL(item)} sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 1 }} />
                      <IconButton
                        size='small'
                        sx={{ position: 'absolute', top: 5, right: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}
                        onClick={() => handleRemoveFile(item)}
                      >
                        <Iconify icon="ic:round-close" width={18} height={18} />
                      </IconButton>
                    </Box>
                  ))
                }
              </Stack>
            </>
          )}
          {tab === 1 && (
            <>
              <TextField
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleAddUrl()} edge="end">
                        <Iconify icon="ic:round-plus" width={24} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
                {
                  videoUrls.map((item, index) => (
                    <Box key={index} sx={{ width: '49.5%', position: 'relative' }}>
                      <Box
                        component="video"
                        src={item}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        sx={{
                          height: pxToRem(500),
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                        }}
                      />
                      <IconButton
                        size='small'
                        sx={{ position: 'absolute', top: 5, right: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}
                        onClick={() => handleRemoveFile(item)}
                      >
                        <Iconify icon="ic:round-close" width={18} height={18} />
                      </IconButton>
                    </Box>
                  ))
                }
              </Stack>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="outlined" size="small" onClick={handleSave} color="primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
