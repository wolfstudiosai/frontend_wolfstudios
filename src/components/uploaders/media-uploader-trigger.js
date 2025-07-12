import React from 'react';
import { Icon } from '@iconify/react';
import { Box, FormLabel, IconButton, Stack } from '@mui/material';

import { MediaUploader } from './media-uploader';
import { deleteFileAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';
import { isSupabaseUrl, isVideoContent } from '/src/utils/helper';

export const MediaUploaderTrigger = ({
  open,
  onClose,
  onSave,
  value,
  label,
  onAdd,
  onDelete,
  hideImageUploader,
  hideVideoUploader,
  folderName,
  isMultiple = false,
}) => {
  const handleRemoveFile = async (item) => {
    if (isSupabaseUrl(item)) {
      await deleteFileAsync([item]);
      onDelete(value?.filter((path) => path !== item));
    } else {
      onDelete(value?.filter((path) => path !== item));
    }
  };
  return (
    <React.Fragment>
      {label && (
        <Box sx={{ mb: 1.8 }}>
          <FormLabel>{label}</FormLabel>
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
              cursor: 'pointer',
            }}
            onClick={onAdd}
          >
            <Icon icon="icon-park-outline:upload-two" />
          </Stack>
          {value &&
            value?.map((path, index) => (
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
                        height: '100px',
                        width: '100%',
                        objectFit: 'contain',
                        border: '1px solid var(--mui-palette-divider)',
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
                      <Icon icon="ic:round-close" width={18} height={18} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Box
                      component="img"
                      src={isSupabaseUrl(path) ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${path}` : path}
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
                      <Icon icon="ic:round-close" width={18} height={18} />
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
            cursor: 'pointer',
          }}
          onClick={onAdd}
        >
          <Icon icon="icon-park-outline:upload-two" />
        </Stack>
      )}

      <MediaUploader
        open={open}
        onClose={onClose}
        onSave={(paths) => (isMultiple ? onSave([...value, ...paths]) : onSave([...paths]))}
        multiple={isMultiple}
        hideImageUploader={hideImageUploader}
        hideVideoUploader={hideVideoUploader}
        folderName={folderName}
      />
    </React.Fragment>
  );
};
