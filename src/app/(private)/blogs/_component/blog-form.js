'use client';

import React from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MediaUploaderTrigger } from '../../../../components/uploaders/media-uploader-trigger';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  thumbnail: Yup.mixed().required('Thumbnail is required'),
});

const BlogForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [thumbnailPreview, setThumbnailPreview] = React.useState(null);
  const [uploaderStates, setUploaderStates] = React.useState({
    thumbnailImage: false,
    horizontalGallery: false,
    verticalGallery: false,
    singlePageHeroImage: false,
    imageField: false,
    videoLink: false,
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      thumbnail: null,
      published: false,
      featured: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', values.content);
        formData.append('published', String(values.published));
        formData.append('featured', String(values.featured));
        if (values.thumbnail) formData.append('thumbnail', values.thumbnail);

        console.log('Submitting...', Object.fromEntries(formData.entries()));

        // TODO: send to API
        // await fetch('/api/blogs', { method: 'POST', body: formData });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, handleChange, handleSubmit, setFieldValue } = formik;

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    setFieldValue('thumbnail', file);

    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Thumbnail upload */}
        <Grid size={{ xs: 12 }}>
          <MediaUploaderTrigger
            open={uploaderStates.thumbnailImage}
            onClose={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: false }))}
            onSave={(urls) => setFieldValue('thumbnail', urls)}
            value={values?.thumbnailImage}
            label="Thumbnail Image"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: true }))}
            onDelete={(filteredUrls) => setFieldValue('thumbnail', filteredUrls)}
            folderName="campaigns"
            hideVideoUploader
            hideImageUploader={false}
          />
        </Grid>

        {/* Title */}
        <Grid size={12}>
          <FormControl fullWidth error={Boolean(errors.title)}>
            <InputLabel>Title</InputLabel>
            <OutlinedInput name="title" value={values.title} onChange={handleChange} />
          </FormControl>
        </Grid>

        {/* Content Field */}
        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Content"
            name="content"
            value={values.content}
            onChange={handleChange}
            error={Boolean(errors.content)}
          />
        </Grid>

        {/* Published */}
        <Grid size={12}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch checked={values.published} onChange={(e) => setFieldValue('published', e.target.checked)} />
            <Typography>Publish the blog</Typography>
          </Stack>
        </Grid>

        {/* Featured */}
        <Grid size={12}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch checked={values.featured} onChange={(e) => setFieldValue('featured', e.target.checked)} />
            <Typography>Make this product featured</Typography>
          </Stack>
        </Grid>

        {/* Submit Button */}
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Button
            variant="contained"
            type={loading ? 'button' : 'submit'}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            Create Blog
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};

export default BlogForm;
