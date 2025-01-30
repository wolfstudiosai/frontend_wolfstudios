'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { formConstants } from '@/app/constants/form-constants';
import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { Iconify } from '@/components/iconify/iconify';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { RightPanel } from '@/components/rightPanel/right-panel';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { ImageUploaderV2 } from '@/components/uploaders/image-uploader-v2';
import { Box, Button, FormControl, FormLabel, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';

import { createPortfolioAsync, getPortfolioAsync, updatePortfolioAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';

export const ManagePortfolioRightPanel = ({ open, onClose, fetchList, data }) => {
  const isUpdate = data ? true : false;

  // *********************States*********************************
  const [loading, setLoading] = React.useState(false);
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultPortfolio,
      validate: (values) => {
        const errors = {};
        if (!values.project_title) {
          errors.project_title = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const res = isUpdate ? await updatePortfolioAsync(file, values) : await createPortfolioAsync(file, values);
          if (res.success) {
            onClose?.();
            fetchList();
          } else {
            console.error('Operation failed:', res.message);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      },
    });

  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getPortfolioAsync(id);
      setValues(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
  };

  const handleSave = (url) => {};

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

  React.useEffect(() => {
    if (isUpdate) {
      getSingleData();
    }
  }, []);

  return (
    <RightPanel
      heading="Add Portfolio"
      open={open}
      onClose={onClose}
      actionButtons={() => (
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            Save
          </Button>
        </Box>
      )}
    >
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Button
              endIcon={<Iconify icon="lucide:upload" />}
              variant="contained"
              onClick={() => setOpenUploadDialog(true)}
            >
              Upload
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="project_title"
              label="Project Title"
              value={values.project_title}
              onChange={handleChange}
            />
            <ErrorMessage error={errors.project_title} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomSelect
              label="Category"
              name="category"
              id="category"
              value={values.category}
              onChange={handleChange}
              options={[
                { value: 'FACEBOOK', label: 'Facebook' },
                { value: 'TWITTER', label: 'Twitter' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="category" label="Category" value={values.category} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="video_url"
              label="Video URL"
              value={values.video_url}
              onChange={handleChange}
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
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="hero_image"
              label="Hero Image"
              value={values.hero_image}
              onChange={handleChange}
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
          <Grid size={{ xs: 12 }}>
            <CustomDatePicker
              label={'Date'}
              error={errors.date}
              value={values.date}
              onChange={(value) => setFieldValue('date', value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField name="state" label="State" value={values.state} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="partner_hq" label="Partner HQ" value={values.partner_hq} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 2.8 }}>Thumbnail</FormLabel>
              <ImageUploader
                value={values.thumbnail}
                onFileSelect={(file) => setFile(file)}
                onDelete={handleDeleteThumbnail}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="short_description"
              label="Short Description"
              value={values.short_description}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="full_description"
              label="Full Description"
              value={values.full_description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          {/* <Grid size={12}>
              <Button
                variant="contained"
                type={loading ? 'button' : 'submit'}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                Save
              </Button>
            </Grid> */}
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
      <ImageUploaderV2
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        onSave={(files) => handleSave(files)}
        multiple
      />

      {/* </PageLoader> */}
    </RightPanel>
  );
};
