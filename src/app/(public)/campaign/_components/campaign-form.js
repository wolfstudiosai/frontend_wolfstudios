'use client';

import { Box, Button, Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomMultipleInputField } from '/src/components/formFields/custom-mulitple-input-field';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { VideoLinkField } from '/src/components/formFields/video-link-field';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { getContentListAsync } from '../../../(private)/all-content/_lib/all-content.actions';
import {
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
} from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getProductionListAsync } from '../../production/_lib/production.action';
import { campaignProgressStatus } from '../_lib/campaign.constants';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const CampaignForm = ({ handleChange, values, errors, setFieldValue, onSubmit, loading }) => {
  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [contentOptions, setContentOptions] = React.useState([]);
  const [stakeholderOptions, setStakeholderOptions] = React.useState([]);
  const [retailPartnerOptions, setRetailPartnerOptions] = React.useState([]);
  const [partnerOptions, setPartnerOptions] = React.useState([]);
  const [spaceOptions, setSpaceOptions] = React.useState([]);
  const [productionHQOptions, setProductionHQOptions] = React.useState([]);
  const [productOptions, setProductOptions] = React.useState([]);
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);
  const [openCampaignImage, setOpenCampaignImage] = React.useState(false);

  // --------------- Fetch Prerequisites Data -------------------
  React.useEffect(() => {
    const fetchPrerequisitesData = async () => {
      try {
        const contentResponse = await getContentListAsync({ page: 1, rowsPerPage: 20 });
        if (contentResponse?.success) {
          const options = contentResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setContentOptions(options);
        }
        const stakeholderResponse = await getStakeHolderListAsync({ page: 1, rowsPerPage: 20 });
        if (stakeholderResponse?.success) {
          const options = stakeholderResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setStakeholderOptions(options);
        }
        const retailPartnerResponse = await getRetailPartnerListAsync({ page: 1, rowsPerPage: 20 });
        if (retailPartnerResponse?.success) {
          const options = retailPartnerResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setRetailPartnerOptions(options);
        }
        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 20 });
        if (partnerResponse?.success) {
          const options = partnerResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setPartnerOptions(options);
        }
        const spaceResponse = await getSpaceListAsync({ page: 1, rowsPerPage: 20 });
        if (spaceResponse?.success) {
          const options = spaceResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setSpaceOptions(options);
        }

        const productionHQResponse = await getProductionListAsync({ page: 1, rowsPerPage: 20 });
        if (productionHQResponse?.success) {
          const options = productionHQResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setProductionHQOptions(options);
        }

        const productResponse = await getProductListAsync({ page: 1, rowsPerPage: 20 });
        if (productResponse?.success) {
          const options = productResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setProductOptions(options);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrerequisitesData();
  }, []);

  const handleAddGoal = () => {
    if (values.currentGoals?.trim() && !values.campaignGoals.includes(values.currentGoals.trim())) {
      setFieldValue('campaignGoals', [...values.campaignGoals, values.currentGoals.trim()], { shouldValidate: true });
      setFieldValue('currentGoals', '');
    }
  };

  const handleRemoveGoal = (goalToRemove) => {
    setFieldValue(
      'campaignGoals',
      values.campaignGoals.filter((goal) => goal !== goalToRemove),
      { shouldValidate: true }
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} pb={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} error={undefined} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="client"
              label="Client"
              value={values.client}
              onChange={handleChange}
              error={undefined}
            />
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
            <CustomTextField
              name="budget"
              label="Budget"
              value={values.budget}
              onChange={handleChange}
              type="number"
              error={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalExpense"
              label="Total Expense"
              value={values.totalExpense}
              onChange={handleChange}
              type="number"
              error={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="productExpense"
              label="Product Expense"
              value={values.productExpense}
              onChange={handleChange}
              type="number"
              error={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalContentEngagement"
              label="Total Content Engagement"
              value={values.totalContentEngagement}
              onChange={handleChange}
              type="number"
              error={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="campaignROI"
              label="Campaign ROI"
              value={values.campaignROI}
              onChange={handleChange}
              type="number"
              error={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              name="campaignStatus"
              label="Status"
              value={values.campaignStatus}
              onChange={(value) => setFieldValue('campaignStatus', value)}
              options={campaignProgressStatus}
              error={undefined}
            />
            <ErrorMessage error={errors.campaignStatus} />
          </Grid>

          {/* Content HQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Content HQ"
              value={values.contentHQ}
              onChange={(_, value) => setFieldValue('contentHQ', value)}
              defaultOptions={contentOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getContentListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Stakeholder */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Stakeholder"
              value={values.stakeholders}
              onChange={(_, value) => setFieldValue('stakeholders', value)}
              defaultOptions={stakeholderOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getStakeHolderListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Proposed Partner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Proposed Partner"
              value={values.proposedPartners}
              onChange={(_, value) => setFieldValue('proposedPartners', value)}
              defaultOptions={partnerOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getPartnerListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Retail Partner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner"
              value={values.retailPartners}
              onChange={(_, value) => setFieldValue('retailPartners', value)}
              defaultOptions={retailPartnerOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getRetailPartnerListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Retail Partner 2 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner 2"
              value={values.retailPartners2}
              onChange={(_, value) => setFieldValue('retailPartners2', value)}
              defaultOptions={retailPartnerOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getRetailPartnerListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Retail Partner 3 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner 3"
              value={values.retailPartners3}
              onChange={(_, value) => setFieldValue('retailPartners3', value)}
              defaultOptions={retailPartnerOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getRetailPartnerListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Contributed Partner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Contributed Partner"
              value={values.contributedPartners}
              onChange={(_, value) => setFieldValue('contributedPartners', value)}
              defaultOptions={partnerOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getPartnerListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Space */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Space"
              value={values.spaces}
              onChange={(_, value) => setFieldValue('spaces', value)}
              defaultOptions={spaceOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getSpaceListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Production HQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Production HQ"
              value={values.productionHQ}
              onChange={(_, value) => setFieldValue('productionHQ', value)}
              defaultOptions={productionHQOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getProductionListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* Product */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Product"
              value={values.products}
              onChange={(_, value) => setFieldValue('products', value)}
              defaultOptions={productOptions}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getProductListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              onFocus={undefined}
              error={undefined}
            />
          </Grid>

          {/* <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={Boolean(errors.campaignImage)}>
              <FormLabel sx={{ mb: 1 }}>Campaign Image</FormLabel>
              <ImageUploader
                value={values.campaignImage}
                onFileSelect={(file) => setFieldValue('campaignImage', file)}
                onDelete={() => setFieldValue('campaignImage', null)}
              />
            </FormControl>
          </Grid> */}

          <Grid size={{ xs: 12 }}>
            <CustomMultipleInputField
              name="currentGoals"
              label="Goals"
              onchange={handleChange}
              value={values.currentGoals}
              isSubmitting={loading}
              currentData={values.currentGoals}
              handleAdd={handleAddGoal}
              handleRemove={handleRemoveGoal}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {values.campaignGoals.map((goal, index) => (
                <Chip
                  key={index}
                  label={goal}
                  onDelete={() => handleRemoveGoal(goal)}
                  disabled={loading}
                  color="primary"
                  size="small"
                />
              ))}
            </Box>
            {/* {errors.tags && (
              <Typography
                color="error"
                variant="caption"
                display="block"
                sx={{ mt: 1 }}
              >
                {errors.goals.message}
              </Typography>
            )} */}
          </Grid>

          {/* <Grid size={{ xs: 12 }}>
            <CustomTextField name="campaignGoals" label="Goals" value={values.campaignGoals} onChange={handleChange} />
          </Grid> */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="notes"
              label="Notes "
              value={values.notes}
              onChange={handleChange}
              error={undefined}
            />
            <ErrorMessage error={errors.notes} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="guidelines"
              label="Guidelines (Use commas to separate notes)"
              value={values.guidelines}
              onChange={handleChange}
              error={undefined}
            />
            <ErrorMessage error={errors.guidelines} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="campaignDescription"
              label="Description"
              value={values.campaignDescription}
              onChange={handleChange}
              multiline
              rows={4}
              error={undefined}
            />
            <ErrorMessage error={errors.campaignDescription} />
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
              open={openCampaignImage}
              onClose={() => setOpenCampaignImage(false)}
              onSave={(urls) => setFieldValue('campaignImage', urls)}
              value={values?.campaignImage}
              label="Campaign Image"
              onAdd={() => setOpenCampaignImage(true)}
              onDelete={(filteredUrls) => setFieldValue('campaignImage', filteredUrls)}
              folderName="campaigns"
              hideImageUploader={undefined}
              hideVideoUploader={undefined}
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
              hideImageUploader={undefined}
              hideVideoUploader={undefined}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" justifyContent="flex-end">
              <Button size="small" variant="contained" color="primary" disabled={loading} type="submit">
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>

      {mediaPreview && (
        <MediaIframeDialog
          open={true}
          data={mediaPreview}
          onClose={() => setMediaPreview(null)}
          onComplete={undefined}
        />
      )}
    </>
  );
};
