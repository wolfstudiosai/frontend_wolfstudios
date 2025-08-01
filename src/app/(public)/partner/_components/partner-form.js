'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomMultiDatePicker } from '/src/components/formFields/custom-multi-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { CustomMultipleInputFieldV2 } from '../../../../components/formFields/custom-multiple-input-field-v2';
import { CustomMultipleSelect } from '../../../../components/formFields/custom-multiple-select';
import {
  getCaseStudyListAsync,
  getCityListAsync,
  getCountryListAsync,
  getDestinationListAsync,
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
  getStateListAsync,
  getTagListAsync,
} from '../../../../lib/common.actions';
import { getContentListAsync } from '../../../(private)/all-content/_lib/all-content.actions';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';
import { getProductionAsync, getProductionListAsync } from '../../production/_lib/production.action';
import { profileStatus } from '../_lib/partner.constants';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';

export const PartnerForm = ({ formikProps }) => {
  // *********************States*********************************
  const [uploaderStates, setUploaderStates] = React.useState({
    thumbnailImage: false,
    mediaKit: false,
    partnerGallery: false,
    receipts: false,
    contracts: false,
  });

  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    profileCategory: [],
    countries: [],
    states: [],
    cities: [],
    contentHQ: [],
    productionHQ: [],
    productionHQ2: [],
    portfolios: [],
    stakeholders: [],
    retailPartners: [],
    caseStudies: [],
    tags: [],
    destinations: [],
    proposedCampaigns: [],
    products: [],
  });

  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    profileCategory: '',
    countries: getCountryListAsync,
    states: getStateListAsync,
    cities: getCityListAsync,
    contentHQ: getContentListAsync,
    productionHQ: getProductionListAsync,
    productionHQ2: getProductionListAsync,
    portfolios: getPortfolioListAsync,
    stakeholders: getStakeHolderListAsync,
    retailPartners: getRetailPartnerListAsync,
    caseStudies: getCaseStudyListAsync,
    tags: getTagListAsync,
    destinations: getDestinationListAsync,
    proposedCampaigns: getCampaignListAsync,
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
          mt: 4,
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
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField label="Name" name="name" value={values.name} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Email" name="email" value={values.email} onChange={handleChange} />
          <ErrorMessage error={errors.email} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Phone" name="phone" value={values.phone} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Occupation" name="occupation" value={values.occupation} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Client" name="client" value={values.client} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="clientStatus"
            label="Client Status"
            value={values.clientStatus}
            onChange={(value) => setFieldValue('clientStatus', value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Notes" name="notes" value={values.notes} onChange={handleChange} />
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
            Social
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Instagram" name="instagram" value={values.instagram} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Facebook" name="facebook" value={values.facebook} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="LinkedIn" name="linkedin" value={values.linkedin} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Pinterest" name="pinterest" value={values.pinterest} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Snapchat" name="snapchat" value={values.snapchat} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Twitter/X" name="x" value={values.x} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="YouTube" name="youtube" value={values.youtube} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Twitch" name="twitch" value={values.twitch} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="TikTok" name="tiktok" value={values.tiktok} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="WhatsApp" name="whatsapp" value={values.whatsapp} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Website" name="website" value={values.website} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Medium" name="medium" value={values.medium} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="SoundCloud" name="soundcloud" value={values.soundcloud} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Spotify" name="spotify" value={values.spotify} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Podcast" name="podcast" value={values.podcast} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField label="Linktree" name="linktree" value={values.linktree} onChange={handleChange} />
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
            Metrics
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="instagramFollowing"
            type="number"
            label="Instagram Following"
            value={values.instagramFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="data?.partner360Rate"
            type="number"
            label="Partner360 Rate"
            value={values.data?.partner360Rate}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="facebookFollowing"
            type="number"
            label="Facebook Following"
            value={values.facebookFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="linkedinConnections"
            type="number"
            label="LinkedIn Connections"
            value={values.linkedinConnections}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="youtubeFollowing"
            type="number"
            label="YouTube Following"
            value={values.youtubeFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="snapchatFollowing"
            type="number"
            label="Snapchat Following"
            value={values.snapchatFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="xFollowing"
            type="number"
            label="X (Twitter) Following"
            value={values.xFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinterestFollowing"
            type="number"
            label="Pinterest Following"
            value={values.pinterestFollowing}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tiktokFollowing"
            type="number"
            label="TikTok Following"
            value={values.tiktokFollowing}
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
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Finance
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalROI"
            type="number"
            label="Total ROI"
            value={values.totalROI}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partnerPostViews"
            type="number"
            label="Partner Post Views"
            value={values.partnerPostViews}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalContributedEngagementByContent"
            type="number"
            label="Total Contributed Engagement By Content"
            value={values.totalContributedEngagementByContent}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalExpense"
            type="number"
            label="Total Expense"
            value={values.totalExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="totalProductCOGExpense"
            type="number"
            label="Product COG Expense"
            value={values.totalProductCOGExpense}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="shippingFBAFeeGiftedPartners"
            type="number"
            label="FBA Shipping Fees"
            value={values.shippingFBAFeeGiftedPartners}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="shippingExpense"
            type="number"
            label="Shipping Expense"
            value={values.shippingExpense}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="paypalFee"
            type="number"
            label="PayPal Fees"
            value={values.paypalFee}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="amazonReferralFee"
            type="number"
            label="Amazon Referral Fees"
            value={values.amazonReferralFee}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="previousCollabExpense"
            type="number"
            label="Previous Collab Expense"
            value={values.previousCollabExpense}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="oneOffExpense"
            type="number"
            label="One-Time Expense"
            value={values.oneOffExpense}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="hourlyRate"
            type="number"
            label="Hourly Rate"
            value={values.hourlyRate}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="amountPaid"
            type="number"
            label="Amount Paid"
            value={values.amountPaid}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="ugcRetainerAmount"
            type="number"
            label="UGC Retainer Amount"
            value={values.ugcRetainerAmount}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="estimatedTaxes"
            type="number"
            label="Estimated Taxes"
            value={values.estimatedTaxes}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="remainingCredits"
            type="number"
            label="Remaining Credits"
            value={values.remainingCredits}
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
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Partner Status
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Profile Status"
            value={values.profileStatus}
            onChange={(newValues) => setFieldValue('profileStatus', newValues)}
            options={profileStatus}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Current Status"
            value={values.currentStatus}
            onChange={(newValues) => setFieldValue('currentStatus', newValues)}
            options={profileStatus}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            label="Open To Gifting"
            value={values.openToGifting}
            onChange={(newValues) => setFieldValue('openToGifting', newValues)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            label="Open To Whitelisting"
            value={values.openToWhitelisting}
            onChange={(newValues) => setFieldValue('openToWhitelisting', newValues)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            label="Featured"
            value={values.isFeatured}
            onChange={(newValues) => setFieldValue('isFeatured', newValues)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </Grid>
        {/* <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            multiple
            label="Profile Category"
            name="profileCategory"
            value={values.profileCategory}
            onChange={(_, value) => setFieldValue('profileCategory', value)}
            defaultOptions={autoCompleteOptions?.profileCategory}
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
        </Grid> */}
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'ageBracket'}
            label="Age Bracket"
            value={values?.ageBracket}
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
          mt: 4,
        }}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Partner Status
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            label="Mailing Address"
            name="mailingAddress"
            value={values.mailingAddress}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label={'Month Sourced'}
            error={errors.monthSourced}
            value={values.monthSourced}
            format="MMMM YYYY"
            onChange={(value) => setFieldValue('monthSourced', value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Countries"
            name="countries"
            multiple
            value={values.countries}
            defaultOptions={autoCompleteOptions.countries}
            onChange={(e, val) => setFieldValue('countries', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getCountryListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="States"
            name="states"
            multiple
            value={values.states}
            defaultOptions={autoCompleteOptions.states}
            onChange={(e, val) => setFieldValue('states', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getStateListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Cities"
            name="cities"
            multiple
            value={values.cities}
            defaultOptions={autoCompleteOptions.cities}
            onChange={(e, val) => setFieldValue('cities', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
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
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'sourcedFrom'}
            label="Sourced From"
            value={values?.sourcedFrom}
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomMultiDatePicker
            name="campaignMonth"
            label="Campaign Month"
            value={values.campaignMonth}
            onChange={(value) => setFieldValue('campaignMonth', value)} />
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
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Payment
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomTextField
            name="paymentLink"
            label="Payment Link"
            value={values.paymentLink}
            onChange={handleChange}
            error={null}
            helperText={''}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            name="bookingLink"
            label="Booking Link"
            value={values.bookingLink}
            onChange={handleChange}
            error={null}
            helperText={''}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="ugcPaymentStatus"
            label="UGC Payment Status"
            value={values.ugcPaymentStatus}
            onChange={(value) => setFieldValue('ugcPaymentStatus', value)}
            options={[
              { value: 'Paid', label: 'Paid' },
              { value: 'UnPaid', label: 'UnPaid' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Second Payment Date"
            error={errors.secondPaymentDate}
            value={values.secondPaymentDate}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('secondPaymentDate', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <CustomMultipleInputFieldV2
            name={'affiliatePlatform'}
            label="Affiliate Platform"
            value={values?.affiliatePlatform}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="levantaID"
            type="number"
            label="Levanta ID"
            value={values.levantaID}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="impactID"
            type="number"
            label="Impact ID"
            value={values.impactID}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="shareasaleID"
            type="number"
            label="Shareasale ID"
            value={values.shareasaleID}
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
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Media & Assets
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive File"
            value={values.googleDriveFiles}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Content HQ"
            name="contentHQ"
            multiple
            value={values.contentHQ}
            defaultOptions={autoCompleteOptions.contentHQ}
            onChange={(e, val) => setFieldValue('contentHQ', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getContentListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Production HQ"
            name="productionHQ"
            multiple
            value={values.productionHQ}
            defaultOptions={autoCompleteOptions.productionHQ}
            onChange={(e, val) => setFieldValue('productionHQ', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getProductionListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Production HQ2"
            name="productionHQ2"
            multiple
            value={values.productionHQ2}
            defaultOptions={autoCompleteOptions.productionHQ2}
            onChange={(e, val) => setFieldValue('productionHQ2', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getProductionAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Proposed Campaigns"
            name="proposedCampaigns"
            multiple
            value={values.proposedCampaigns}
            defaultOptions={autoCompleteOptions.proposedCampaigns}
            onChange={(e, val) => setFieldValue('proposedCampaigns', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getCampaignListAsync(paging, debounceValue);
              return (
                res?.data?.map((item) => ({
                  label: item.projectTitle,
                  value: item.id,
                })) || []
              );
            }}
            placeholder={undefined}
            error={undefined}
            onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Products"
            name="products"
            multiple
            value={values.products}
            defaultOptions={autoCompleteOptions.products}
            onChange={(e, val) => setFieldValue('products', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
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

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Stakeholders"
            name="stakeholders"
            multiple
            value={values.stakeholders}
            defaultOptions={autoCompleteOptions.stakeholders}
            onChange={(e, val) => setFieldValue('stakeholders', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Case Studies"
            name="caseStudies"
            multiple
            value={values.caseStudies}
            defaultOptions={autoCompleteOptions.caseStudies}
            onChange={(e, val) => setFieldValue('caseStudies', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getCaseStudyListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Tags"
            name="tags"
            multiple
            value={values.tags}
            defaultOptions={autoCompleteOptions.tags}
            onChange={(e, val) => setFieldValue('tags', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getRetailPartnerListAsync(paging, debounceValue);
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
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomAutoCompleteV2
            label="Destinations"
            name="destinations"
            multiple
            value={values.destinations}
            defaultOptions={autoCompleteOptions.destinations}
            onChange={(e, val) => setFieldValue('destinations', val)}
            fetchOptions={async (debounceValue) => {
              const paging = { page: 1, rowsPerPage: 100 };
              const res = await getRetailPartnerListAsync(paging, debounceValue);
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

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="auditedJan2025"
            label="Audited Jan 2025?"
            value={values.auditedJan2025}
            onChange={(value) => setFieldValue('auditedJan2025', value)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="auditedJune2025"
            label="Audited June 2025?"
            value={values.auditedJune2025}
            onChange={(value) => setFieldValue('auditedJune2025', value)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="refusalReason"
            label="Refusal Reason"
            value={values.refusalReason}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="journeyStep"
            label="Journey Step?"
            value={values.journeyStep}
            onChange={(value) => setFieldValue('journeyStep', value)}
            options={[
              { value: 'Onboarding', label: 'Onboarding' },
              { value: 'Discovery', label: 'Discovery' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.mediaKit}
            onClose={() => setUploaderStates((prev) => ({ ...prev, mediaKit: false }))}
            onSave={(urls) => setFieldValue('mediaKit', urls)}
            value={values?.mediaKit}
            label="Media Kit"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, mediaKit: true }))}
            onDelete={(filteredUrls) => setFieldValue('mediaKit', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.partnerGallery}
            onClose={() => setUploaderStates((prev) => ({ ...prev, partnerGallery: false }))}
            onSave={(urls) => setFieldValue('partnerGallery', urls)}
            value={values?.partnerGallery}
            label="Partner Gallery"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, partnerGallery: true }))}
            onDelete={(filteredUrls) => setFieldValue('partnerGallery', filteredUrls)}
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
      </Grid>
    </form>
  );
};
