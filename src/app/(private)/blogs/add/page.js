import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import BlogForm from '../_component/blog-form';

const AddBlogPage = () => {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Create blog</Typography>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <BlogForm />
      </Box>
    </Box>
  );
};

export default AddBlogPage;
