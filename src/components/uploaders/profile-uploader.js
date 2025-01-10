import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { Camera as CameraIcon } from '@phosphor-icons/react';

export default function ProfileUploader({ value, onFileSelect, onDelete, disabled = false }) {
  const [previewUrl, setPreviewUrl] = React.useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onFileSelect(file);
    }
  };

  React.useEffect(() => {
    if (typeof value === 'string' && value) {
      setPreviewUrl(`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${value}`);
    } else if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      setPreviewUrl(imageUrl);
    }
  }, [value]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* <Image
        src={previewUrl}
        alt="Uploaded Image"
        width={200}
        height={200}
        style={{ objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--mui-palette-divider)' }}
      /> */}

      <Box
        component={'img'}
        src={previewUrl || '/assets/default_avatar.png'}
        alt="Uploaded Image"
        width={200}
        height={200}
        style={{ objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--mui-palette-divider)' }}
      />

      {disabled ? null : (
        <Box
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <CameraIcon fontSize="small" color="var(--mui-palette-common-white)" />
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        </Box>
      )}
    </Box>
  );
}
