'use client';

import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { VideoLinkField } from '/src/components/formFields/video-link-field';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '/src/components/uploaders/image-uploader';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { getRetailPartnerListAsync, getStakeHolderListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getContentList } from '/src/app/(private)/all-content/_lib/all-content.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const CampaignForm = ({ handleChange, values, errors, setFieldValue, onSubmit }) => {
  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [contentOptions, setContentOptions] = React.useState([]);
  const [stakeholderOptions, setStakeholderOptions] = React.useState([]);
  const [retailPartnerOptions, setRetailPartnerOptions] = React.useState([]);
  const [partnerOptions, setPartnerOptions] = React.useState([]);
  const [spaceOptions, setSpaceOptions] = React.useState([]);
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);
  const [data, setData] = React.useState(null);

  // ********************* Formik *******************************

  // ******************** Use Effects****************************

  // --------------- Fetch Prerequisites Data -------------------
  React.useEffect(() => {
    const fetchPrerequisitesData = async () => {
      try {
        const contentResponse = await getContentList({ page: 1, rowsPerPage: 100 });
        if (contentResponse?.success) {
          const options = contentResponse.data.map((item) => ({ value: item.id, label: item.Name }));
          setContentOptions(options);
        }
        const stakeholderResponse = await getStakeHolderListAsync({ page: 1, rowsPerPage: 100 });
        if (stakeholderResponse?.success) {
          const options = stakeholderResponse.data.map((item) => ({ value: item.id, label: item.Name }));
          setStakeholderOptions(options);
        }
        const retailPartnerResponse = await getRetailPartnerListAsync({ page: 1, rowsPerPage: 100 });
        if (retailPartnerResponse?.success) {
          const options = retailPartnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
          setRetailPartnerOptions(options);
        }
        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
        if (partnerResponse?.success) {
          const options = partnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
          setPartnerOptions(options);
        }
        const spaceResponse = await getSpaceListAsync({ page: 1, rowsPerPage: 100 });
        if (spaceResponse?.success) {
          const options = spaceResponse.data.map((item) => ({ value: item.id, label: item.Name }));
          setSpaceOptions(options);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrerequisitesData();
  }, []);

  // // --------------- Fetch campaign during update -------------------
  // React.useEffect(() => {
  //   const fetchSingleCampaign = async () => {
  //     try {
  //       const res = await getCampaignAsync(id);
  //       if (res?.success) {
  //         setData(res.data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   if (id) {
  //     fetchSingleCampaign();
  //   }
  // }, [values.id]);

  // // --------------- Set values during update -------------------
  // React.useEffect(() => {
  //   if (data) {
  //     setValues(defaultCampaign(data));
  //   }
  // }, [data, setValues]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} pb={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="client" label="Client" value={values.client} onChange={handleChange} />
            <ErrorMessage error={errors.client} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label="Start Date"
              error={errors.startDate}
              value={values.startDate}
              format="YYYY-MM-DD"
              onChange={(value) => setFieldValue('startDate', value)}
            />
            <ErrorMessage error={errors.startDate} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label="End Date"
              error={errors.endDate}
              value={values.endDate}
              format="YYYY-MM-DD"
              onChange={(value) => setFieldValue('endDate', value)}
            />
            <ErrorMessage error={errors.endDate} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="budget" label="Budget" value={values.budget} onChange={handleChange} type="number" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalExpense"
              label="Total Expense"
              value={values.totalExpense}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="productExpense"
              label="Product Expense"
              value={values.productExpense}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalContentEngagement"
              label="Total Content Engagement"
              value={values.totalContentEngagement}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="campaignROI"
              label="Campaign ROI"
              value={values.campaignROI}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              name="status"
              label="Status"
              value={values.status}
              onChange={(value) => setFieldValue('status', value)}
              options={[
                { value: 'UPCOMING', label: 'Upcoming' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'PAUSED', label: 'Paused' },
                { value: 'NEEDS_CASE_STUDY', label: 'Needs Case Study' },
                { value: 'NEEDS_PARTNERS', label: 'Needs Partners' },
                { value: 'ONBOARDING_PARTNERS', label: 'Onboarding Partners' },
              ]}
            />
            <ErrorMessage error={errors.status} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Content HQ"
              value={values.contentHQ}
              onChange={(_, value) => setFieldValue('contentHQ', value)}
              options={contentOptions}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Stakeholder"
              value={values.stakeholders}
              onChange={(_, value) => setFieldValue('stakeholders', value)}
              options={stakeholderOptions}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Proposed Partner"
              value={values.proposedPartners}
              onChange={(_, value) => setFieldValue('proposedPartners', value)}
              options={partnerOptions}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Retail Partner"
              value={values.retailPartners}
              onChange={(_, value) => setFieldValue('retailPartners', value)}
              options={retailPartnerOptions}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Space"
              value={values.spaces}
              onChange={(_, value) => setFieldValue('spaces', value)}
              options={spaceOptions}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={Boolean(errors.campaignImage)}>
              <FormLabel sx={{ mb: 1 }}>Campaign Image</FormLabel>
              <ImageUploader
                value={values.campaignImage}
                onFileSelect={(file) => setFieldValue('campaignImage', file)}
                onDelete={() => setFieldValue('campaignImage', null)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="goals" label="Goals" value={values.goals} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="notes" label="Notes " value={values.notes} onChange={handleChange} />
            <ErrorMessage error={errors.notes} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="guidelines"
              label="Guidelines (Use commas to separate notes)"
              value={values.guidelines}
              onChange={handleChange}
            />
            <ErrorMessage error={errors.guidelines} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <ErrorMessage error={errors.description} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <VideoLinkField
              name="videoInspirationGallery"
              label="Inspiration Videos"
              value={values.videoInspirationGallery}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog}
              onClose={() => setOpenImageUploadDialog(false)}
              onSave={(urls) => setFieldValue('imageInspirationGallery', urls)}
              value={values?.imageInspirationGallery}
              label="Inspiration Images"
              onAdd={() => setOpenImageUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('imageInspirationGallery', filteredUrls)}
              folderName="campaigns"
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <Stack direction="row" justifyContent="flex-end">
              <Button size="small" variant="contained" color="primary" disabled={loading} type="submit">
                Save
              </Button>
            </Stack>
          </Grid> */}
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
