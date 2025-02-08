import React from 'react';
import { deleteFileAsync } from '@/app/(public)/portfolio/_lib/portfolio.actions';
import { isVideoContent } from '@/utils/helper';
import { Box, FormLabel, IconButton, Stack } from '@mui/material';

import { Iconify } from '../iconify/iconify';
import { MediaUploader } from './media-uploader';

export const MediaUploaderTrigger = ({ open, onClose, onSave, value, label, onAdd, onDelete }) => {
  const handleRemoveFile = async (item) => {
    if (item.includes('http') || item.includes('www.')) {
      onDelete(value?.filter((path) => path !== item));
    } else {
      await deleteFileAsync([item]);
      onDelete(value?.filter((path) => path !== item));
    }
  };
  return (
    <React.Fragment>
      {label && (
        <Box sx={{ mb: 1.8 }}>
          <FormLabel>Vertical Gallery Images</FormLabel>
        </Box>
      )}
      {value?.length > 0 ? (
        <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: '24.3%',
              height: '100px',
              borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
              border: '3px dashed var(--mui-palette-divider)',
              borderRadius: 1,
              cursor: 'pointer',
            }}
            onClick={onAdd}
          >
            <Iconify icon="icon-park-outline:upload-two" sx={{ width: 50, height: 50, color: 'grey.600' }} />
          </Stack>
          {value?.map((path, index) => (
            <Box key={index} sx={{ width: '24.3%', position: 'relative' }}>
              {isVideoContent(path) ? (
                <>
                  <Box
                    component="video"
                    src={path}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                      height: '200px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      color: '#fff',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                    }}
                    onClick={() => handleRemoveFile(path)}
                  >
                    <Iconify icon="ic:round-close" width={18} height={18} />
                  </IconButton>
                </>
              ) : (
                <>
                  <Box
                    component="img"
                    src={path.includes('http') ? path : `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${path}`}
                    sx={{
                      width: '100%',
                      height: '100px',
                      aspectRatio: 1,
                      objectFit: 'contain',
                      borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      color: '#fff',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '50%',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                    }}
                    onClick={() => handleRemoveFile(path)}
                  >
                    <Iconify icon="ic:round-close" width={18} height={18} />
                  </IconButton>
                </>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '24.3%',
            height: '100px',
            borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
            border: '3px dashed var(--mui-palette-divider)',
            borderRadius: 1,
            cursor: 'pointer',
          }}
          onClick={onAdd}
        >
          <Iconify icon="icon-park-outline:upload-two" sx={{ width: 50, height: 50, color: 'grey.600' }} />
        </Stack>
      )}

      <MediaUploader open={open} onClose={onClose} onSave={(paths) => onSave([...value, ...paths])} multiple />
    </React.Fragment>
  );
};
