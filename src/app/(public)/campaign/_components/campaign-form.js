'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { VideoLinkField } from '/src/components/formFields/video-link-field';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { campaignProgressStatus } from '../_lib/campaign.constants';
import { CustomMultipleInputFieldV2 } from '../../../../components/formFields/custom-multiple-input-field-v2';
import { getCityListAsync, getProductListAsync } from '../../../../actions/common.actions';
import { getContentListAsync } from '../../../(private)/all-content/_lib/all-content.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getProductionListAsync } from '../../production/_lib/production.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const CampaignForm = ({ formikProps }) => {
  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);
  const [thumbnailImage, setThumbnailImage] = React.useState(false);
  const [openCampaignImage, setOpenCampaignImage] = React.useState(false);

  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    contentHQ: [],
    stakeholders: [],
    proposedPartners: [],
    retailPartners: [],
    retailPartners2: [],
    retailPartners3: [],
    spaces: [],
    productionHQ: [],
    products: [],
  });
  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    contentHQ: getContentListAsync,
    stakeholders: getCityListAsync,
    proposedPartners: getPartnerListAsync,
    retailPartners: getPartnerListAsync,
    retailPartners2: getPartnerListAsync,
    retailPartners3: getPartnerListAsync,
    spaces: getSpaceListAsync,
    productionHQ: getProductionListAsync,
    products: getProductListAsync,
  };
  React.useEffect(() => {
    const fetchData = async () => {
      if (!autocompleteFocus?.currentItem) return;
      const { currentItem, prevItems } = autocompleteFocus;

      if (prevItems.includes(currentItem)) return;
      const fetchFunction = fetchFunctionsMap[currentItem];
      if (!fetchFunction) return;

      try {
        const response = await fetchFunction({ page: 1, rowsPerPage: 100 });
        if (response?.success) {
          const options = response.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));

          setAutoCompleteOptions((prevState) => ({
            ...prevState,
            [currentItem]: options,
          }));

          setAutocompleteFocus((prevState) => ({
            currentItem: '',
            prevItems: [...prevState.prevItems, currentItem],
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [autocompleteFocus]);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            border: '1px solid var(--mui-palette-background-level2)',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            p: 2,
          }}
        >
          <Grid size={12}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
              General Information
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <MediaUploaderTrigger
              open={thumbnailImage}
              onClose={() => setThumbnailImage(false)}
              onSave={(urls) => setFieldValue('thumbnailImage', urls)}
              value={values?.thumbnailImage}
              label="Thumbnail Image"
              onAdd={() => setThumbnailImage(true)}
              onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
              folderName="campaigns"
              hideVideoUploader
              hideImageUploader={false}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="client" label="Client" value={values.client} onChange={handleChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label="Start Date"
              error={errors.startDate}
              value={values.startDate}
              format="YYYY-MM-DD"
              onChange={(value) => setFieldValue('startDate', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label="End Date"
              error={errors.endDate}
              value={values.endDate}
              format="YYYY-MM-DD"
              onChange={(value) => setFieldValue('endDate', value)}
            />
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
              name="campaignStatus"
              label="Status"
              value={values.campaignStatus}
              onChange={(value) => setFieldValue('campaignStatus', value)}
              options={campaignProgressStatus}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="guidelines"
              label="Guidelines (Use commas to separate notes)"
              value={values.guidelines}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="notes" label="Notes " value={values.notes} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="campaignDescription"
              label="Description"
              value={values.campaignDescription}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            border: '1px solid var(--mui-palette-background-level2)',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            p: 2,
            mt: 4,
          }}
        >
          <Grid size={12}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
              Other Information
            </Typography>
          </Grid>

          {/* Content HQ */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoCompleteV2
              multiple
              label="Content HQ"
              name="contentHQ"
              value={values.contentHQ}
              onChange={(_, value) => setFieldValue('contentHQ', value)}
              defaultOptions={autoCompleteOptions.contentHQ}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* Stakeholder */}
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Stakeholder"
              name="stakeholders"
              value={values.stakeholders}
              onChange={(_, value) => setFieldValue('stakeholders', value)}
              defaultOptions={autoCompleteOptions.stakeholders}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}

          {/* Proposed Partner */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoCompleteV2
              multiple
              label="Proposed Partner"
              name="proposedPartners"
              value={values.proposedPartners}
              onChange={(_, value) => setFieldValue('proposedPartners', value)}
              defaultOptions={autoCompleteOptions.proposedPartners}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* Retail Partner */}
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner"
              name="retailPartners"
              value={values.retailPartners}
              onChange={(_, value) => setFieldValue('retailPartners', value)}
              defaultOptions={autoCompleteOptions.retailPartners}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}

          {/* Retail Partner 2 */}
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner 2"
              name="retailPartners2"
              value={values.retailPartners2}
              onChange={(_, value) => setFieldValue('retailPartners2', value)}
              defaultOptions={autoCompleteOptions.retailPartners2}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}

          {/* Retail Partner 3 */}
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner 3"
              name="retailPartners3"
              value={values.retailPartners3}
              onChange={(_, value) => setFieldValue('retailPartners3', value)}
              defaultOptions={autoCompleteOptions.retailPartners3}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}

          {/* Contributed Partner */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoCompleteV2
              multiple
              label="Contributed Partner"
              name="contributedPartners"
              value={values.contributedPartners}
              onChange={(_, value) => setFieldValue('contributedPartners', value)}
              defaultOptions={autoCompleteOptions.proposedPartners}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* Space */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoCompleteV2
              multiple
              label="Space"
              name="spaces"
              value={values.spaces}
              onChange={(_, value) => setFieldValue('spaces', value)}
              defaultOptions={autoCompleteOptions.spaces}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* Production HQ */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoCompleteV2
              multiple
              label="Production HQ"
              name="productionHQ"
              value={values.productionHQ}
              onChange={(_, value) => setFieldValue('productionHQ', value)}
              defaultOptions={autoCompleteOptions.productionHQ}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* Product */}
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Product"
              name="products"
              value={values.products}
              onChange={(_, value) => setFieldValue('products', value)}
              defaultOptions={autoCompleteOptions.productionHQ}
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
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 12 }}>
            <CustomMultipleInputFieldV2
              name={'campaignGoals'}
              label="Goals"
              value={values?.campaignGoals}
              setFieldValue={setFieldValue}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <VideoLinkField
              name="videoInspirationGallery"
              label="Inspiration Videos"
              value={values.videoInspirationGallery}
              setFieldValue={setFieldValue}
            />
          </Grid>
          {/* <Grid size={{ xs: 12, md: 6 }}>
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
          </Grid> */}
          <Grid size={{ xs: 12 }}>
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
              isMultiple={true}
            />
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
