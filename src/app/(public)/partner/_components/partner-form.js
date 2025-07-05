'use client';

import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';
import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomMultiDatePicker } from '/src/components/formFields/custom-multi-date-picker';

import { affiliatePlatform, ageBracket, platformDeliverables, platforms, sourcedFrom, status } from '../_lib/partner.constants';
import {
  getCaseStudyListAsync,
  getCityListAsync,
  getCountryListAsync,
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
  getStateListAsync,
  getTagListAsync,
  getDestinationListAsync,
} from '../../../../lib/common.actions';
import { getContentList } from '/src/app/(private)/all-content/_lib/all-content.actions';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';
import { getProductionListAsync } from '../../production/_lib/production.action';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';

export const PartnerForm = ({ handleChange, values, errors, setFieldValue, loading, onSubmit }) => {
  // *********************States*********************************
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState({
    profileImage: false,
    mediaKit: false,
    partnerGallery: false,
    receipts: false,
    contracts: false,
  });
  // Relational Data States
  const [stackholders, setStackholders] = React.useState([]);
  const [contentHQs, setContentHQs] = React.useState([]);
  const [profileCategory, setProfileCategory] = React.useState([]);
  const [portfolios, setPortfolios] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [caseStudies, setCaseStudies] = React.useState([]);
  const [productionHQs, setProductionHQs] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [campaigns, setCampaigns] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [retailPartners, setRetailPartners] = React.useState([]);
  const [destinations, setDestinations] = React.useState([]);

  // --------------- Fetch Prerequisites Data -------------------
  React.useEffect(() => {
    const fetchPrerequisitesData = async () => {
      try {
        // Stakeholders
        const stakeholdersResponse = await getStakeHolderListAsync({ page: 1, rowsPerPage: 20 });
        if (stakeholdersResponse?.success) {
          const options = stakeholdersResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setStackholders(options);
        }

        // Content HQs
        const contentHQsResponse = await getContentList({ page: 1, rowsPerPage: 20 });
        if (contentHQsResponse?.success) {
          const options = contentHQsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setContentHQs(options);
        }

        // Profile Category
        // const profileCategoryResponse = await getProfileCategoryListAsync({ page: 1, rowsPerPage: 20 });
        // if (profileCategoryResponse?.success) {
        //   const options = profileCategoryResponse.data.map((item) => ({ value: item.id, label: item.name }));
        //   setProfileCategory(options);
        // }

        // Portfolios
        const portfoliosResponse = await getPortfolioListAsync({ page: 1, rowsPerPage: 20 });
        if (portfoliosResponse?.success) {
          const options = portfoliosResponse.data.map((item) => ({ value: item.id, label: item.projectTitle }));
          setPortfolios(options);
        }

        // States
        const statesResponse = await getStateListAsync({ page: 1, rowsPerPage: 20 });
        if (statesResponse?.success) {
          const options = statesResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setStates(options);
        }

        // Cities
        const citiesResponse = await getCityListAsync({ page: 1, rowsPerPage: 20 });
        if (citiesResponse?.success) {
          const options = citiesResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setCities(options);
        }

        // Services
        // const servicesResponse = await getServiceListAsync({ page: 1, rowsPerPage: 20 });
        // if (servicesResponse?.success) {
        //   const options = servicesResponse.data.map((item) => ({ value: item.id, label: item.name }));
        //   setServices(options);
        // }

        // Case Studies
        const caseStudiesResponse = await getCaseStudyListAsync({ page: 1, rowsPerPage: 20 });
        if (caseStudiesResponse?.success) {
          const options = caseStudiesResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setCaseStudies(options);
        }

        // Production HQs
        const productionHQsResponse = await getProductionListAsync({ page: 1, rowsPerPage: 20 });
        if (productionHQsResponse?.success) {
          const options = productionHQsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setProductionHQs(options);
        }

        // Products
        const productsResponse = await getProductListAsync({ page: 1, rowsPerPage: 20 });
        if (productsResponse?.success) {
          const options = productsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setProducts(options);
        }

        // Campaigns
        const campaignsResponse = await getCampaignListAsync({ page: 1, rowsPerPage: 20 });
        if (campaignsResponse?.success) {
          const options = campaignsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setCampaigns(options);
        }

        // Countries
        const countriesResponse = await getCountryListAsync({ page: 1, rowsPerPage: 20 });
        if (countriesResponse?.success) {
          const options = countriesResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setCountries(options);
        }

        // Tags
        const tagsResponse = await getTagListAsync({ page: 1, rowsPerPage: 20 });
        if (tagsResponse?.success) {
          const options = tagsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setTags(options);
        }

        // Retail Partners
        const retailPartnersResponse = await getRetailPartnerListAsync({ page: 1, rowsPerPage: 20 });
        if (retailPartnersResponse?.success) {
          const options = retailPartnersResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setRetailPartners(options);
        }

        // Destinations
        const destinationsResponse = await getDestinationListAsync({ page: 1, rowsPerPage: 20 });
        if (destinationsResponse?.success) {
          const options = destinationsResponse.data.map((item) => ({ value: item.id, label: item.name }));
          setDestinations(options);
        }
      } catch (error) {

      }
    };

    fetchPrerequisitesData();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} sx={{ pb: 5 }}>
          {/* Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          {/* Email */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="email" type="email" label="Email" value={values.email} onChange={handleChange} />
            <ErrorMessage error={errors.email} />
          </Grid>

          {/* Total ROI */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="totalROI" type="number" label="Total ROI" value={values.totalROI} onChange={handleChange} />
          </Grid>

          {/* Total Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="totalExpense" type="number" label="Total Expense" value={values.totalExpense} onChange={handleChange} />
          </Grid>

          {/* Shipping FBA Fee Gifted Partners */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="shippingFBAFeeGiftedPartners" type="number" label="Shipping FBA Fee Gifted Partners" value={values.shippingFBAFeeGiftedPartners} onChange={handleChange} />
          </Grid>

          {/* Paypal Fee */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="paypalFee" type="number" label="Paypal Fee" value={values.paypalFee} onChange={handleChange} />
          </Grid>

          {/* Amazon Referral Fee */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="amazonReferralFee" type="number" label="Amazon Referral Fee" value={values.amazonReferralFee} onChange={handleChange} />
          </Grid>

          {/* Instagram */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="instagram" type="text" label="Instagram" value={values.instagram} onChange={handleChange} />
          </Grid>

          {/* Instagram Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="instagramFollowing" type="number" label="Instagram Following" value={values.instagramFollowing} onChange={handleChange} />
          </Grid>

          {/* Profile Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label="Profile Status"
              value={values.profileStatus}
              onChange={(value) => setFieldValue('profileStatus', value)}
              options={status}
              multiple
            />
          </Grid>

          {/* LinkedIn */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="linkedin" type="text" label="LinkedIn" value={values.linkedin} onChange={handleChange} />
          </Grid>

          {/* LinkedIn Connections */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="linkedinConnections" type="number" label="LinkedIn Connections" value={values.linkedinConnections} onChange={handleChange} />
          </Grid>

          {/* Youtube */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="youtube" type="text" label="Youtube" value={values.youtube} onChange={handleChange} />
          </Grid>

          {/* Youtube Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="youtubeFollowing" type="number" label="Youtube Following" value={values.youtubeFollowing} onChange={handleChange} />
          </Grid>

          {/* Snapchat */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="snapchat" type="text" label="Snapchat" value={values.snapchat} onChange={handleChange} />
          </Grid>

          {/* Snapchat Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="snapchatFollowing" type="number" label="Snapchat Following" value={values.snapchatFollowing} onChange={handleChange} />
          </Grid>

          {/* X */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="x" type="text" label="X" value={values.x} onChange={handleChange} />
          </Grid>

          {/* X Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="xFollowing" type="number" label="X Following" value={values.xFollowing} onChange={handleChange} />
          </Grid>

          {/* Pinterest */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="pinterest" type="text" label="Pinterest" value={values.pinterest} onChange={handleChange} />
          </Grid>

          {/* Pinterest Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="pinterestFollowing" type="number" label="Pinterest Following" value={values.pinterestFollowing} onChange={handleChange} />
          </Grid>

          {/* Tiktok */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="tiktok" type="text" label="Tiktok" value={values.tiktok} onChange={handleChange} />
          </Grid>

          {/* Tiktok Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="tiktokFollowing" type="number" label="Tiktok Following" value={values.tiktokFollowing} onChange={handleChange} />
          </Grid>

          {/* Facebook */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="facebook" type="text" label="Facebook" value={values.facebook} onChange={handleChange} />
          </Grid>

          {/* Facebook Following */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="facebookFollowing" type="number" label="Facebook Following" value={values.facebookFollowing} onChange={handleChange} />
          </Grid>

          {/* Website */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="website" type="text" label="Website" value={values.website} onChange={handleChange} />
          </Grid>

          {/* Medium */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="medium" type="text" label="Medium" value={values.medium} onChange={handleChange} />
          </Grid>

          {/* Soundcloud */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="soundcloud" type="text" label="Soundcloud" value={values.soundcloud} onChange={handleChange} />
          </Grid>

          {/* Spotify */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="spotify" type="text" label="Spotify" value={values.spotify} onChange={handleChange} />
          </Grid>

          {/* Mailing Address */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="mailingAddress" type="text" label="Mailing Address" value={values.mailingAddress} onChange={handleChange} />
          </Grid>

          {/* Previous Collaboration Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="previousCollabExpense" type="number" label="Previous Collaboration Expense" value={values.previousCollabExpense} onChange={handleChange} />
          </Grid>

          {/* Total Product COG Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="totalProductCOGExpense" type="number" label="Total Product COG Expense" value={values.totalProductCOGExpense} onChange={handleChange} />
          </Grid>

          {/* Shipping Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="shippingExpense" type="number" label="Shipping Expense" value={values.shippingExpense} onChange={handleChange} />
          </Grid>

          {/* One Off Expense */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="oneOffExpense" type="number" label="One Off Expense" value={values.oneOffExpense} onChange={handleChange} />
          </Grid>

          {/* Current Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Current Status"
              value={values.currentStatus}
              onChange={(value) => setFieldValue('currentStatus', value)}
              options={status}
              multiple
            />
          </Grid>

          {/* Occupation */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="occupation" label="Occupation" value={values.occupation} onChange={handleChange} />
          </Grid>

          {/* Payment Link */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="paymentLink" label="Payment Link" value={values.paymentLink} onChange={handleChange} />
          </Grid>

          {/* Client */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="client" label="Client" value={values.client} onChange={handleChange} />
          </Grid>

          {/* Notes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="notes" label="Notes" multiline value={values.notes} onChange={handleChange} />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="phone" label="Phone" value={values.phone} onChange={handleChange} />
          </Grid>

          {/* Podcast */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="podcast" label="Podcast" value={values.podcast} onChange={handleChange} />
          </Grid>

          {/* Partner 360 Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partner360Rate" type="number" label="Partner 360 Rate" value={values.partner360Rate} onChange={handleChange} />
          </Grid>

          {/* Refusal Reason */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="refusalReason" label="Refusal Reason" value={values.refusalReason} onChange={handleChange} />
          </Grid>

          {/* Twitch */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="twitch" label="Twitch" value={values.twitch} onChange={handleChange} />
          </Grid>

          {/* Revo Amazon Order Confirmation Number */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="revoAmazonOrderConfirmationNumber" label="Revo Amazon Order Confirmation Number" value={values.revoAmazonOrderConfirmationNumber} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Link */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewLink" label="Amazon Review Link" value={values.amazonReviewLink} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Cupper */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewCupper" label="Amazon Review Cupper" value={values.amazonReviewCupper} onChange={handleChange} />
          </Grid>

          {/* Amazon Review The Pill */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewThePill" label="Amazon Review The Pill" value={values.amazonReviewThePill} onChange={handleChange} />
          </Grid>

          {/* Amazon Storefront */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonStorefront" label="Amazon Storefront" value={values.amazonStorefront} onChange={handleChange} />
          </Grid>

          {/* Campaign Month */}
          <Grid size={{ xs: 12 }}>
            <CustomMultiDatePicker
              name="campaignMonth"
              label="Campaign Month"
              value={values.campaignMonth}
              onChange={(value) => setFieldValue('campaignMonth', value)} />
          </Grid>

          {/* Deliverables */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="deliverables" label="Deliverables" value={values.deliverables} onChange={handleChange} />
          </Grid>

          {/* Google Drive Files */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="googleDriveFiles" label="Google Drive Files" value={values.googleDriveFiles} onChange={handleChange} />
          </Grid>

          {/* Revo IG Post */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="revoIGPost" label="Revo IG Post" value={values.revoIGPost} onChange={handleChange} />
          </Grid>

          {/* Journey Step */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="journeyStep"
              label="Journey Step"
              value={values.journeyStep}
              onChange={handleChange}
            />
          </Grid>

          {/* Partner IG Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partnerIGRate" type="number" label="Partner IG Rate" value={values.partnerIGRate} onChange={handleChange} />
          </Grid>

          {/* Partner TT Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partnerTTRate" type="number" label="Partner TT Rate" value={values.partnerTTRate} onChange={handleChange} />
          </Grid>

          {/* Partner YT Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partnerYTRate" type="number" label="Partner YT Rate" value={values.partnerYTRate} onChange={handleChange} />
          </Grid>

          {/* Amount Paid */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amountPaid" type="number" label="Amount Paid" value={values.amountPaid} onChange={handleChange} />
          </Grid>

          {/* Total Contributed Engagement By Content */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="totalContributedEngagementByContent" type="number" label="Total Contributed Engagement By Content" value={values.totalContributedEngagementByContent} onChange={handleChange} />
          </Grid>

          {/* Total Audience */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="totalAudience" type="number" label="Total Audience" value={values.totalAudience} onChange={handleChange} />
          </Grid>

          {/* Platform Deliverables */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Platform Deliverables"
              value={values.platformDeliverables}
              onChange={(value) => setFieldValue('platformDeliverables', value)}
              options={platformDeliverables}
              multiple
            />
          </Grid>

          {/* Platforms */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Platforms"
              value={values.platforms}
              onChange={(value) => setFieldValue('platforms', value)}
              options={platforms}
              multiple
            />
          </Grid>

          {/* Revos Offer */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="revosOffer" label="Revos Offer" value={values.revosOffer} onChange={handleChange} />
          </Grid>

          {/* Remaining Credits */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="remainingCredits" type="number" label="Remaining Credits" value={values.remainingCredits} onChange={handleChange} />
          </Grid>

          {/* TT Post */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ttPost" label="TT Post" value={values.ttPost} onChange={handleChange} />
          </Grid>

          {/* UGC Payment Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ugcPaymentStatus" label="UGC Payment Status" value={values.ugcPaymentStatus} onChange={handleChange} />
          </Grid>

          {/* UGC Retainer Amount */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ugcRetainerAmount" type="number" label="UGC Retainer Amount" value={values.ugcRetainerAmount} onChange={handleChange} />
          </Grid>

          {/* UGC TikTok Link */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ugcTikTokLink" label="UGC TikTok Link" value={values.ugcTikTokLink} onChange={handleChange} />
          </Grid>

          {/* Revo UGC Army TT Username and PW */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="revoUGCArmyTTUsernameAndPW" label="Revo UGC Army TT Username and PW" value={values.revoUGCArmyTTUsernameAndPW} onChange={handleChange} />
          </Grid>

          {/* WhatsApp */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="whatsapp" label="WhatsApp" value={values.whatsapp} onChange={handleChange} />
          </Grid>

          {/* YT Post */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ytPost" label="YT Post" value={values.ytPost} onChange={handleChange} />
          </Grid>

          {/* Partner Post Views */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partnerPostViews" type="number" label="Partner Post Views" value={values.partnerPostViews} onChange={handleChange} />
          </Grid>

          {/* Sourced From */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Sourced From"
              value={values.sourcedFrom}
              onChange={(value) => setFieldValue('sourcedFrom', value)}
              options={sourcedFrom}
              multiple
            />
          </Grid>

          {/* Estimated Taxes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="estimatedTaxes" type="number" label="Estimated Taxes" value={values.estimatedTaxes} onChange={handleChange} />
          </Grid>

          {/* Amazon Tax */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonTax" type="number" label="Amazon Tax" value={values.amazonTax} onChange={handleChange} />
          </Grid>

          {/* Amazon Kickback */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonKickback" type="number" label="Amazon Kickback" value={values.amazonKickback} onChange={handleChange} />
          </Grid>

          {/* Month Sourced */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              name="monthSourced"
              label="Month Sourced"
              value={values.monthSourced}
              onChange={(value) => setFieldValue('monthSourced', value)}
              format="MMMM YYYY"
            />
          </Grid>

          {/* Second Payment Date */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              name="SecondPaymentDate"
              label="Second Payment Date"
              value={values.SecondPaymentDate}
              onChange={(value) => setFieldValue('SecondPaymentDate', value)}
              format="YYYY-MM-DD"
            />
          </Grid>

          {/* Client Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              name="clientStatus"
              label="Client Status"
              value={values.clientStatus}
              onChange={(value) => setFieldValue('clientStatus', value)}
              options={status}
            />
          </Grid>

          {/* Affiliate Platform */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Affiliate Platform"
              value={values.affiliatePlatform}
              onChange={(value) => setFieldValue('affiliatePlatform', value)}
              options={affiliatePlatform}
              multiple
            />
          </Grid>

          {/* Booking Link */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="bookingLink" label="Booking Link" value={values.bookingLink} onChange={handleChange} />
          </Grid>

          {/* Age Bracket */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Age Bracket"
              value={values.ageBracket}
              onChange={(value) => setFieldValue('ageBracket', value)}
              options={ageBracket}
              multiple
            />
          </Grid>

          {/* Hourly Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="hourlyRate" type="number" label="Hourly Rate" value={values.hourlyRate} onChange={handleChange} />
          </Grid>

          {/* Linktree */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="linktree" label="Linktree" value={values.linktree} onChange={handleChange} />
          </Grid>

          {/* Partner UGC Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="partnerUGCRate" type="number" label="Partner UGC Rate" value={values.partnerUGCRate} onChange={handleChange} />
          </Grid>

          {/* Revo Counteroffer */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="revoCounteroffer" label="Revo Counteroffer" value={values.revoCounteroffer} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Walking Pad Pro */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewWalkingPadPro" label="Amazon Review Walking Pad Pro" value={values.amazonReviewWalkingPadPro} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Walking Pad Standard */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewWalkingPadStandard" label="Amazon Review Walking Pad Standard" value={values.amazonReviewWalkingPadStandard} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Oil */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewOil" label="Amazon Review Oil" value={values.amazonReviewOil} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Soothing Cream */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewSoothingCream" label="Amazon Review Soothing Cream" value={values.amazonReviewSoothingCream} onChange={handleChange} />
          </Grid>

          {/* Amazon Review Beauty Wand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonReviewBeautyWand" label="Amazon Review Beauty Wand" value={values.amazonReviewBeautyWand} onChange={handleChange} />
          </Grid>

          {/* Levanta ID */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="levantaID" type="number" label="Levanta ID" value={values.levantaID} onChange={handleChange} />
          </Grid>

          {/* Impact ID */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="impactID" type="number" label="Impact ID" value={values.impactID} onChange={handleChange} />
          </Grid>

          {/* Shareasale ID */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="shareasaleID" type="number" label="Shareasale ID" value={values.shareasaleID} onChange={handleChange} />
          </Grid>

          {/* FBA X Levanta */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="fbaXLevanta" type="number" label="FBA X Levanta" value={values.fbaXLevanta} onChange={handleChange} />
          </Grid>

          {/* Amazon Order Total */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="amazonOrderTotal" type="number" label="Amazon Order Total" value={values.amazonOrderTotal} onChange={handleChange} />
          </Grid>

          {/* Stakeholder */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Stakeholder"
              value={values.stakeholders}
              onChange={(_, value) => setFieldValue('stakeholders', value)}
              defaultOptions={stackholders}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getStakeHolderListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Content HQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Content HQ"
              value={values.contentHQ}
              onChange={(_, value) => setFieldValue('contentHQ', value)}
              defaultOptions={contentHQs}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getContentList(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Profile Category */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* <CustomAutoCompleteV2
              multiple
              label="Profile Category"
              value={values.profileCategory}
              onChange={(_, value) => setFieldValue('profileCategory', value)}
              defaultOptions={profileCategories}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getProfileCategoryListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            /> */}
          </Grid>

          {/* Portfolios */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Portfolio"
              value={values.portfolios}
              onChange={(_, value) => setFieldValue('portfolios', value)}
              defaultOptions={portfolios}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getPortfolioListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* State */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="State"
              value={values.state}
              onChange={(_, value) => setFieldValue('state', value)}
              defaultOptions={states}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getStateListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* City */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="City"
              value={values.city}
              onChange={(_, value) => setFieldValue('city', value)}
              defaultOptions={cities}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getCityListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* <CustomAutoCompleteV2
              multiple
              label="Service"
              value={values.services}
              onChange={(_, value) => setFieldValue('services', value)}
              defaultOptions={services}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getServiceListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            /> */}
          </Grid>

          {/* Case Study */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Case Study"
              value={values.caseStudies}
              onChange={(_, value) => setFieldValue('caseStudies', value)}
              defaultOptions={caseStudies}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getCaseStudyListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Production HQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Production HQ"
              value={values.productionHQ}
              onChange={(_, value) => setFieldValue('productionHQ', value)}
              defaultOptions={productionHQs}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getProductionHQListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Products */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Product"
              value={values.products}
              onChange={(_, value) => setFieldValue('products', value)}
              defaultOptions={products}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getProductListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Contributed Campaign */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Contributed Campaign"
              value={values.contributedCampaigns}
              onChange={(_, value) => setFieldValue('contributedCampaigns', value)}
              defaultOptions={campaigns}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getCampaignListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>


          {/* Country */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Country"
              value={values.country}
              onChange={(_, value) => setFieldValue('country', value)}
              defaultOptions={countries}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getCountryListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Tags */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Tags"
              value={values.tags}
              onChange={(_, value) => setFieldValue('tags', value)}
              defaultOptions={tags}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getTagListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Retail Partner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Retail Partner"
              value={values.retailPartner}
              onChange={(_, value) => setFieldValue('retailPartner', value)}
              defaultOptions={retailPartners}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getRetailPartnerListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Destination */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Destination"
              value={values.destinations}
              onChange={(_, value) => setFieldValue('destinations', value)}
              defaultOptions={destinations}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getDestinationListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Propsed Campaign */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Proposed Campaign"
              value={values.proposedCampaigns}
              onChange={(_, value) => setFieldValue('proposedCampaigns', value)}
              defaultOptions={campaigns}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getCampaignListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Production HQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              multiple
              label="Production HQ 2"
              value={values.productionHQ2}
              onChange={(_, value) => setFieldValue('productionHQ2', value)}
              defaultOptions={productionHQs}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getProductionListAsync(paging, debounceValue);
                return res?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || [];
              }}
            />
          </Grid>

          {/* Is Featured */}
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box display="flex" gap={2} flexWrap="wrap" justifyContent="space-between" width="100%">
              <FormControlLabel
                checked={values.isFeatured}
                onChange={handleChange}
                name="isFeatured"
                control={<Checkbox />}
                label="Is Featured"
              />

              <FormControlLabel
                checked={values.auditedJan2025}
                onChange={handleChange}
                name="auditedJan2025"
                control={<Checkbox />}
                label="Audited Jan 2025"
              />

              <FormControlLabel
                checked={values.auditedJune2025}
                onChange={handleChange}
                name="auditedJune2025"
                control={<Checkbox />}
                label="Audited June 2025"
              />

              <FormControlLabel
                checked={values.openToWhitelisting}
                onChange={handleChange}
                name="openToWhitelisting"
                control={<Checkbox />}
                label="Open To Whitelisting"
              />

              <FormControlLabel
                checked={values.openToGifting}
                onChange={handleChange}
                name="openToGifting"
                control={<Checkbox />}
                label="Open To Gifting"
              />
            </Box>
          </Grid>

          {/* Profile Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog.profileImage}
              onClose={() => setOpenImageUploadDialog({ ...openImageUploadDialog, profileImage: false })}
              onSave={(urls) => setFieldValue('profileImage', urls)}
              value={values?.profileImage}
              label="Profile Image"
              onAdd={() => setOpenImageUploadDialog({ ...openImageUploadDialog, profileImage: true })}
              onDelete={(filteredUrls) => setFieldValue('profileImage', filteredUrls)}
              folderName="partner-HQ"
              hideVideoUploader
            />
          </Grid>

          {/* Media Kit */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog.mediaKit}
              onClose={() => setOpenImageUploadDialog({ ...openImageUploadDialog, mediaKit: false })}
              onSave={(urls) => setFieldValue('mediaKit', urls)}
              value={values?.mediaKit}
              label="Media Kit"
              onAdd={() => setOpenImageUploadDialog({ ...openImageUploadDialog, mediaKit: true })}
              onDelete={(filteredUrls) => setFieldValue('mediaKit', filteredUrls)}
              folderName="partner-HQ"
              hideVideoUploader
            />
          </Grid>

          {/* Partner Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog.partnerGallery}
              onClose={() => setOpenImageUploadDialog({ ...openImageUploadDialog, partnerGallery: false })}
              onSave={(urls) => setFieldValue('partnerGallery', urls)}
              value={values?.partnerGallery}
              label="Partner Gallery"
              onAdd={() => setOpenImageUploadDialog({ ...openImageUploadDialog, partnerGallery: true })}
              onDelete={(filteredUrls) => setFieldValue('partnerGallery', filteredUrls)}
              folderName="partner-HQ"
              hideVideoUploader
            />
          </Grid>

          {/* Receipts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog.receipts}
              onClose={() => setOpenImageUploadDialog({ ...openImageUploadDialog, receipts: false })}
              onSave={(urls) => setFieldValue('receipts', urls)}
              value={values?.receipts}
              label="Receipts"
              onAdd={() => setOpenImageUploadDialog({ ...openImageUploadDialog, receipts: true })}
              onDelete={(filteredUrls) => setFieldValue('receipts', filteredUrls)}
              folderName="partner-HQ"
              hideVideoUploader
            />
          </Grid>

          {/* Contracts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog.contracts}
              onClose={() => setOpenImageUploadDialog({ ...openImageUploadDialog, contracts: false })}
              onSave={(urls) => setFieldValue('contracts', urls)}
              value={values?.contracts}
              label="Contracts"
              onAdd={() => setOpenImageUploadDialog({ ...openImageUploadDialog, contracts: true })}
              onDelete={(filteredUrls) => setFieldValue('contracts', filteredUrls)}
              folderName="partner-HQ"
              hideVideoUploader
            />
          </Grid>

        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" variant="contained" color="primary" disabled={loading} type="submit">
              Save
            </Button>
          </Stack>
        </Grid>
      </form>
    </>
  );
};
