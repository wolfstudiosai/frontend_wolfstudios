'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { CustomMultipleInputFieldV2 } from '../../../../components/formFields/custom-multiple-input-field-v2';
import { CustomMultipleSelect } from '../../../../components/formFields/custom-multiple-select';
import {
  getCityListAsync,
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
  getTagListAsync,
} from '../../../../actions/common.actions';
import { getCampaignListAsync } from '../../../(public)/campaign/_lib/campaign.actions';
import { getPartnerListAsync } from '../../../(public)/partner/_lib/partner.actions';

export const ContentForm = ({ formikProps }) => {
  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    campaigns: [],
    cities: [],
    products: [],
    tags: [],
    stakeholders: [],
    partners: [],
    retailPartners: [],
  });
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);

  // ********************* Formik *******************************
  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    campaigns: getCampaignListAsync,
    cities: getCityListAsync,
    products: getProductListAsync,
    tags: getTagListAsync,
    stakeholders: getStakeHolderListAsync,
    partners: getPartnerListAsync,
    retailPartners: getRetailPartnerListAsync,
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
            open={openImageUploadDialog}
            onClose={() => setOpenImageUploadDialog(false)}
            onSave={(urls) => setFieldValue('thumbnailImage', urls)}
            value={values?.thumbnailImage}
            label="Thumbnail Image"
            onAdd={() => setOpenImageUploadDialog(true)}
            onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
            folderName="campaigns"
            isMultiple={false}
            hideVideoUploader
            hideImageUploader={false}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinAccountsUsed"
            label="Pinterest Accounts Used"
            value={values.pinAccountsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            value={values.googleDriveFiles}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            value={values.playbookLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerIGLink"
            label="Partner IG Link"
            value={values.partnerIGLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="uppromoteConversion"
            type="number"
            label="Up Promote Conversion"
            value={values.uppromoteConversion}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="assetStatus"
            label="Asset Status"
            value={values.assetStatus}
            onChange={(value) => setFieldValue('assetStatus', value)}
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Month Uploaded"
            error={errors.monthUploaded}
            value={values.monthUploaded}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('monthUploaded', value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="revoInstagram"
            label="Revo Instagram"
            value={values.revoInstagram}
            onChange={(value) => setFieldValue('revoInstagram', value)}
            options={[
              { value: 'Posted', label: 'Posted' },
              { value: 'Not Posted', label: 'Not Posted' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Creator Status"
            value={values.creatorStatus}
            onChange={(newValues) => setFieldValue('creatorStatus', newValues)}
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="igPost4" label="Instagram Post 4" value={values.igPost4} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="igPost3" label="Instagram Post 3" value={values.igPost3} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="igPost2" label="Instagram Post 2" value={values.igPost2} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'platform'}
            label="Platform"
            value={values?.platform}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'ttDummyAccountsUsed'}
            label="TT Dummy Accounts Used"
            value={values?.ttDummyAccountsUsed}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'postingQuality'}
            label="Posting Quality"
            value={values?.postingQuality}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerTikTokLink"
            label="Partner Tiktok Link"
            value={values.partnerTikTokLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytAccountsUsed"
            label="YT Accounts Used"
            value={values.ytAccountsUsed}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTikTok"
            label="REVO Tiktok Views"
            value={values.revoTikTok}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="revoYoutube" label="REVO YouTube" value={values.revoYoutube} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoClubrevoYoutube"
            label="Club REVO YouTube"
            value={values.revoClubrevoYoutube}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="clubREVOIGHandle"
            label="Club REVO IG Handle"
            value={values.clubREVOIGHandle}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tiktokAccountsUsed"
            label="Tiktok Accounts Used"
            value={values.tiktokAccountsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerYTLink"
            label="Partner Youtube Link"
            value={values.partnerYTLink}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoPinterest"
            label="REVO Pinterest"
            value={values.revoPinterest}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="revoTwitter" label="REVO Twitter" value={values.revoTwitter} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="postingStatus"
            label="Posting Status"
            value={values.postingStatus}
            onChange={(value) => setFieldValue('postingStatus', value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Approved', label: 'Approved' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="igSocialSetsUsed"
            label="IG Social Sets Used"
            value={values.igSocialSetsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalContributedEngagement"
            type="number"
            label="Total Contributed Engagement"
            value={values.totalContributedEngagement}
            onChange={handleChange}
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
            Additional Information
          </Typography>
        </Grid>
        {/* s */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerTTShares"
            type="number"
            label="Partner Tiktok Share"
            value={values.partnerTTShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerTTSaves"
            type="number"
            label="Partner Tiktok Saves"
            value={values.partnerTTSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerTTViews"
            type="number"
            label="Partner Tiktok Views"
            value={values.partnerTTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerTTComments"
            type="number"
            label="Partner Tiktok Comments"
            value={values.partnerTTComments}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerIGTotalComments"
            type="number"
            label="Partner Instagram Total Comment"
            value={values.partnerIGTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerIGTotalLikes"
            type="number"
            label="Partner Instagram Total Likes"
            value={values.partnerIGTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerIGTotalShares"
            type="number"
            label="Partner Instagram Total Shares"
            value={values.partnerIGTotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerIGTotalViews"
            type="number"
            label="Partner Instagram Total Views"
            value={values.partnerIGTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytClubREVOTotalViews"
            type="number"
            label="YT Club REVO Total Views"
            value={values.ytClubREVOTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytPartnerTotalSaves"
            type="number"
            label="YT Partner Total Saves"
            value={values.ytPartnerTotalSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytPartnerTotalViews"
            type="number"
            label="YT Partner Total Views"
            value={values.ytPartnerTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytPartnerTotalComments"
            type="number"
            label="YT Partner Total Comments"
            value={values.ytPartnerTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytPartnerTotalLikes"
            type="number"
            label="YT Partner Total Comments"
            value={values.ytPartnerTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytREVOMADICTotalShares"
            type="number"
            label="YT REVO MADIC Total Shares"
            value={values.ytREVOMADICTotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytREVOMADICTotalViews"
            type="number"
            label="YT REVO MADIC Total Views"
            value={values.ytREVOMADICTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytREVOMADICTotalLikes"
            type="number"
            label="YT REVO MADIC Total Likes"
            value={values.ytREVOMADICTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytREVOMADICTotalComments"
            type="number"
            label="YT REVO MADIC Total Comments"
            value={values.ytREVOMADICTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ytClubREVOTotalLikes"
            type="number"
            label="YT Club REVO Total Likes"
            value={values.ytClubREVOTotalLikes}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterestTotalPinClicks"
            type="number"
            label="Pinterest Total Pin Clicks"
            value={values.pinterestTotalPinClicks}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterestTotalViews"
            type="number"
            label="Pinterest Total Views"
            value={values.pinterestTotalViews}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTTViews"
            type="number"
            label="REVO Twitter Views"
            value={values.revoTTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTTLikes"
            type="number"
            label="REVO Twitter Likes"
            value={values.revoTTLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTTComments"
            type="number"
            label="REVO Twitter Comments"
            value={values.revoTTComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTTSaves"
            type="number"
            label="REVO Twitter Saves"
            value={values.revoTTSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoTTShares"
            type="number"
            label="REVO Twitter Shares"
            value={values.revoTTShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoIGTotalViews"
            type="number"
            label="REVO Instagram Views"
            value={values.revoIGTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoIGTotalShares"
            type="number"
            label="REVO Instagram Total Shares"
            value={values.revoIGTotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoIGTotalComments"
            type="number"
            label="REVO Instagram Total Comments"
            value={values.revoIGTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoIGTotalLikes"
            type="number"
            label="REVO Instagram Total Likes"
            value={values.revoIGTotalLikes}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Campaign"
            name="campaigns"
            value={values.campaigns}
            onChange={(_, value) => setFieldValue('campaigns', value)}
            defaultOptions={autoCompleteOptions?.campaigns}
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
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Cities"
            name="cities"
            value={values.cities}
            onChange={(_, value) => setFieldValue('cities', value)}
            defaultOptions={autoCompleteOptions?.cities}
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
              const res = await getProductListAsync(paging, debounceValue);
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
            label="Tags"
            name="tags"
            value={values.tags}
            onChange={(_, value) => setFieldValue('tags', value)}
            defaultOptions={autoCompleteOptions?.tags}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 20 };
              const res = await getTagListAsync(paging, debounceValue);
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
              const res = await getStakeHolderListAsync(paging, debounceValue);
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
      </Grid>
    </form>
  );
};
