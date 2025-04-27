'use client';

import React from 'react';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '/src/components/uploaders/image-uploader';

import { createPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner1 } from '../_lib/partner.types';
import { formConstants } from '/src/app/constants/form-constants';

const status = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
];

const profileStatus = [
  { value: 'Complete', label: 'Complete' },
  { value: 'Approved', label: 'Approved' },
];

const ageBracket = [
  { value: '18-25', label: '18-25' },
  { value: '25-30', label: '25-30' },
  { value: '30-40', label: '30-40' },
];

export const PartnerForm = ({ id, onClose, fetchList }) => {
  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: defaultPartner1,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.email) {
        errors.email = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values, 'values');
      setLoading(true);
      try {
        const finalData = { ...values };
        const fieldToConvert = [
          'platformDeliverables',
          'affiliatePlatform',
          'ageBracket',
          'contracts',
          'currentStatus',
          'platforms',
          'profileStatus',
          'sourcedFrom',
        ];
        for (const field of fieldToConvert) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }
        const res = id ? await updatePartnerAsync(finalData) : await createPartnerAsync(finalData);
        if (res.success) {
          onClose?.();
          fetchList();
        } else {
          console.error('Operation failed:', res.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  // *****************Use Effects*******************************

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ pb: 5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField name="email" type="email" label="Email" value={values.email} onChange={handleChange} />
            <ErrorMessage error={errors.email} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Current Status"
              value={values.currentStatus}
              onChange={(_, value) => setFieldValue('currentStatus', value)}
              options={status}
              multiple
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="journeyStep"
              label="Journey Step"
              value={values.journeyStep}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Profile Status"
              value={values.profileStatus}
              onChange={(_, value) => setFieldValue('profileStatus', value)}
              options={profileStatus}
              multiple
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField name="notes" label="Notes" multiline value={values.notes} onChange={handleChange} />
          </Grid>
          {/* Instagram */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="instagram.url"
              label="Instagram URL"
              value={values.instagram?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="instagram.following"
              label="Instagram Following"
              type="number"
              value={values.instagram?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* Tiktok */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="tiktok.url"
              label="Tiktok URL"
              value={values.tiktok?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="tiktok.following"
              label="Tiktok Following"
              type="number"
              value={values.tiktok?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* YouTube */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="youtube.url"
              label="YouTube URL"
              value={values.youtube?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="youtube.following"
              label="YouTube Following"
              type="number"
              value={values.youtube?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* Snapchat */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="snapchat.url"
              label="Snapchat URL"
              value={values.snapchat?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="snapchat.following"
              label="Snapchat Following"
              type="number"
              value={values.snapchat?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* X */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="X.url" label="X URL" value={values.X?.url || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="X.following"
              label="X Following"
              type="number"
              value={values.X?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* Facebook */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="facebook.url"
              label="Facebook URL"
              value={values.facebook?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="facebook.following"
              label="Facebook Following"
              type="number"
              value={values.facebook?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* Pinterest */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="pinterest.url"
              label="pinterest URL"
              value={values.pinterest?.url || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="pinterest.following"
              label="pinterest Following"
              type="number"
              value={values.pinterest?.following || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* linkedin */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="linkedin" label="linkedin" value={values.linkedin || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="linkedinConnections"
              label="linkedin Connections"
              type="number"
              value={values.linkedinConnections || 0}
              onChange={handleChange}
            />
          </Grid>

          {/* additonal */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="hourlyRate"
              label="Hourly Rate"
              value={values.hourlyRate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Age Bracket"
              value={values.ageBracket}
              onChange={(_, value) => setFieldValue('ageBracket', value)}
              options={ageBracket}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="bookingLink"
              label="Booking Link"
              value={values.bookingLink || ''}
              onChange={handleChange}
            />
          </Grid>

          {/* Additional Fields */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="website" label="Website" value={values.website} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="medium" label="Medium" value={values.medium} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="soundcloud" label="Sound Cloud" value={values.soundcloud} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="spotify" label="Spotify" value={values.spotify} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label="Open to Gifting"
              value={values.opentoGifting}
              onChange={(value) => setFieldValue('opentoGifting', value)}
              name="opentoGifting"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="occupation" label="Occupation" value={values.occupation} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label="Client"
              value={values.client}
              onChange={(value) => setFieldValue('client', value)}
              name="client"
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Deactive', label: 'Deactive' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="mailingAddress"
              label="Mailing Address"
              value={values.mailingAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="phone" label="Phone" value={values.phone} onChange={handleChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="podcast" label="Podcast" value={values.podcast} onChange={handleChange} />
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
            <CustomTextField name="twitch" label="Twitch" value={values.twitch} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="revoAmazonOrderConfirmationNumber"
              label="Revo Amazon Order Confirmation No."
              value={values.revoAmazonOrderConfirmationNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewLink"
              label="Amazon Review Link"
              value={values.amazonReviewLink}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewCupper"
              label="Amazon Review Cupper"
              value={values.amazonReviewCupper}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewThePill"
              label="Amazon Review The Pill"
              value={values.amazonReviewThePill}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonStorefront"
              label="Amazon Storefront"
              value={values.amazonStorefront}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="deliverables"
              label="Deliverables"
              value={values.deliverables}
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
            <CustomTextField name="revoIGPost" label="Revo IG Post" value={values.revoIGPost} onChange={handleChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partnerIGRate"
              label="Partner IG Rate"
              value={values.partnerIGRate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partnerTTRate"
              label="Partner TT Rate"
              value={values.partnerTTRate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partnerYTRate"
              label="Partner YT Rate"
              value={values.partnerYTRate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amountPaid"
              label="Amount Paid"
              value={values.amountPaid || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalContributedEngagementByContent"
              label="Total Contributed Engagement ByContent"
              value={values.totalContributedEngagementByContent || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalAudience"
              label="Total Audience"
              value={values.totalAudience || ''}
              onChange={handleChange}
            />
          </Grid>

          {/* Selection Fields */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Platform Deliverables"
              value={values.platformDeliverables}
              onChange={(_, value) => setFieldValue('platformDeliverables', value)}
              options={[
                { value: 'Instagram Post', label: 'Instagram Post' },
                { value: 'YouTube Review', label: 'YouTube Review' },
              ]}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Platforms"
              value={values.platforms}
              onChange={(_, value) => setFieldValue('platforms', value)}
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'NOT_STARTED', label: 'Not started' },
              ]}
              multiple
            />
            {/* <CustomSelect
              label="Platforms"
              value={values.platforms}
              onChange={(value) => setFieldValue('platforms', value)}
              name="platforms"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'NOT_STARTED', label: 'Not started' },
              ]}
            /> */}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="previousCollabExpense"
              label="Previous Collab Expense"
              value={values.previousCollabExpense || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="revoOffer"
              label="Revo Offer"
              value={values.revoOffer || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="remainingCredits"
              label="Remaining Credits"
              type="number"
              value={values.remainingCredits || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ttPost" label="tt Post" value={values.ttPost || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="totalROI" label="Total ROI" value={values.totalROI || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label="UGC Payment Status"
              value={values.ugcPaymentStatus}
              onChange={(value) => setFieldValue('ugcPaymentStatus', value)}
              name="ugcPaymentStatus"
              options={[
                { value: 'Paid', label: 'Paid' },
                { value: 'Not Paid', label: 'Not Paid' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="ugcRetainerAmount"
              label="UGC Retainer Amount"
              type="number"
              value={values.ugcRetainerAmount || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="ugcTikTokLink"
              label="UGC TikTok Link"
              value={values.ugcTikTokLink || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="revoUGCArmyTTUsernamePW"
              label="Revo UGCArmy TT Username PW"
              value={values.revoUGCArmyTTUsernamePW || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="whatsApp" label="Whats App" value={values.whatsApp || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="ytPost" label="Youtube Post" value={values.ytPost || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partnerPostViews"
              label="Partner Post Views"
              type="number"
              value={values.partnerPostViews || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Sourced From"
              value={values.sourcedFrom}
              onChange={(_, value) => setFieldValue('sourcedFrom', value)}
              options={[
                { value: 'Instagram', label: 'Instagram' },
                { value: 'Referral', label: 'Referral' },
              ]}
              multiple
            />
            {/* <CustomSelect
              label="Sourced From"
              value={values.sourcedFrom}
              onChange={(value) => setFieldValue('sourcedFrom', value)}
              name="sourcedFrom"
              options={[
                { value: 'Instagram', label: 'Instagram' },
                { value: 'Referral', label: 'Referral' },
              ]}
            /> */}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="estimatedTaxes"
              label="Estimated Taxes"
              value={values.estimatedTaxes || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="fbaXLevanta"
              label="fbaXLevanta"
              value={values.fbaXLevanta || ''}
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="shippingFBAFeeGiftedPartners"
              label="Shipping FBA Fee Gifted Partners"
              value={values.shippingFBAFeeGiftedPartners || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="levantaAffiliateFee"
              label="levanta Affiliate Fee"
              value={values.levantaAffiliateFee || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="paypalFee"
              label="Paypal Fee"
              value={values.paypalFee || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="shippingExpense"
              label="Shipping Expense"
              value={values.shippingExpense || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReferralFee"
              label="Amazon Referral Fee"
              value={values.amazonReferralFee || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonOrderTotal"
              label="Amazon Order Total"
              value={values.amazonOrderTotal || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonTax"
              label="Amazon Tax"
              value={values.amazonTax || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonKickback"
              label="Amazon Kick back"
              value={values.amazonKickback || ''}
              onChange={handleChange}
            />
          </Grid>
          {/* date pickers*/}
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
            <CustomDatePicker
              label={'Second Payment Date'}
              error={errors.secondPaymentDate}
              value={values.secondPaymentDate}
              format="MMMM YYYY"
              onChange={(value) => setFieldValue('secondPaymentDate', value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label="Client Status"
              value={values.clientStatus}
              onChange={(value) => setFieldValue('clientStatus', value)}
              name="clientStatus"
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="linktree" label="Link tree" value={values.linktree || ''} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partnerUGCRate"
              label="Partner UGC Rate"
              value={values.partnerUGCRate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner360Rate"
              label="Partner 360 Rate"
              value={values.partner360Rate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="revoCounteroffer"
              label="Revo Counter Offer"
              value={values.revoCounteroffer || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label="Open to White listing"
              value={values.opentoWhitelisting}
              onChange={(value) => setFieldValue('opentoWhitelisting', value)}
              name="opentoWhitelisting"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="conversionsBundleCupper"
              label="Conversions Bundle Cupper"
              type="number"
              value={values.conversionsBundleCupper || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="conversionsMassageGun"
              label="Conversions Massage Gun"
              type="number"
              value={values.conversionsMassageGun || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="conversionsCupper"
              label="Conversions Cupper"
              type="number"
              value={values.conversionsCupper || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="conversionsOils"
              label="Conversions Oils"
              type="number"
              value={values.conversionsOils || 0}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="conversionsWalkingPad"
              label="Conversions Walking Pad"
              type="number"
              value={values.conversionsWalkingPad || 0}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewWalkingPadPro"
              label="Amazon Review Walking PadPro"
              value={values.amazonReviewWalkingPadPro || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewWalkingPadStandard"
              label="Amazon Review Walking Pad Standard"
              value={values.amazonReviewWalkingPadStandard || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewOil"
              label="amazon Review Oil"
              value={values.amazonReviewOil || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewSoothingCream"
              label="Amazon Review Soothing Cream"
              value={values.amazonReviewSoothingCream || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="amazonReviewBeautyWand"
              label="Amazon Review Beauty Wand"
              value={values.amazonReviewBeautyWand || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Contracts"
              value={values.contracts}
              onChange={(_, value) => setFieldValue('contracts', value)}
              options={[
                { value: 'Contract1.pdf', label: 'Contract.pdf' },
                { value: 'Contract2.pdf', label: 'Contract2.pdf' },
                { value: 'Contract3.pdf', label: 'Contract3.pdf' },
              ]}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="paymentLink"
              label="Payment Link"
              value={values.paymentLink || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalExpense"
              label="Total Expense"
              value={values.totalExpense || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="totalProductCOGExpense"
              label="Total Product COG Expense"
              value={values.totalProductCOGExpense || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Affiliate Platform"
              value={values.affiliatePlatform}
              onChange={(_, value) => setFieldValue('affiliatePlatform', value)}
              options={[
                { value: 'Amazon', label: 'Amazon' },
                { value: 'ShareASale', label: 'ShareASale' },
              ]}
              multiple
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
    </>
  );
};

{
  /* <PageLoader loading={loading} error={null}> */
}
{
  /* <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="email" type={'email'} label="Email" value={values.email} onChange={handleChange} />
            <ErrorMessage error={errors.email} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="phone" label="Phone" value={values.phone} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="website" label="Website" value={values.website} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="instagram" label="Instagram" value={values.instagram} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="instagram_following"
              label="Instagram Following"
              value={values.instagram_following}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="tiktok" label="Tiktok" value={values.tiktok} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="tiktok_following"
              label="Tiktok Following"
              value={values.tiktok_following}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="youtube" label="Youtube" value={values.youtube} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="youtube_following"
              label="Youtube Following"
              value={values.youtube_following}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="x" label="X" value={values.x} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="x_following" label="X Following" value={values.x_following} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="facebook" label="Facebook" value={values.facebook} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="facebook_following"
              label="Facebook Following"
              value={values.facebook_following}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="pinterest" label="pinterest" value={values.pinterest} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="pinterest_following"
              label="pinterest Following"
              value={values.pinterest_following}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_IF_rate"
              label="Partner IG rate"
              value={values.partner_IF_rate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_TT_rate"
              label="Partner TT rate"
              value={values.partner_TT_rate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_YT_rate"
              label="Partner YT rate"
              value={values.partner_YT_rate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_UGC_rate"
              label="Partner UGC rate"
              value={values.partner_UGC_rate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_360_rate"
              label="Partner 360 rate"
              value={values.partner_360_rate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Profile category'}
              value={values.profile_category}
              onChange={(value) => setFieldValue('profile_category', value)}
              name="profile_category"
              options={[
                { value: 'MODEL', label: 'Model' },
                { value: 'CREATOR', label: 'Creator' },
                { value: 'PHOTOGRAPHER', label: 'Photographer' },
                { value: 'REVIEW_PARTNER', label: 'Review partner' },
                { value: 'B2B', label: 'b2b' },
                { value: 'BLOG_OR_REVIEWER', label: 'Blog or reviewer' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Current Status'}
              value={values.current_status}
              onChange={(value) => setFieldValue('current_status', value)}
              name="current_status"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'NOT_STARTED', label: 'Not started' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 1 }}>Profile Image</FormLabel>
              <ImageUploader
                value={values.profile_image}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={onDelete}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form> */
}
