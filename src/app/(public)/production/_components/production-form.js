'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { CustomAutoCompleteV2 } from '../../../../components/formFields/custom-auto-complete-v2';
import { CustomMultipleInputFieldV2 } from '../../../../components/formFields/custom-multiple-input-field-v2';
import { CustomMultipleSelect } from '../../../../components/formFields/custom-multiple-select';
import { getProductListAsync, getStakeHolderListAsync } from '../../../../lib/common.actions';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';
import { productionStatus } from '../_lib/constant';

export const ProductionForm = ({ formikProps }) => {
  // *********************States*********************************
  const [uploaderStates, setUploaderStates] = React.useState({
    thumbnailImage: false,
    contracts: false,
    receipts: false,
    shotlist: false,
    callSheet: false,
    proofingLibrary: false,
    imageInspiration: false,
    videoInspiration: false,
  });

  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    spaces: [],
    stakeholders: [],
    contributingPartners: [],
    campaigns: [],
    products: [],
    proposedSpaces: [],
    proposedPartners: [],
  });

  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    spaces: getSpaceListAsync,
    stakeholders: getStakeHolderListAsync,
    contributingPartners: getPartnerListAsync,
    campaigns: getCampaignListAsync,
    products: getProductListAsync,
    proposedSpaces: getSpaceListAsync,
    proposedPartners: getPartnerListAsync,
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
            open={uploaderStates.thumbnailImage}
            onClose={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: false }))}
            onSave={(urls) => setFieldValue('thumbnailImage', urls)}
            value={values?.thumbnailImage}
            label="Thumbnail Image"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: true }))}
            onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
            folderName="campaigns"
            hideVideoUploader
            hideImageUploader={false}
          />
          <ErrorMessage error={errors.thumbnailImage} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomTextField label="Name" name="name" value={values.name} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Internal Notes"
            name="internalNotes"
            value={values.internalNotes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            name="status"
            label="Status"
            value={values.status}
            onChange={(value) => setFieldValue('status', value)}
            options={productionStatus}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Total Expense"
            type="number"
            name="totalExpense"
            value={values.totalExpense}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Proposed Date"
            error={errors.proposedDate}
            value={values.proposedDate}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('proposedDate', value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Record Shoot Date"
            error={errors.recordShootDate}
            value={values.recordShootDate}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('recordShootDate', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Space Expense"
            type="number"
            name="spaceExpense"
            value={values.spaceExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Talent Expense"
            type="number"
            name="talentExpense"
            value={values.talentExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Crew Expense"
            type="number"
            name="crewExpense"
            value={values.crewExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Food Expense"
            type="number"
            name="foodExpense"
            value={values.foodExpense}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Equipment Expense"
            type="number"
            name="equipmentExpense"
            value={values.equipmentExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Reimbursments"
            type="number"
            name="reimbursments"
            value={values.reimbursments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Wardrobe Expense"
            type="number"
            name="wardrobeExpense"
            value={values.wardrobeExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Playbook Link"
            name="playbookLink"
            value={values.playbookLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Director Expense"
            type="number"
            name="directorExpense"
            value={values.directorExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Producer Expense"
            type="number"
            name="producerExpense"
            value={values.producerExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'cardsUsed'}
            label="Cards Used"
            value={values?.cardsUsed}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'equipmentRentals'}
            label="Equipment Rentals"
            value={values?.equipmentRentals}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'productionUsage'}
            label="Production Usage"
            value={values?.productionUsage}
            setFieldValue={setFieldValue}
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
          mt: 4
        }}
      >
        <Grid size={12}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Additional Information
          </Typography>
        </Grid>

        {/* auto search section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Spaces"
            name="spaces"
            value={values.spaces}
            onChange={(_, value) => setFieldValue('spaces', value)}
            defaultOptions={autoCompleteOptions?.spaces}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Stakeholders"
            name="stakeholders"
            value={values.stakeholders}
            onChange={(_, value) => setFieldValue('stakeholders', value)}
            defaultOptions={autoCompleteOptions?.stakeholders}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Contributing Partners"
            name="contributingPartners"
            value={values.contributingPartners}
            onChange={(_, value) => setFieldValue('contributingPartners', value)}
            defaultOptions={autoCompleteOptions?.contributingPartners}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Campaigns"
            name="campaigns"
            value={values.campaigns}
            onChange={(_, value) => setFieldValue('campaigns', value)}
            defaultOptions={autoCompleteOptions?.campaigns}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Products"
            name="products"
            value={values.products}
            onChange={(_, value) => setFieldValue('products', value)}
            defaultOptions={autoCompleteOptions?.products}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Proposed Spaces"
            name="proposedSpaces"
            value={values.proposedSpaces}
            onChange={(_, value) => setFieldValue('proposedSpaces', value)}
            defaultOptions={autoCompleteOptions?.proposedSpaces}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Proposed Partners"
            name="proposedPartners"
            value={values.proposedPartners}
            onChange={(_, value) => setFieldValue('proposedPartners', value)}
            defaultOptions={autoCompleteOptions?.proposedPartners}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getCityListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} />
        {/* media section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.contracts}
            onClose={() => setUploaderStates((prev) => ({ ...prev, contracts: false }))}
            onSave={(urls) => setFieldValue('contracts', urls)}
            value={values?.contracts}
            label="Contracts"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, contracts: true }))}
            onDelete={(filteredUrls) => setFieldValue('contracts', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.receipts}
            onClose={() => setUploaderStates((prev) => ({ ...prev, receipts: false }))}
            onSave={(urls) => setFieldValue('receipts', urls)}
            value={values?.receipts}
            label="Receipts"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, receipts: true }))}
            onDelete={(filteredUrls) => setFieldValue('receipts', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.shotlist}
            onClose={() => setUploaderStates((prev) => ({ ...prev, shotlist: false }))}
            onSave={(urls) => setFieldValue('shotlist', urls)}
            value={values?.shotlist}
            label="Shot list"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, shotlist: true }))}
            onDelete={(filteredUrls) => setFieldValue('shotlist', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.callSheet}
            onClose={() => setUploaderStates((prev) => ({ ...prev, callSheet: false }))}
            onSave={(urls) => setFieldValue('callSheet', urls)}
            value={values?.callSheet}
            label="Shot list"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, callSheet: true }))}
            onDelete={(filteredUrls) => setFieldValue('callSheet', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.proofingLibrary}
            onClose={() => setUploaderStates((prev) => ({ ...prev, proofingLibrary: false }))}
            onSave={(urls) => setFieldValue('proofingLibrary', urls)}
            value={values?.proofingLibrary}
            label="Proofing Library"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, proofingLibrary: true }))}
            onDelete={(filteredUrls) => setFieldValue('proofingLibrary', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.imageInspiration}
            onClose={() => setUploaderStates((prev) => ({ ...prev, imageInspiration: false }))}
            onSave={(urls) => setFieldValue('imageInspiration', urls)}
            value={values?.imageInspiration}
            label="Image Inspiration"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, imageInspiration: true }))}
            onDelete={(filteredUrls) => setFieldValue('imageInspiration', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.videoInspiration}
            onClose={() => setUploaderStates((prev) => ({ ...prev, videoInspiration: false }))}
            onSave={(urls) => setFieldValue('videoInspiration', urls)}
            value={values?.videoInspiration}
            label="Video Inspiration"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, videoInspiration: true }))}
            onDelete={(filteredUrls) => setFieldValue('videoInspiration', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={true}
            hideVideoUploader={undefined}
            isMultiple={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};
