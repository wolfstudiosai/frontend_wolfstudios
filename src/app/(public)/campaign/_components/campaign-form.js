'use client';

import React from 'react';
import { CampaignAutoSearch } from '@/components/autosearches/campaign-group-autosearch';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { CustomDatePicker } from '@/components/formFields/custom-date-picker';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { MediaUploaderTrigger } from '@/components/uploaders/media-uploader-trigger';
import { FormControl, FormLabel, InputLabel, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { campaignProgressStatus } from '../_lib/campaign.constants';
import { defaultCampaign } from '../_lib/campaign.types';

export const CampaignForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data);

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openImageGalleryDialog, setOpenImageGalleryDialog] = React.useState(false);
  const [openVideoGalleryDialog, setOpenVideoGalleryDialog] = React.useState(false);

  const handleChangeCampaignGroup = (value) => {
    setFieldValue('campaign_group_id', value?.id);
    setFieldValue('campaign_group_name', value?.name);
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('campaign_image', '');
    onSetFile(null);
  };

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
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel>Campaign Group</FormLabel>
            <CampaignAutoSearch
              name={values.campaign_group_name}
              id={values.campaign_group_id}
              onSelect={(value) => handleChangeCampaignGroup(value)}
            />
            <ErrorMessage error={errors.campaign_group_id} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="name" label="Campaign Name" value={values.name} onChange={onChange} />
            <ErrorMessage error={errors.name} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="content_engagement"
              label="Content Engagement"
              value={values.content_engagement}
              onChange={onChange}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="stakeholder" label="Stakeholder" value={values.stakeholder} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="retail_partners"
              label="Retail Partner"
              value={values.retail_partners}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="proposed_partners"
              label="Proposed Partner"
              value={values.proposed_partners}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="live_partners"
              label="Live Partner"
              value={values.live_partners}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="contributed_partners"
              label="Contributed Partner"
              value={values.contributed_partners}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="campaign_ROI" label="Campaign ROI" value={values.campaign_ROI} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="spaces" label="Spaces" value={values.spaces} onChange={onChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Status'}
              value={values.campaign_status}
              onChange={(value) => setFieldValue('campaign_status', value)}
              name="campaign_status"
              options={[
                { value: 'UPCOMING', label: 'Upcomming' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'PAUSED', label: 'Pause' },
                { value: 'NEEDS_CASE_STUDY', label: 'Needs Case Study' },
                { value: 'NEEDS_PARTNERS', label: 'Needs Partners' },
                { value: 'ONBOARDING_PARTNERS', label: 'Onboarding Partners' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Campaign Progress'}
              value={values.campaign_progress}
              onChange={(value) => setFieldValue('campaign_progress', value)}
              name="campaign_progress"
              options={campaignProgressStatus}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label="Start Date"
              error={errors.start_date}
              value={values.start_date}
              onChange={(value) => setFieldValue('start_date', value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label="End Date"
              error={errors.end_date}
              value={values.end_date}
              onChange={(value) => setFieldValue('end_date', value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="budget" label="Budget" value={values.budget} onChange={onChange} type="number" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="total_expense"
              label="Total Expense"
              value={values.total_expense}
              onChange={onChange}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="product_expense"
              label="Product Expense"
              value={values.product_expense}
              onChange={onChange}
              type="number"
            />
            <ErrorMessage error={errors.product_expense} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ fontSize: '14px', mb: 0.5 }} color="text.primary">
              Campaign Image
            </Typography>
            <FormControl fullWidth error={Boolean(errors.campaign_image)}>
              <ImageUploader
                value={values.campaign_image}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={handleDeleteThumbnail}
              />
            </FormControl>
            <ErrorMessage error={errors.campaign_image} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="note" label="Note" value={values.note} onChange={onChange} multiline rows={2} />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <InputLabel sx={{ mb: 0.8 }}>Guidelines</InputLabel>
              <TextEditor
                placeholder={'Write something'}
                content={values.guideline}
                onUpdate={(html) => setFieldValue('guideline', html)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="description"
              label="Description"
              value={values.description}
              onChange={onChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid size={{ xs: 12 }} />
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
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
