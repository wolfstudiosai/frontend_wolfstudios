'use client';

import React from 'react';
import Grid from '@mui/material/Grid2';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

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
  // ********************* Formik *******************************
  const { values, errors, handleChange, setFieldValue, handleSubmit } = formikProps;

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {/* General Information Section */}
        <Grid size={{ xs: 12 }}>
          <CustomTextField name="name" label="Name" values={values.name || ''} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revoPinterest"
            label="Revo Pinterest"
            values={values.revoPinterest}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.revoPinterest} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinAccountsUsed"
            label="Revo Pinterest"
            values={values.pinAccountsUsed}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.pinAccountsUsed} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="postQuality"
            label="Post Quality"
            values={values.postQuality}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.postQuality} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            values={values.googleDriveFiles}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.googleDriveFiles} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            values={values.playbookLink}
            onChange={handleChange}
          />
          <ErrorMessage error={errors.playbookLink} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="upPromoteConversion"
            label="Up Promote Conversion"
            values={values.upPromoteConversion}
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
            values={values.partner_IGLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TikTokLink"
            label="Partner TikTok Link"
            values={values.partner_TikTokLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTShares"
            label="Partner TT Shares"
            values={values.partner_TTShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTSaves"
            label="Partner TT Saves"
            values={values.partner_TTSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTViews"
            label="Partner TT Views"
            values={values.partner_TTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTLikes"
            label="Partner TT Likes"
            values={values.partner_TTLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_TTComments"
            label="Partner TT Comments"
            values={values.partner_TTComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner_YTLink"
            label="Partner YT Link"
            values={values.partner_YTLink}
            onChange={handleChange}
          />
        </Grid>
        {/* Instagram Metrics */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_SocialSetsUsed"
            label="IG Social Sets Used"
            values={values.ig_SocialSetsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalComments"
            label="IG Total Comments"
            values={values.ig_TotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalLikes"
            label="IG Total Likes"
            values={values.ig_TotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalShares"
            label="IG Total Shares"
            values={values.ig_TotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ig_TotalViews"
            label="IG Total Views"
            values={values.ig_TotalViews}
            onChange={handleChange}
          />
        </Grid>

        {/* YouTube Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_ClubREVOTotalViews"
            label="YT ClubREVO Views"
            values={values.yt_ClubREVOTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalSaves"
            label="YT Partner Saves"
            values={values.yt_PartnerTotalSaves}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalViews"
            label="YT Partner Views"
            values={values.yt_PartnerTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalComments"
            label="YT Partner Comments"
            values={values.yt_PartnerTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_PartnerTotalLikes"
            label="YT Partner Likes"
            values={values.yt_PartnerTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalShares"
            label="YT REVO MADIC Shares"
            values={values.yt_REVOMADICTotalShares}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalViews"
            label="YT REVO MADIC Views"
            values={values.yt_REVOMADICTotalViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalViews"
            label="YT REVO MADIC Views"
            values={values.yt_REVOMADICTotalLikes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalComments"
            label="YT REVO MADIC Comments"
            values={values.yt_REVOMADICTotalComments}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="yt_REVOMADICTotalComments"
            label="YT REVO MADIC Comments"
            values={values.yt_ClubREVOTotalLikes}
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
            label="Pinterest Clicks"
            values={values.pinterest_TotalPinClicks}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterest_TotalViews"
            label="Pinterest Views"
            values={values.pinterest_TotalViews}
            onChange={handleChange}
          />
        </Grid>

        {/* REVO Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_Twitter"
            label="REVO Twitter"
            values={values.revo_Twitter}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_TTViews"
            label="REVO TT Views"
            values={values.revo_TTViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField name="revo_TikTok" label="REVO TikTok" values={values.revo_TikTok} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_Youtube"
            label="REVO Youtube"
            values={values.revo_Youtube}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="revo_Youtube"
            label="REVO Youtube"
            values={values.revo_ClubRevoYoutube}
            onChange={handleChange}
          />
        </Grid>

        {/* Relations Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tikTokAccountsused"
            label="TikTok Accounts Used"
            values={values.tikTokAccountsused}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="TTDummyAccountsUsed"
            label="TT Dummy Accounts Used"
            values={values.TTDummyAccountsUsed}
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
            values={values.totalContributedEngagement}
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
      </Grid>
    </form>
  );
};
