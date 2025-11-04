import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import BlogForm from '../_component/blog-form';

const AddBlogPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
    </Container>
  );
};

export default AddBlogPage;
