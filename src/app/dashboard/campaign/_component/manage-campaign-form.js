'use client';

import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';

import { TextEditor } from '@/components/core/text-editor/text-editor';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { Iconify } from '@/components/iconify/iconify';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';

import { defaultCampaign } from '../_lib/campaign.types';
import { ContentGuideline } from './content-guideline';

export const ManageCampaignForm = ({ data }) => {
  const isUpdated = data?.id ? true : false;

  // *********************States*********************************
  const [loading, setLoading] = React.useState(false);
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultCampaign,
      validate: (values) => {
        const errors = {};

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        const res = isUpdated
          ? await updateUserData({
              id: data.id,
              role: values.role,
              is_deleted: false,
              status: values.status,
              contact_number: values.contact_number,
            })
          : await createUser(values);
        if (res.success) {
          onConfirm();
        }
        setLoading(false);
      },
    });

  console.log(values, 'values.....');

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField name="name" label="Campaign Name" value={values.name} onChange={handleChange} />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="stakeholder"
              label="Campaign stakeholder"
              value={values.stakeholder}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField name="goal" label="Goal" value={values.goal} onChange={handleChange} />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.start_date)}>
              <DatePicker
                format="DD-MM-YYYY"
                label="From Date"
                onChange={() => {
                  // noop
                }}
                value={dayjs(values.start_date)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.end_date)}>
              <DatePicker
                format="DD-MM-YYYY"
                label="End Date"
                onChange={() => {
                  // noop
                }}
                value={dayjs(values.end_date)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <CustomTextField
              name="partner_compensation"
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
                { value: 'DECLINED', label: 'Declined' },
                { value: 'ACTIVE', label: 'Active' },
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
              <InputLabel>Content Guidelines</InputLabel>
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
              label="Partner Expense"
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
                onDelete={() => setFile(null)}
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
              Create
            </Button>
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </Box>
  );
};
