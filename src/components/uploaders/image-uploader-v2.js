import React from 'react';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { Iconify } from '../iconify/iconify';

// interface ImageUploadDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (images: string[] | string) => void;
//   multiple?: boolean;
// }

export const ImageUploaderV2 = ({ open, onClose, onSave, multiple = false }) => {
  const [tab, setTab] = React.useState(0); // 0: Device, 1: URL
  const [urls, setUrls] = React.useState(['']);
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const handleRemoveUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    setFiles(multiple ? [...files, ...Array.from(event.target.files)] : Array.from(event.target.files));
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (tab === 0 && files.length > 0) {
      setUploading(true);
      const uploadedPaths = await Promise.all(files.map((file) => uploadFileToServer(file)));
      setUploading(false);
      onSave(multiple ? uploadedPaths : uploadedPaths[0]);
    } else if (tab === 1 && urls.length > 0) {
      onSave(multiple ? urls : urls[0]);
    }
    handleClose();
  };

  const handleClose = () => {
    setUrls([]);
    setFiles([]);
    setUploading(false);
    onClose();
  };

  const uploadFileToServer = async (file) => {
    // Placeholder for API call
    return new Promise((resolve) => setTimeout(() => resolve(URL.createObjectURL(file)), 1000));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Select from device" />
          <Tab label="Paste URL" />
        </Tabs>
        <Box mt={2}>
          {tab === 0 && (
            <Box>
              <Button
                component="label"
                variant="outlined"
                // disabled={disabled}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  color: '#888',
                  px: 2,
                  border: '1px solid var(--mui-palette-divider)',
                }}
              >
                <Stack direction="row" gap={1}>
                  <Iconify icon="akar-icons:cloud-upload" width={24} height={24} />
                  <Typography>Upload Image</Typography>
                </Stack>
                <input type="file" hidden multiple={multiple} onChange={handleFileChange} />
              </Button>
              <Box mt={2}>
                {files.map((file, index) => (
                  <Box key={index} display="flex" alignItems="center" mt={1}>
                    <Typography>{file.name}</Typography>
                    <IconButton onClick={() => handleRemoveFile(index)} color="error">
                      <Iconify icon="ic:outline-delete" width={18} height={18} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {tab === 1 && (
            <Box>
              {urls.map((url, index) => (
                <Box key={index} display="flex" alignItems="center" mt={1}>
                  <TextField
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <IconButton onClick={() => handleRemoveUrl(index)} color="error" disabled={urls.length === 1}>
                    <Iconify icon="ic:outline-delete" width={18} height={18} />
                  </IconButton>
                </Box>
              ))}
              {multiple && (
                <Button onClick={handleAddUrl} startIcon={<Add />} sx={{ mt: 1 }}>
                  Add URL
                </Button>
              )}
            </Box>
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
