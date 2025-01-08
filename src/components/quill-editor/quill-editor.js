'use client';

import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material/Grid2';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

export const QuillEditor = (props) => {
  const { value, onChange, error } = props;

  return (
    <Box
      sx={{
        '.ql-container': {
          minHeight: 200,
        },
      }}
    >
      <ReactQuill theme="snow" value={value} onChange={onChange} />
      {error && <Typography sx={{ color: 'red', fontSize: '11px', p: 1 }}>*This field is required</Typography>}
    </Box>
  );
};
