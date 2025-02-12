'use client';

import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { Iconify } from '@/components/iconify/iconify';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { Button, FormControl, FormLabel, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { defaultPortfolio } from '../_lib/portfolio.types';
import { MediaUploaderTrigger } from '@/components/uploaders/media-uploader-trigger';

export const PortfolioForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultPortfolio);
  
  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);

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
          <Grid size={{ xs: 12 }}>
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
            <MediaUploaderTrigger
              open={openVerticalUploadDialog}
              onClose={() => setOpenVerticalUploadDialog(false)}
              onSave={(urls) => setFieldValue('vertical_gallery_images', urls)}
              value={values?.vertical_gallery_images}
              label={'Vertical Gallery Images'}
              onAdd={() => setOpenVerticalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('vertical_gallery_images', filteredUrls)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openHorizontalUploadDialog}
              onClose={() => setOpenHorizontalUploadDialog(false)}
              onSave={(urls) => setFieldValue('horizontal_gallery_images', urls)}
              value={values?.horizontal_gallery_images}
              label={'Horizontal Gallery Images'}
              onAdd={() => setOpenHorizontalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('horizontal_gallery_images', filteredUrls)}
            />
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
