'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { Iconify } from '@/components/iconify/iconify';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import PageLoader from '@/components/PageLoader/PageLoader';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { Box, Button, CircularProgress, FormControl, FormLabel, InputAdornment, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';

import { createCampaignAsync, getCampaignAsync, updateUCampaignAsync } from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { ContentGuideline } from './content-guideline';
import { formConstants } from '/src/app/constants/form-constants';
import { paths } from '/src/paths';

export const ManageCampaignForm = ({ slug }) => {
  const isUpdate = slug ? true : false;

  // *********************States*********************************
  const [loading, setLoading] = React.useState(false);
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultCampaign,
      validate: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = formConstants.required;
        }
        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        const res = isUpdate ? await updateUCampaignAsync(file, values) : await createCampaignAsync(file, values);
        if (res.success) {
          router.push(paths.dashboard.campaign);
        }
        setLoading(false);
      },
    });

  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getCampaignAsync(slug);

      setValues(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('campaign_image', '');
    setFile(null);
  };

  React.useEffect(() => {
    if (isUpdate) {
      getSingleData();
    }
  }, []);

  return (
    <PageLoader loading={loading} error={null}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField name="name" label="Campaign Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="stakeholder"
              label="Campaign Stakeholder"
              value={values.stakeholder}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField name="goal" label="Goal" value={values.goal} onChange={handleChange} />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomDatePicker
              label={'Start Date'}
              error={errors.start_date}
              value={values.start_date}
              onChange={(vlaue) => setFieldValue('start_date', vlaue)}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomDatePicker
              label={'End Date'}
              error={errors.end_date}
              value={values.end_date}
              onChange={(vlaue) => setFieldValue('end_date', vlaue)}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="partner_compensation"
              type="number"
              label="Partner Compensation"
              value={values.partner_compensation}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="partner_deliverables"
              label="Partner Deliverables"
              value={values.partner_deliverables}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="contributed_partners"
              label="Contributed Partners"
              value={values.contributed_partners}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="prospected_partners"
              label="Prospected Partners"
              value={values.prospected_partners}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField name="content_HQ" label="Content HQ" value={values.content_HQ} onChange={handleChange} />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="image_inspiration"
              label="Image Inspiration"
              value={values.image_inspiration}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Image">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.image_inspiration)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="video_inspiration"
              label="Video Inspiration"
              value={values.video_inspiration}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Video">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.video_inspiration)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="content_engagement"
              type="number"
              label="Content Engagement"
              value={values.content_engagement}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="product_expense"
              type="number"
              label="Product Expense"
              value={values.product_expense}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <InputLabel>Status</InputLabel>
            <CustomSelect
              value={values.status}
              onChange={(value) => setFieldValue('status', value)}
              name="status"
              options={[
                { value: 'PENDING', label: 'Pending' },
                { value: 'APPROVED', label: 'Approved' },
                { value: 'REJECTED', label: 'Rejected' },
                { value: 'COMPLETED', label: 'Completed' },
              ]}
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="partner_expense"
              type="number"
              label="Partner Expense"
              value={values.partner_expense}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <InputLabel sx={{ mb: 0.8 }}>Content Guidelines</InputLabel>
              <TextEditor
                placeholder={'Write something'}
                content={values.content_guidelines}
                onUpdate={(html) => setFieldValue('content_guidelines', html)}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <CustomTextField
              name="description"
              label="Description"
              value={values.description}
              multiline
              rows={4}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 2.8 }}>Thumbnail</FormLabel>
              <ImageUploader
                value={values.thumbnail}
                onFileSelect={(url) => setFile(url)}
                onDelete={handleDeleteThumbnail}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <ContentGuideline
              data={values.social_platforms}
              onChange={(value) => setFieldValue('social_platforms', value)}
            />
          </Grid>
          <Grid item size={12}>
            <Button
              variant="contained"
              type={loading ? 'button' : 'submit'}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </PageLoader>
  );
};
