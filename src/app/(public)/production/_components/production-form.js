'use client';

import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { getProductionCategoryListAsync } from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';
import {
  getCountryListAsync,
  getProductListAsync,
  getStakeHolderListAsync,
  getStateListAsync,
} from '../../../../lib/common.actions';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const ProductionForm = ({
  values,
  onSubmit,
  onChange,
  errors,
  onSetFile,
  onDeleteThumbnail,
  setFieldValue,
  loading,
  actionButtons,
}) => {
  const status = [
    { value: 'PLANNING', label: 'Planning' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'ON_HOLD', label: 'On Hold' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  const cardsUsed = [
    { value: 'Card1', label: 'Card1' },
    { value: 'Card2', label: 'Card2' },
    { value: 'Card3', label: 'Card3' },
    { value: 'Card4', label: 'Card4' },
  ];

  const equipmentRentals = [
    { value: 'Rental1', label: 'Rental1' },
    { value: 'Rental2', label: 'Rental2' },
    { value: 'Rental3', label: 'Rental3' },
    { value: 'Rental4', label: 'Rental4' },
  ];

  const productionUsage = [
    { value: 'Usage1', label: 'Usage1' },
    { value: 'Usage2', label: 'Usage2' },
    { value: 'Usage3', label: 'Usage3' },
    { value: 'Usage4', label: 'Usage4' },
  ];

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
  const [stakeholderOptions, setStakeholderOptions] = React.useState([]);
  const [spaceOptions, setSpaceOptions] = React.useState([]);
  const [productOptions, setProductOptions] = React.useState([]);
  const [campaignsOptions, setCampaignsOptions] = React.useState([]);
  const [partnerOptions, setPartnerOptions] = React.useState([]);
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(null);

  // --------------- Fetch Prerequisites Data -------------------
  React.useEffect(() => {
    const fetchPrerequisitesData = async () => {
      try {
        const stakeholderResponse = await getStakeHolderListAsync({ page: 1, rowsPerPage: 20 });
        if (stakeholderResponse?.success) {
          const options = stakeholderResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setStakeholderOptions(options);
        }
        const spaceResponse = await getSpaceListAsync({ page: 1, rowsPerPage: 20 });
        if (spaceResponse?.success) {
          const options = spaceResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setSpaceOptions(options);
        }

        const productResponse = await getProductListAsync({ page: 1, rowsPerPage: 20 });
        if (productResponse?.success) {
          const options = productResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setProductOptions(options);
        }

        const campaignResponse = await getCampaignListAsync({ page: 1, rowsPerPage: 20 });
        if (campaignResponse?.success) {
          const options = campaignResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setCampaignsOptions(options);
        }

        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 20 });
        if (partnerResponse?.success) {
          const options = partnerResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setPartnerOptions(options);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrerequisitesData();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box sx={{ postion: 'relative' }}>
          <Grid
            container
            spacing={2}
            sx={{
              height: 'calc(100vh - 148px)',
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              pb: 2,
              px: 0.2,
            }}
          >
            <Grid size={{ xs: 12 }}>
              <CustomTextField label="Name" name="name" value={values.name} onChange={onChange} />
              <ErrorMessage error={errors.name} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Internal Notes"
                name="internalNotes"
                value={values.internalNotes}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                multiple
                label="Status"
                value={values.status}
                onChange={(_, value) => setFieldValue('status', value)}
                defaultOptions={status}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Total Expense"
                name="totalExpense"
                value={values.totalExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                multiple
                label="Cards Used"
                value={values.cardsUsed}
                onChange={(_, value) => setFieldValue('cardsUsed', value)}
                defaultOptions={cardsUsed}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomDatePicker
                label="Proposed Date"
                error={errors.proposedDate}
                value={values.proposedDate}
                format="YYYY-MM-DD"
                onChange={(value) => setFieldValue('proposedDate', value)}
              />
              <ErrorMessage error={errors.startDate} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomDatePicker
                label="Record Shoot Date"
                error={errors.recordShootDate}
                value={values.recordShootDate}
                format="YYYY-MM-DD"
                onChange={(value) => setFieldValue('recordShootDate', value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Space Expense"
                name="spaceExpense"
                value={values.spaceExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Talent Expense"
                name="talentExpense"
                value={values.talentExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Crew Expense"
                name="crewExpense"
                value={values.crewExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Food Expense"
                name="foodExpense"
                value={values.foodExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                label="Equipment Rentals"
                value={values.equipmentRentals}
                onChange={(_, value) => setFieldValue('equipmentRentals', value)}
                defaultOptions={equipmentRentals}
                multiple
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Equipment Expense"
                name="equipmentExpense"
                value={values.equipmentExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Reimbursments"
                name="reimbursments"
                value={values.reimbursments}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Wardrobe Expense"
                name="wardrobeExpense"
                value={values.wardrobeExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Playbook Link"
                name="playbookLink"
                value={values.playbookLink}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                label="Production Usage"
                value={values.productionUsage}
                onChange={(_, value) => setFieldValue('productionUsage', value)}
                defaultOptions={productionUsage}
                multiple
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Director Expense"
                name="directorExpense"
                value={values.directorExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Producer Expense"
                name="producerExpense"
                value={values.producerExpense}
                onChange={onChange}
                type="number"
              />
            </Grid>
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
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                multiple
                label="Spaces"
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
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutoCompleteV2
                multiple
                label="Proposed Spaces"
                value={values.proposedSpaces}
                onChange={(_, value) => setFieldValue('proposedSpaces', value)}
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
              />
            </Grid>
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
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <CustomAutoCompleteV2
                multiple
                label="Campaigns"
                value={values.campaigns}
                onChange={(_, value) => setFieldValue('campaigns', value)}
                defaultOptions={campaignsOptions}
                fetchOptions={async (debounceValue) => {
                  const paging = { page: 1, rowsPerPage: 20 };
                  const res = await getCampaignListAsync(paging, debounceValue);
                  return (
                    res?.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <CustomAutoCompleteV2
                multiple
                label="Contributing Partners"
                value={values.contributingPartners}
                onChange={(_, value) => setFieldValue('contributingPartners', value)}
                defaultOptions={partnerOptions}
                fetchOptions={async (debounceValue) => {
                  const paging = { page: 1, rowsPerPage: 20 };
                  const res = await getPartnerListAsync(paging, debounceValue);
                  return (
                    res?.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <CustomAutoCompleteV2
                multiple
                label="Proposed Partners"
                value={values.proposedPartners}
                onChange={(_, value) => setFieldValue('proposedPartners', value)}
                defaultOptions={partnerOptions}
                fetchOptions={async (debounceValue) => {
                  const paging = { page: 1, rowsPerPage: 20 };
                  const res = await getPartnerListAsync(paging, debounceValue);
                  return (
                    res?.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'contracts'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => {
                  setFieldValue('contracts', urls);
                  setOpenImageUploadDialog(null);
                }}
                value={values?.contracts}
                label="Contracts"
                onAdd={() => setOpenImageUploadDialog('contracts')}
                onDelete={(filteredUrls) => setFieldValue('contracts', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'receipts'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('receipts', urls)}
                value={values?.receipts}
                label="Receipts"
                onAdd={() => setOpenImageUploadDialog('receipts')}
                onDelete={(filteredUrls) => setFieldValue('receipts', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'shotlist'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('shotlist', urls)}
                value={values?.shotlist}
                label="Shotlist"
                onAdd={() => setOpenImageUploadDialog('shotlist')}
                onDelete={(filteredUrls) => setFieldValue('shotlist', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'callSheet'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('callSheet', urls)}
                value={values?.callSheet}
                label="Call Sheet"
                onAdd={() => setOpenImageUploadDialog('callSheet')}
                onDelete={(filteredUrls) => setFieldValue('callSheet', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'proofingLibrary'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('proofingLibrary', urls)}
                value={values?.proofingLibrary}
                label="Proofing Library"
                onAdd={() => setOpenImageUploadDialog('proofingLibrary')}
                onDelete={(filteredUrls) => setFieldValue('proofingLibrary', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'imageInspiration'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('imageInspiration', urls)}
                value={values?.imageInspiration}
                label="Image Inspiration"
                onAdd={() => setOpenImageUploadDialog('imageInspiration')}
                onDelete={(filteredUrls) => setFieldValue('imageInspiration', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <MediaUploaderTrigger
                open={openImageUploadDialog === 'videoInspiration'}
                onClose={() => setOpenImageUploadDialog(null)}
                onSave={(urls) => setFieldValue('videoInspiration', urls)}
                value={values?.videoInspiration}
                label="Video Inspiration"
                onAdd={() => setOpenImageUploadDialog('videoInspiration')}
                onDelete={(filteredUrls) => setFieldValue('videoInspiration', filteredUrls)}
                folderName="campaigns"
              />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            justifyContent={actionButtons ? 'space-between' : 'flex-end'}
            sx={{ postion: 'absolute', bottom: 0, py: 1, backgroundColor: 'var(--mui-palette-background-paper)' }}
          >
            <Stack direction="row" gap={1}>
              {actionButtons}
            </Stack>
            <Button size="small" variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        </Box>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
