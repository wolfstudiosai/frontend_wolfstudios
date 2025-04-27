'use client';

import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';

import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { Iconify } from '/src/components/iconify/iconify';

import { defaultContent } from '../_lib/all-content.types';

export const ContentForm = ({ id, onClose, fetchList }) => {
  // ********************* Formik *******************************

  const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } = useFormik({
    initialValues: defaultContent(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.pinAccountsUsed) {
        errors.pinAccountsUsed = formConstants.required;
      }
      if (!values.googleDriveFiles) {
        errors.googleDriveFiles = formConstants.required;
      }
      if (!values.playbookLink) {
        errors.playbookLink = formConstants.required;
      }
      if (!values.upPromoteConversion) {
        errors.upPromoteConversion = formConstants.required;
      }
      if (!values.monthUploaded) {
        errors.monthUploaded = formConstants.required;
      }
      if (!values.revoInstagram) {
        errors.revoInstagram = formConstants.required;
      }
      if (!values.creatorStatus) {
        errors.creatorStatus = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = {
          ...values,
        };

        const imageFields = ['campaignImage'];
        for (const field of imageFields) {
          const value = values[field];
          if (value instanceof File) {
            const res = await imageUploader(
              [
                {
                  file: value,
                  fileName: value.name.split('.').slice(0, -1).join('.'),
                  fileType: value.type.split('/')[1],
                },
              ],
              'campaigns'
            );

            finalData[field] = res;
          } else if (typeof value === 'string') {
            finalData[field] = [value];
          }
        }

        const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }

        if (finalData.goals && typeof finalData.goals === 'string') {
          finalData.goals = finalData.goals.split(',').map((item) => item.trim());
        }
        const res = id ? await updateCampaignAsync(id, finalData) : await createCampaignAsync(finalData);
        if (res.success) {
          onClose?.();
          resetForm();
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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinAccountsUsed"
            label="Revo Pinterest"
            values={values.pinAccountsUsed}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="postQuality"
            label="Post Quality"
            values={values.postQuality}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            values={values.googleDriveFiles}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            values={values.playbookLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="upPromoteConversion"
            label="Up Promote Conversion"
            values={values.upPromoteConversion}
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
              { value: 'Pending', label: 'Pending' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomDatePicker
            label="Start Date"
            error={errors.startDate}
            value={values.startDate}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('startDate', value)}
          />
          <ErrorMessage error={errors.startDate} />
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
            name="partner_IGLink"
            label="Partner IG Link"
            values={values.partner_IGLink}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner.TikTokLink"
            label="Partner TikTok Link"
            values={values.partner?.TikTokLink || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner.YTLink"
            label="Partner YouTube Link"
            values={values.partner?.YTLink || ''}
            onChange={handleChange}
          />
        </Grid>

        {/* Instagram Metrics */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalLikes"
            label="IG Total Likes"
            type="number"
            values={values.IG?.TotalLikes || 0}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalComments"
            label="IG Total Comments"
            type="number"
            values={values.IG?.TotalComments || 0}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalShares"
            label="IG Total Shares"
            type="number"
            values={values.IG?.TotalShares || 0}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalViews"
            label="IG Total Views"
            type="number"
            values={values.IG?.TotalViews || 0}
            onChange={handleChange}
          />
        </Grid>

        {/* YouTube Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.AccountsUsed"
            label="YT Accounts Used"
            values={values.YT?.AccountsUsed || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.ClubREVOTotalViews"
            label="YT ClubREVO Views"
            type="number"
            values={values.YT?.ClubREVOTotalViews || 0}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.PartnerTotalLikes"
            label="YT Partner Likes"
            type="number"
            values={values.YT?.PartnerTotalLikes || 0}
            onChange={handleChange}
          />
        </Grid>

        {/* Pinterest Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="Pinterest.TotalPinClicks"
            label="Pinterest Clicks"
            type="number"
            values={values.Pinterest?.TotalPinClicks || 0}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="Pinterest.TotalViews"
            label="Pinterest Views"
            type="number"
            values={values.Pinterest?.TotalViews || 0}
            onChange={handleChange}
          />
        </Grid>

        {/* REVO Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="REVO.Twitter"
            label="REVO Twitter"
            select
            values={values.REVO?.Twitter || 'not-posted'}
            onChange={handleChange}
          >
            <option value="not-posted">Not Posted</option>
            <option value="posted">Posted</option>
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="REVO.TikTok"
            label="REVO TikTok"
            select
            values={values.REVO?.TikTok || 'not-posted'}
            onChange={handleChange}
          >
            <option value="not-posted">Not Posted</option>
            <option value="posted">Posted</option>
          </CustomTextField>
        </Grid>

        {/* Relations Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="campaigns"
            label="Campaigns"
            values={values.campaigns?.join(', ') || ''}
            onChange={(e) => handleArrayChange('campaigns', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tags"
            label="Tags"
            values={values.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange('tags', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="retailPartners"
            label="Retail Partners"
            values={values.retailPartners?.join(', ') || ''}
            onChange={(e) => handleArrayChange('retailPartners', e.target.value)}
          />
        </Grid>

        {/* File Links */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            values={values.googleDriveFiles || ''}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify
                      icon="lucide:link"
                      onClick={() => window.open(values.googleDriveFiles, '_blank')}
                      style={{ cursor: 'pointer' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            values={values.playbookLink || ''}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify
                      icon="lucide:link"
                      onClick={() => window.open(values.playbookLink, '_blank')}
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
