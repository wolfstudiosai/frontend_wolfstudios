'use client';

import React from 'react';
import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { Iconify } from '@/components/iconify/iconify';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { MediaUploader } from '@/components/uploaders/media-uploader';
import { isVideoContent } from '@/utils/helper';
import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { deleteFileAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';

export const PortfolioForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultPortfolio);

  console.log(data, 'data inside portfolio form...');

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

  const handleRemoveFile = async (item) => {
    if (item.includes('http') || item.includes('www.')) {
      setFieldValue(
        'vertical_gallery_images',
        values?.vertical_gallery_images?.filter((path) => path !== item)
      );
    } else {
      setFieldValue(
        'vertical_gallery_images',
        values?.vertical_gallery_images?.filter((path) => path !== item)
      );
      await deleteFileAsync([item]);
    }
  };

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultPortfolio);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    <>
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="project_title"
              label="Project Title"
              value={values.project_title}
              onChange={onChange}
            />
            <ErrorMessage error={errors.project_title} />
          </Grid>

          {/* <Grid size={{ xs: 12 }}>
            <CustomSelect
              label="Category"
              name="category"
              id="category"
              value={values.category}
              onChange={onChange}
              options={[
                { value: 'FACEBOOK', label: 'Facebook' },
                { value: 'TWITTER', label: 'Twitter' },
              ]}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="category" label="Category" value={values.category} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="video_url"
              label="Video URL"
              value={values.video_url}
              onChange={onChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Video">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.video_url)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="hero_image"
              label="Hero Image"
              value={values.hero_image}
              onChange={onChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Image">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.hero_image)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label={'Date'}
              error={errors.date}
              value={values.date}
              onChange={(value) => setFieldValue('date', value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="state" label="State" value={values.state} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="partner_hq" label="Partner HQ" value={values.partner_hq} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 2.8 }}>Thumbnail</FormLabel>
              <ImageUploader
                value={values.thumbnail}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={onDeleteThumbnail}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="short_description"
              label="Short Description"
              value={values.short_description}
              onChange={onChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="full_description"
              label="Full Description"
              value={values.full_description}
              onChange={onChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 1.8 }}>
              <FormLabel>Vertical Gallery Images</FormLabel>
            </Box>
            {values?.vertical_gallery_images?.length > 0 ? (
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
                  onClick={() => setOpenUploadDialog(true)}
                >
                  <Iconify icon="icon-park-outline:upload-two" sx={{ width: 50, height: 50, color: 'grey.600' }} />
                </Stack>
                {values?.vertical_gallery_images?.map((path, index) => (
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
                          src={
                            path.includes('http') ? path : `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${path}`
                          }
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
                  height: '200px',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
                onClick={() => setOpenUploadDialog(true)}
              >
                <Iconify icon="lucide:upload" sx={{ width: 80, height: 80, color: 'grey.600' }} />
              </Stack>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 1.8 }}>
              <FormLabel>Horizontal Gallery Images</FormLabel>
            </Box>
            {values?.horizontal_gallery_images?.length > 0 ? (
              <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
                {values?.horizontal_gallery_images?.map((path, index) => (
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
                            borderRadius: '50%',
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
                          src={
                            path.includes('http') ? path : `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${path}`
                          }
                          sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 1 }}
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
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: '24.3%',
                    height: '200px',
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenUploadDialog(true)}
                >
                  <Iconify icon="lucide:upload" sx={{ width: 80, height: 80, color: 'grey.600' }} />
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: '24.3%',
                  height: '200px',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
                onClick={() => setOpenUploadDialog(true)}
              >
                <Iconify icon="lucide:upload" sx={{ width: 80, height: 80, color: 'grey.600' }} />
              </Stack>
            )}
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
      <MediaUploader
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        onSave={(paths) => setFieldValue('vertical_gallery_images', [...values?.vertical_gallery_images, ...paths])}
        multiple
      />
    </>
  );
};
