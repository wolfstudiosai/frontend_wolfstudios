'use client';

import React from 'react';
import Grid from '@mui/material/Grid2';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { VideoLinkField } from '/src/components/formFields/video-link-field';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import {
  getCityListAsync,
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
  getTagListAsync,
} from '../../../../lib/common.actions';
import { getCampaignListAsync } from '../../../(public)/campaign/_lib/campaign.actions';
import { getPartnerListAsync } from '../../../(public)/partner/_lib/partner.actions';

export const ContentForm = ({ formikProps }) => {
  const [loading, setLoading] = React.useState(false);
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
            label: item.Name,
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

  console.log(values, 'values....');

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {/* General Information Section */}
        <Grid size={{ xs: 12 }}>
          <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoPinterest"
            label="Revo Pinterest"
            value={values.revoPinterest}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.revoPinterest} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinAccountsUsed"
            label="Pin Accounts Used"
            value={values.pinAccountsUsed}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.pinAccountsUsed} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="postQuality" label="Post Quality" value={values.postQuality} onChange={handleChange} />
          <ErrorMessage error={errors.postQuality} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            value={values.googleDriveFiles}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.googleDriveFiles} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            value={values.playbookLink}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.playbookLink} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="upPromoteConversion"
            type="number"
            label="Up Promote Conversion"
            value={values.upPromoteConversion}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.upPromoteConversion} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="assetStatus"
            label="Asset Status"
            value={values.assetStatus}
            onChange={(value) => setFieldValue('assetStatus', value)}
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
          <ErrorMessage error={errors.assetStatus} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Month Uploaded"
            error={errors.monthUploaded}
            value={values.monthUploaded}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('monthUploaded', value)}
          />
          <ErrorMessage error={errors.monthUploaded} />
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
          <ErrorMessage error={errors.revoInstagram} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="creatorStatus"
            label="Creator Status"
            value={values.creatorStatus}
            onChange={(value) => setFieldValue('creatorStatus', value)}
            options={[
              { value: 'Contract Fulfilled', label: 'Contract Fulfilled' },
              { value: 'Contract Not Fulfilled', label: 'Contract Not Fulfilled' },
            ]}
          />
          <ErrorMessage error={errors.creatorStatus} />
        </Grid>
        {/* Partner Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_IGLink"
            label="Partner IG Link"
            value={values.partner_IGLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TikTokLink"
            label="Partner TikTok Link"
            value={values.partner_TikTokLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTShares"
            type="number"
            label="Partner TT Shares"
            value={values.partner_TTShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTSaves"
            type="number"
            label="Partner TT Saves"
            value={values.partner_TTSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTViews"
            type="number"
            label="Partner TT Views"
            value={values.partner_TTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTLikes"
            type="number"
            label="Partner TT Likes"
            value={values.partner_TTLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTComments"
            type="number"
            label="Partner TT Comments"
            value={values.partner_TTComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_YTLink"
            label="Partner YT Link"
            value={values.partner_YTLink}
            onChange={handleChange}
          />
        </Grid>
        {/* Instagram Metrics */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_SocialSetsUsed"
            label="IG Social Sets Used"
            value={values.ig_SocialSetsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalComments"
            type="number"
            label="IG Total Comments"
            value={values.ig_TotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalLikes"
            type="number"
            label="IG Total Likes"
            value={values.ig_TotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalShares"
            type="number"
            label="IG Total Shares"
            value={values.ig_TotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalViews"
            type="number"
            label="IG Total Views"
            value={values.ig_TotalViews}
            onChange={handleChange}
          />
        </Grid>

        {/* YouTube Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_ClubREVOTotalViews"
            type="number"
            label="YT ClubREVO Views"
            value={values.yt_ClubREVOTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalSaves"
            type="number"
            label="YT Partner Saves"
            value={values.yt_PartnerTotalSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalViews"
            type="number"
            label="YT Partner Views"
            value={values.yt_PartnerTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalComments"
            type="number"
            label="YT Partner Comments"
            value={values.yt_PartnerTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalLikes"
            type="number"
            label="YT Partner Likes"
            value={values.yt_PartnerTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalShares"
            type="number"
            label="YT REVO MADIC Shares"
            value={values.yt_REVOMADICTotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalViews"
            type="number"
            label="YT REVO MADIC Views"
            value={values.yt_REVOMADICTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalViews"
            label="YT REVO MADIC Views"
            value={values.yt_REVOMADICTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalComments"
            type="number"
            label="YT REVO MADIC Comments"
            value={values.yt_REVOMADICTotalComments}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="yt_AccountsUsed"
            label="Revo Instagram"
            value={values.yt_AccountsUsed}
            onChange={(value) => setFieldValue('yt_AccountsUsed', value)}
            options={[
              { value: 'Posted', label: 'Posted' },
              { value: 'Not Posted', label: 'Not Posted' },
            ]}
          />
        </Grid>

        {/* Pinterest Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterest_TotalPinClicks"
            type="number"
            label="Pinterest Clicks"
            value={values.pinterest_TotalPinClicks}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterest_TotalViews"
            type="number"
            label="Pinterest Views"
            value={values.pinterest_TotalViews}
            onChange={handleChange}
          />
        </Grid>

        {/* REVO Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_Twitter"
            label="REVO Twitter"
            value={values.revo_Twitter}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_TTViews"
            type="number"
            label="REVO TT Views"
            value={values.revo_TTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="revo_TikTok" label="REVO TikTok" value={values.revo_TikTok} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_Youtube"
            label="REVO Youtube"
            value={values.revo_Youtube}
            onChange={handleChange}
          />
        </Grid>

        {/* Relations Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tikTokAccountsused"
            label="TikTok Accounts Used"
            value={values.tikTokAccountsused}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="TTDummyAccountsUsed"
            label="TT Dummy Accounts Used"
            value={values.TTDummyAccountsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="postingStatus"
            label="Asset Status"
            value={values.postingStatus}
            onChange={(value) => setFieldValue('postingStatus', value)}
            options={[
              { value: 'Posted', label: 'Posted' },
              { value: 'Not Posted', label: 'Not Posted' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalContributedEngagement"
            label="Total Contributed Engagement"
            value={values.totalContributedEngagement}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Campaigns"
            name="campaigns"
            value={values.campaigns}
            onChange={(_, value) => setFieldValue('campaigns', value)}
            options={autoCompleteOptions?.campaigns}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Cities"
            name="cities"
            value={values.cities}
            onChange={(_, value) => setFieldValue('cities', value)}
            options={autoCompleteOptions?.cities}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Products"
            name="products"
            value={values.products}
            onChange={(_, value) => setFieldValue('products', value)}
            options={autoCompleteOptions?.products}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Tags"
            name="tags"
            value={values.tags}
            onChange={(_, value) => setFieldValue('tags', value)}
            options={autoCompleteOptions?.tags}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Stakeholders"
            name="stakeholders"
            value={values.stakeholders}
            onChange={(_, value) => setFieldValue('stakeholders', value)}
            options={autoCompleteOptions?.stakeholders}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Partners"
            name="partners"
            value={values.partners}
            onChange={(_, value) => setFieldValue('partners', value)}
            options={autoCompleteOptions?.partners}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoComplete
            label="Retail Partners"
            name="retailPartners"
            value={values.retailPartners}
            onChange={(_, value) => setFieldValue('retailPartners', value)}
            options={autoCompleteOptions?.retailPartners}
            multiple
            onFocus={(name) => setAutocompleteFocus((prevState) => ({ ...prevState, currentItem: name }))}
          />
        </Grid>

        {/* media uploader */}
        <Grid size={{ xs: 12 }}>
          <VideoLinkField name="video" label="Videos" value={values.video} setFieldValue={setFieldValue} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={openImageUploadDialog}
            onClose={() => setOpenImageUploadDialog(false)}
            onSave={(urls) => setFieldValue('image', urls)}
            value={values?.image}
            label="Image"
            onAdd={() => setOpenImageUploadDialog(true)}
            onDelete={(filteredUrls) => setFieldValue('image', filteredUrls)}
            folderName="content-HQ"
          />
        </Grid>
      </Grid>
    </form>
  );
};
