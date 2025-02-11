'use client';

import React from 'react';
import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { MediaUploaderTrigger } from '@/components/uploaders/media-uploader-trigger';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { defaultCampaign } from '../_lib/campaign.types';

export const CampaignForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultCampaign);

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openImageGalleryDialog, setOpenImageGalleryDialog] = React.useState(false);
  const [openVideoGalleryDialog, setOpenVideoGalleryDialog] = React.useState(false);

  // *****************Use Effects*******************************
  React.useEffect(() => {
    return () => {
      setValues(defaultCampaign);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="name" label="Campaign Name" value={values.name} onChange={onChange} />
            {/* <ErrorMessage error={errors.name} /> */}
          </Grid>

          {/* Slug */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="slug" label="Slug" value={values.slug} onChange={onChange} />
            {/* <ErrorMessage error={errors.slug} /> */}
          </Grid>

          {/* Campaign Group ID */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="campaign_group_id"
              label="Campaign Group ID"
              value={values.campaign_group_id}
              onChange={onChange}
            />
            {/* <ErrorMessage error={errors.campaign_group_id} /> */}
          </Grid>

          {/* Campaign Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={Boolean(errors.campaign_image)}>
              <FormLabel sx={{ mb: 2.8 }}>Campaign Image</FormLabel>
              <ImageUploader
                value={values.campaign_image}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={onDeleteThumbnail}
              />
            </FormControl>
          </Grid>

          {/* Content Engagement */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="content_engagement"
              label="Content Engagement"
              value={values.content_engagement}
              onChange={onChange}
              type="number"
            />
            <ErrorMessage error={errors.content_engagement} />
          </Grid>

          {/* Stakeholder */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="stakeholder" label="Stakeholder" value={values.stakeholder} onChange={onChange} />
            <ErrorMessage error={errors.stakeholder} />
          </Grid>

          {/* Campaign Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="campaign_status"
              label="Campaign Status"
              value={values.campaign_status}
              onChange={onChange}
            />
            <ErrorMessage error={errors.campaign_status} />
          </Grid>

          {/* Start Date */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label="Start Date"
              error={errors.start_date}
              value={values.start_date}
              onChange={(value) => setFieldValue('start_date', value)}
            />
          </Grid>

          {/* End Date */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label="End Date"
              error={errors.end_date}
              value={values.end_date}
              onChange={(value) => setFieldValue('end_date', value)}
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="description"
              label="Description"
              value={values.description}
              onChange={onChange}
              multiline
              rows={4}
            />
            <ErrorMessage error={errors.description} />
          </Grid>

          {/* Image Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageGalleryDialog}
              onClose={() => setOpenImageGalleryDialog(false)}
              onSave={(urls) => setFieldValue('image_gallery', urls)}
              value={values.image_gallery}
              label="Image Gallery"
              onAdd={() => setOpenImageGalleryDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('image_gallery', filteredUrls)}
            />
          </Grid>

          {/* Video Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openVideoGalleryDialog}
              onClose={() => setOpenVideoGalleryDialog(false)}
              onSave={(urls) => setFieldValue('video_gallery', urls)}
              value={values.video_gallery}
              label="Video Gallery"
              onAdd={() => setOpenVideoGalleryDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('video_gallery', filteredUrls)}
            />
          </Grid>

          {/* Budget */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="budget" label="Budget" value={values.budget} onChange={onChange} type="number" />
            <ErrorMessage error={errors.budget} />
          </Grid>

          {/* Total Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="total_expense"
              label="Total Expense"
              value={values.total_expense}
              onChange={onChange}
              type="number"
            />
            <ErrorMessage error={errors.total_expense} />
          </Grid>

          {/* Product Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="product_expense"
              label="Product Expense"
              value={values.product_expense}
              onChange={onChange}
              type="number"
            />
            <ErrorMessage error={errors.product_expense} />
          </Grid>
        </Grid>
      </form>

      {/* Media Preview Dialog */}
      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
