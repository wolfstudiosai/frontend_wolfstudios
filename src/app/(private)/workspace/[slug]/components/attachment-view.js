import { Box, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';
import { FileTypeIcon } from '/src/components/utils/file-icon';

import { formatFileSize } from '/src/utils/helper';

export const AttachmentView = ({ selectedFiles, handleRemoveFile, loader }) => {
  return (
    <>
      <Stack direction="row" gap={0.6} sx={{ flexWrap: 'wrap', p: 1 }}>
        {selectedFiles.map((file, index) => {
          const type = file.type;
          const name = file.name;
          const extension = name.split('.').length > 1 ? name.split('.').pop().toLowerCase() : '';

          if (type.startsWith('video/')) {
            return (
              <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                <Box
                  component="video"
                  src={URL.createObjectURL(file)}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 0.5,
                    border: '1px solid var(--mui-palette-divider)',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                    width: '18px',
                    height: '18px',
                  }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <Iconify icon="mingcute:close-fill" sx={{ color: '#fff', width: '12px', height: '12px' }} />
                </IconButton>
              </Box>
            );
          } else if (type.startsWith('image/')) {
            return (
              <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                <Box
                  component="img"
                  src={URL.createObjectURL(file)}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                    width: '18px',
                    height: '18px',
                  }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <Iconify icon="mingcute:close-fill" sx={{ color: '#fff', width: '12px', height: '12px' }} />
                </IconButton>
              </Box>
            );
          }
          return (
            <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={0.2}
                sx={{ borderRadius: 0.5, border: '1px solid var(--mui-palette-divider)', height: '100%' }}
              >
                {/* <Iconify icon="line-md:file-filled" sx={{ width: '40px', height: '40px' }} /> */}
                <FileTypeIcon extension={extension} sx={{ width: '30px', height: '30px', mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {file.name.slice(0, 10) + (file.name.length > 10 ? '...' : '')}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: 'var(--mui-palette-text-secondary)' }}>
                  {formatFileSize(file.size)}
                </Typography>
              </Stack>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '50%',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                  width: '18px',
                  height: '18px',
                }}
                onClick={() => handleRemoveFile(index)}
              >
                <Iconify icon="mingcute:close-fill" sx={{ color: '#fff', width: '12px', height: '12px' }} />
              </IconButton>
            </Box>
          );
        })}
      </Stack>
      {loader ? <LinearProgress sx={{ mt: 1, mb: 2 }} /> : <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 2 }} />}
    </>
  );
};
