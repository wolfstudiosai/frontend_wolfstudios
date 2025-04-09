'use client';

import { FormLabel, InputAdornment } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';
import { defaultContent } from '../_lib/all-content.types';
import { defaultContent1 } from '../_lib/all-content.types';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { ErrorMessage } from '/src/components/formFields/error-message';
import Grid from '@mui/material/Grid2';
import React from 'react';

export const ContentForm = ({ data, onSubmit, onChange, errors, setFieldValue }) => {
const [values, setValues] = React.useState(data || defaultContent1);
  
  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultContent1);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    // <form onSubmit={onSubmit}>
    //   <Grid container spacing={2}>
    //     {/* General Information Section */}
    //     <Grid size = {{ xs:12 }}>
    //       <CustomTextField name="title" label="Title" value={data.title || ''} onChange={onChange} />
    //       <ErrorMessage error={errors.title} />
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField name="campaign" label="Campaign" value={data.campaign || ''} onChange={onChange} />
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField name="product" label="Product" value={data.product || ''} onChange={onChange} />
    //     </Grid>

    //     {/* Pinterest Section */}
    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="REVO_pinterest"
    //         label="REVO Pinterest"
    //         select
    //         value={data.REVO_pinterest || 'not-posted'}
    //         onChange={onChange}
    //       >
    //         <option value="not-posted">Not Posted</option>
    //         <option value="posted">Posted</option>
    //       </CustomTextField>
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="pin_accounts_used"
    //         label="Pin Accounts Used"
    //         value={data.pin_accounts_used || ''}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     {/* Instagram Section */}
    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="REVO_instagram"
    //         label="REVO Instagram"
    //         select
    //         value={data.REVO_instagram || 'not-posted'}
    //         onChange={onChange}
    //       >
    //         <option value="not-posted">Not Posted</option>
    //         <option value="posted">Posted</option>
    //       </CustomTextField>
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="IG_social_sets_used"
    //         label="IG Social Sets Used"
    //         value={data.IG_social_sets_used || ''}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     {/* TikTok Section */}
    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="REVO_tiktok"
    //         label="REVO TikTok"
    //         select
    //         value={data.REVO_tiktok || 'not-posted'}
    //         onChange={onChange}
    //       >
    //         <option value="not-posted">Not Posted</option>
    //         <option value="posted">Posted</option>
    //       </CustomTextField>
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="tiktok_accounts_used"
    //         label="TikTok Accounts Used"
    //         value={data.tiktok_accounts_used || ''}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     {/* YouTube Section */}
    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="YT_account_used"
    //         label="YouTube Account Used"
    //         value={data.YT_account_used || 'not-posted'}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="partner_YT_link"
    //         label="Partner YouTube Link"
    //         value={data.partner_YT_link || ''}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     {/* Metrics Section */}
    //     <Grid size = {{ xs: 12 , md:4 }}>
    //       <CustomTextField
    //         name="uppromote_conversion"
    //         label="Uppromote Conversion"
    //         type="number"
    //         value={data.uppromote_conversion || 0}
    //         onChange={onChange}
    //       />
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:4 }}>
    //       <CustomTextField
    //         name="asset_status"
    //         label="Asset Status"
    //         select
    //         value={data.asset_status || 'Inactive'}
    //         onChange={onChange}
    //       >
    //         <option value="Inactive">Inactive</option>
    //         <option value="Active">Active</option>
    //       </CustomTextField>
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:4 }}>
    //       <CustomDatePicker
    //         label="Month Uploaded"
    //         views={['year', 'month']}
    //         value={data.month_uploaded ? new Date(data.month_uploaded) : null}
    //         onChange={(date) => 
    //           setFieldValue('month_uploaded', date || null)
    //         }
    //       />
    //     </Grid>

    //     {/* Media Links */}
    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="google_drive_files"
    //         label="Google Drive Files"
    //         value={data.google_drive_files || ''}
    //         onChange={onChange}
    //         slotProps={{
    //           input: {
    //             endAdornment: (
    //               <InputAdornment position="end">
    //                 <Iconify
    //                   icon="lucide:link"
    //                   onClick={() => window.open(data.google_drive_files, '_blank')}
    //                   style={{ cursor: 'pointer' }}
    //                 />
    //               </InputAdornment>
    //             ),
    //           },
    //         }}
    //       />
    //     </Grid>

    //     <Grid size = {{ xs: 12 , md:6 }}>
    //       <CustomTextField
    //         name="playbook_link"
    //         label="Playbook Link"
    //         value={data.playbook_link || ''}
    //         onChange={onChange}
    //         slotProps={{
    //           input: {
    //             endAdornment: (
    //               <InputAdornment position="end">
    //                 <Iconify
    //                   icon="lucide:link"
    //                   onClick={() => window.open(data.playbook_link, '_blank')}
    //                   style={{ cursor: 'pointer' }}
    //                 />
    //               </InputAdornment>
    //             ),
    //           },
    //         }}
    //       />
    //     </Grid>

    //   </Grid>
    // </form>
    <form onSubmit={onSubmit}>
    <Grid container spacing={2}>
      {/* General Information Section */}
      <Grid size = {{ xs:12 }}>
        <CustomTextField name="name" label="Name" values={data.name || ''} onChange={onChange} />
        <ErrorMessage error={errors.name} />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="postQuality"
          label="Post Quality"
          values={data.postQuality?.join(', ') || ''}
          onChange={(e) => handleArrayChange('postQuality', e.target.value)}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="pinAccountsUsed"
          label="Pin Accounts Used"
          values={data.pinAccountsUsed || ''}
          onChange={onChange}
        />
      </Grid>

      {/* Partner Section */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="partner.IGLink"
          label="Partner IG Link"
          values={data.partner?.IGLink || ''}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="partner.TikTokLink"
          label="Partner TikTok Link"
          values={data.partner?.TikTokLink || ''}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="partner.YTLink"
          label="Partner YouTube Link"
          values={data.partner?.YTLink || ''}
          onChange={onChange}
        />
      </Grid>

      {/* Instagram Metrics */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="IG.TotalLikes"
          label="IG Total Likes"
          type="number"
          values={data.IG?.TotalLikes || 0}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="IG.TotalComments"
          label="IG Total Comments"
          type="number"
          values={data.IG?.TotalComments || 0}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="IG.TotalShares"
          label="IG Total Shares"
          type="number"
          values={data.IG?.TotalShares || 0}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="IG.TotalViews"
          label="IG Total Views"
          type="number"
          values={data.IG?.TotalViews || 0}
          onChange={onChange}
        />
      </Grid>

      {/* YouTube Section */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="YT.AccountsUsed"
          label="YT Accounts Used"
          values={data.YT?.AccountsUsed || ''}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="YT.ClubREVOTotalViews"
          label="YT ClubREVO Views"
          type="number"
          values={data.YT?.ClubREVOTotalViews || 0}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="YT.PartnerTotalLikes"
          label="YT Partner Likes"
          type="number"
          values={data.YT?.PartnerTotalLikes || 0}
          onChange={onChange}
        />
      </Grid>

      {/* Pinterest Section */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="Pinterest.TotalPinClicks"
          label="Pinterest Clicks"
          type="number"
          values={data.Pinterest?.TotalPinClicks || 0}
          onChange={onChange}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="Pinterest.TotalViews"
          label="Pinterest Views"
          type="number"
          values={data.Pinterest?.TotalViews || 0}
          onChange={onChange}
        />
      </Grid>

      {/* REVO Section */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="REVO.Twitter"
          label="REVO Twitter"
          select
          values={data.REVO?.Twitter || 'not-posted'}
          onChange={onChange}
        >
          <option value="not-posted">Not Posted</option>
          <option value="posted">Posted</option>
        </CustomTextField>
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="REVO.TikTok"
          label="REVO TikTok"
          select
          values={data.REVO?.TikTok || 'not-posted'}
          onChange={onChange}
        >
          <option value="not-posted">Not Posted</option>
          <option value="posted">Posted</option>
        </CustomTextField>
      </Grid>

      {/* Relations Section */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="campaigns"
          label="Campaigns"
          values={data.campaigns?.join(', ') || ''}
          onChange={(e) => handleArrayChange('campaigns', e.target.value)}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="tags"
          label="Tags"
          values={data.tags?.join(', ') || ''}
          onChange={(e) => handleArrayChange('tags', e.target.value)}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="retailPartners"
          label="Retail Partners"
          values={data.retailPartners?.join(', ') || ''}
          onChange={(e) => handleArrayChange('retailPartners', e.target.value)}
        />
      </Grid>

      {/* File Links */}
      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="googleDriveFiles"
          label="Google Drive Files"
          values={data.googleDriveFiles || ''}
          onChange={onChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify
                    icon="lucide:link"
                    onClick={() => window.open(data.googleDriveFiles, '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>

      <Grid size = {{ xs: 12 , md:4 }}>
        <CustomTextField
          name="playbookLink"
          label="Playbook Link"
          values={data.playbookLink || ''}
          onChange={onChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify
                    icon="lucide:link"
                    onClick={() => window.open(data.playbookLink, '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
    </Grid>
    </form>
  );
};